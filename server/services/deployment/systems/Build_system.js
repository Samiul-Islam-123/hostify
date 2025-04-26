const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');

async function runDockerBuild({ repoUrl, username, project, env = {}, logger }) {
    return new Promise((resolve, reject) => {
        const repoFolder = path.join('/tmp', username, project);
        const outputFolder = path.join('/output', username, project);
        const finalDestination = path.join('/var/www', username, project);

        // Ensure output and repo directories exist
        fs.mkdirSync(outputFolder, { recursive: true });
        fs.mkdirSync(repoFolder, { recursive: true });

        const escapedEnv = JSON.stringify(env).replace(/"/g, '\\"');

        const args = [
            'run', '--rm',
            '-v', `${repoFolder}:/app`,
            '-v', `${outputFolder}:/output/${project}`,
            'deployment-builder',
            repoUrl,
            `/output/${project}`,
            escapedEnv
        ];

        logger.info(`Running Docker build for ${repoUrl}...`);
        const dockerProcess = spawn('docker', args);

        dockerProcess.stdout.on('data', (data) => {
            logger.info(`[docker stdout] ${data.toString().trim()}`);
        });

        dockerProcess.stderr.on('data', (data) => {
            logger.error(`[docker stderr] ${data.toString().trim()}`);
        });

        dockerProcess.on('close', (code) => {
            if (code !== 0) {
                return reject(new Error(`Docker build failed with exit code ${code}`));
            }

            logger.info('Docker build completed. Moving build files...');

            // Create /var/www/username/project if it doesn't exist
            fs.mkdirSync(finalDestination, { recursive: true });

            // Copy everything from outputFolder to /var/www/username/project
            exec(`cp -r ${outputFolder}/* ${finalDestination}`, (err) => {
                if (err) {
                    logger.error(`Failed to copy files to /var/www: ${err.message}`);
                    return reject(new Error('Failed to move build files'));
                }

                logger.info(`Project deployed to /var/www/${username}/${project}`);
                resolve(finalDestination);
            });
        });
    });
}

async function buildProject({ repoUrl, username, project, env = {}, logger , rootDir}){
    return new Promise((resolve, reject) => {
        const repoFolder = path.join('/tmp', username, project);
        const outputFolder = path.join('/output', username, project);
        const finalDestination = path.join('/var/www', username, project);

        // Ensure output and repo directories exist
        fs.mkdirSync(outputFolder, { recursive: true });
        fs.mkdirSync(repoFolder, { recursive: true });

        const escapedEnv = JSON.stringify(env).replace(/"/g, '\\"');

        const args = [
            'run', '--rm',
            '-v', `${repoFolder}:/app`,
            '-v', `${outputFolder}:/output/${project}`,
            'deployment-builder',
            repoUrl,
            `/output/${project}`,
            escapedEnv,
            rootDir
        ];

        logger.info(`Running Docker build for ${repoUrl}...`);
        const dockerProcess = spawn('docker', args);

        dockerProcess.stdout.on('data', (data) => {
            logger.info(`[docker stdout] ${data.toString().trim()}`);
        });

        dockerProcess.stderr.on('data', (data) => {
            logger.error(`[docker stderr] ${data.toString().trim()}`);
        });

        dockerProcess.on('close', (code) => {
            if (code !== 0) {
                return reject(new Error(`Docker build failed with exit code ${code}`));
            }

            logger.info('Docker build completed. Moving build files...');

            // Create /var/www/username/project if it doesn't exist
            fs.mkdirSync(finalDestination, { recursive: true });

            // Copy everything from outputFolder to /var/www/username/project
            exec(`cp -r ${outputFolder}/* ${finalDestination}`, (err) => {
                if (err) {
                    logger.error(`Failed to copy files to /var/www: ${err.message}`);
                    return reject(new Error('Failed to move build files'));
                }

                logger.info(`Project deployed to /var/www/${username}/${project}`);
                resolve(finalDestination);
            });
        });
    });
}

module.exports = { runDockerBuild, buildProject };
