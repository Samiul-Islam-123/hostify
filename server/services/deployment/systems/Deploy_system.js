// this actually deploys the application

const { execSync } = require('child_process');
const fs = require('fs');
const { findAvailablePort } = require('../utils/Helper');
const getIPAddress = require('../../../utils/IP');

// Generate dynamic Nginx config file with unique port
async function createNginxConfig(username, project) {
    // Find an available port dynamically
    const port = await findAvailablePort();

    // Nginx configuration with the dynamic port
    const config = `
  server {
      listen ${port};
      server_name 100.125.12.34;  // You can set this dynamically or statically
  
      root /var/www/${username}/${project};
      index index.html;
  
      location / {
          try_files \$uri \$uri/ /index.html;
      }
  
      location ~* \\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|otf)$ {
          expires 1y;
          access_log off;
          add_header Cache-Control "public";
      }
  
      location ~* \\.html$ {
          expires 1h;
          add_header Cache-Control "private, no-cache, max-age=0";
      }
  
      add_header X-Content-Type-Options nosniff;
      add_header X-XSS-Protection "1; mode=block";
      add_header X-Frame-Options SAMEORIGIN;
  }
  `;

    // Write the config to /etc/nginx/sites-available/
    const configPath = `/etc/nginx/sites-available/${username}_${project}.conf`;
    fs.writeFileSync(configPath, config);

    // Create a symlink in /etc/nginx/sites-enabled/
    const enabledPath = `/etc/nginx/sites-enabled/${username}_${project}.conf`;
    if (!fs.existsSync(enabledPath)) {
        fs.symlinkSync(configPath, enabledPath);
    }

    return { configPath, port };
}

// Create symlink for Nginx and restart the server
function createSymlinkAndRestartNginx(username, project) {
    const configPath = `/etc/nginx/sites-available/${username}_${project}.conf`;
    const enabledPath = `/etc/nginx/sites-enabled/${username}_${project}.conf`;

    // Check if the config file exists
    if (!fs.existsSync(configPath)) {
        throw new Error(`Nginx config file for ${username}/${project} does not exist.`);
    }

    // Create a symlink in sites-enabled if it doesn't exist
    if (!fs.existsSync(enabledPath)) {
        fs.symlinkSync(configPath, enabledPath);
        console.log(`Created symlink for ${username}/${project}`);
    } else {
        console.log(`Symlink for ${username}/${project} already exists.`);
    }

    // Test the Nginx configuration to ensure there are no errors
    try {
        execSync('nginx -t', { stdio: 'inherit' });
        console.log('Nginx config test passed.');
    } catch (error) {
        throw new Error('Nginx config test failed. Please check the config.');
    }

    // Restart Nginx to apply the new configuration
    try {
        execSync('systemctl restart nginx', { stdio: 'inherit' });
        console.log('Nginx restarted successfully.');
    } catch (error) {
        throw new Error('Failed to restart Nginx. Please check the systemd service.');
    }
}

module.exports = {createSymlinkAndRestartNginx, createNginxConfig}