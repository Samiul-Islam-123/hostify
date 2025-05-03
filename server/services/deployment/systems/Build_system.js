const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');

// Helper function to clean directories
function cleanDirectory(dirPath) {
    if (fs.existsSync(dirPath)) {
        fs.rmSync(dirPath, { recursive: true, force: true });
    }
    fs.mkdirSync(dirPath, { recursive: true });
}

async function buildProject({ repoUrl, username, project, env = {}, logger, rootDir, socketID, io }) {
    return new Promise((resolve, reject) => {
        // Use relative paths in current working directory
        const baseDir = process.cwd();
        const tmpDir = path.join(baseDir, 'tmp', username, project);
        const outputDir = path.join(baseDir, 'output', username, project);
        const finalDestination = path.join('/var/www', username, project);

        // Clean previous build artifacts
        cleanDirectory(tmpDir);

        cleanDirectory(outputDir);

        const escapedEnv = JSON.stringify(env).replace(/"/g, '\\"');

        const args = [
            'run', '--rm',
            '-v', `${tmpDir}:/app`,
            '-v', `${path.join(baseDir, 'output')}:/host-output`,
            'deployment-builder',
            repoUrl,
            `/host-output/${username}/${project}`,  // Correct output path in container
            escapedEnv,
            rootDir || ''
        ];

        logger.info(`Running Docker build for ${repoUrl}...`);
        io.to(socketID).emit('log', `Running Docker build for ${repoUrl}...`);

        const dockerProcess = spawn('docker', args);

        dockerProcess.stdout.on('data', (data) => {
            logger.info(`[docker stdout] ${data.toString().trim()}`);
            io.to(socketID).emit('log', `[docker stdout] ${data.toString().trim()}`);
        });

        dockerProcess.stderr.on('data', (data) => {
            logger.error(`[docker stderr] ${data.toString().trim()}`);
            io.to(socketID).emit('log', `[docker stderr] ${data.toString().trim()}`);
        });

        dockerProcess.on('close', (code) => {
            if (code !== 0) {
                return reject(new Error(`Docker build failed with exit code ${code}`));
            }

            logger.info('Docker build completed. Moving build files...');
            io.to(socketID).emit('log', 'Docker build completed. Moving build files...');

            cleanDirectory(finalDestination);

            // Copy from relative output directory to final destination
            exec(`cp -r ${outputDir}/* ${finalDestination}`, (err) => {
                if (err) {
                    logger.error(`Failed to copy files: ${err.message}`);
                    return reject(new Error('Failed to move build files'));
                }

                // Clean temporary directories
                cleanDirectory(tmpDir);
                cleanDirectory(outputDir);

                logger.info(`Project deployed to ${finalDestination}`);
                io.to(socketID).emit('log', `Project deployed to ${finalDestination}`);

                resolve(finalDestination);
            });
        });
    });
}

module.exports = { buildProject };