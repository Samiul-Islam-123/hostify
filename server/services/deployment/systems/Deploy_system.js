const fs = require('fs');
const { exec } = require('child_process');

// Function to create an Nginx config and restart Nginx
function serveBuildFilesWithNginx(username, project, logger, port) {
    return new Promise((resolve, reject) => {
        // Path for the project’s build files
        const projectDir = `/var/www/${username}/${project}`;
        const nginxConfigPath = `/etc/nginx/sites-available/${project}`;
        const nginxLinkPath = `/etc/nginx/sites-enabled/${project}`;

        // Check if the build files exist
        if (!fs.existsSync(projectDir)) {
            return reject(new Error(`Build files for ${project} not found at ${projectDir}`));
        }

        // Validate that the port is a number and is within a valid range
        if (typeof port !== 'number' || port < 1024 || port > 65535) {
            return reject(new Error('Invalid port number. It should be between 1024 and 65535.'));
        }

        // Nginx config template with dynamic port assignment
        const nginxConfig = `
server {
    listen ${port};
    server_name _;  # Use your domain or IP

    root ${projectDir};
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}
`;

        // Create the Nginx config file
        fs.writeFileSync(nginxConfigPath, nginxConfig);

        // Create a symbolic link to enable the site
        exec(`ln -s ${nginxConfigPath} ${nginxLinkPath}`, (err, stdout, stderr) => {
            if (err) {
                logger.error(`Failed to create symlink: ${stderr}`);
                return reject(new Error('Failed to create symlink'));
            }

            logger.info(`Nginx config for ${project} created successfully on port ${port}`);

            // Reload Nginx to apply changes
            exec('sudo systemctl reload nginx', (reloadErr, reloadStdout, reloadStderr) => {
                if (reloadErr) {
                    logger.error(`Failed to reload Nginx: ${reloadStderr}`);
                    return reject(new Error('Failed to reload Nginx'));
                }

                logger.info('Nginx reloaded successfully');
                resolve(`http://localhost:${port}`);  // URL where it can be accessed
            });
        });
    });
}

module.exports = { serveBuildFilesWithNginx };
