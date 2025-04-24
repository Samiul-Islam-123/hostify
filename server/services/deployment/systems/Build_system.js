// builds the application in separate docker container using spawn

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');

function extractRepoInfo(repoUrl) {
    const parts = repoUrl.replace('.git', '').split('/');
    return [parts[parts.length - 2], parts[parts.length - 1]];
}

function buildProject(repoUrl, env, logger) {
    return new Promise((resolve, reject) => {
        const [username, project] = extractRepoInfo(repoUrl);
        const outputTempPath = path.join('/output', username, project);
        const finalDestination = path.join('/var/www', username, project);

        // Ensure temp output path exists
        fs.mkdirSync(outputTempPath, { recursive: true });

        // Clone or pull repo
        const repoPath = path.join('/tmp', username, project);
        const cloneOrPull = fs.existsSync(repoPath)
            ? `git -C ${repoPath} pull`
            : `git clone ${repoUrl} ${repoPath}`;

        exec(cloneOrPull, (err, stdout, stderr) => {
            if (err) {
                logger.error(`Git error: ${stderr}`);
                return reject(new Error('Git failed'));
            }

            logger.info(`Git success: ${stdout}`);
            runDockerBuild(repoPath, outputTempPath, repoUrl, env, logger)
                .then(() => {
                    // After build, copy to /var/www
                    fs.mkdirSync(finalDestination, { recursive: true });
                    exec(`cp -r ${outputTempPath}/* ${finalDestination}`, (err) => {
                        if (err) {
                            logger.error(`Copy failed: ${err.message}`);
                            return reject(new Error('Failed to copy build files'));
                        }
                        logger.info('Copied build files to /var/www successfully');
                        resolve(finalDestination);
                    });
                })
                .catch(reject);
        });
    });
}

function runDockerBuild(repoPath, outputPath, repoUrl, env, logger) {
    return new Promise((resolve, reject) => {
        const escapedEnv = env ? JSON.stringify(env).replace(/"/g, '\\"') : '';

        const args = [
            'run', '--rm',
            '-v', `${repoPath}:/app`,
            '-v', `${outputPath}:/output/${path.basename(repoPath)}`,
            'deployment-builder',
            repoUrl,
            `/output/${path.basename(repoPath)}`,
            escapedEnv
        ];

        logger.info(`Spawning Docker to build ${repoUrl}...`);
        const dockerProcess = spawn('docker', args);

        dockerProcess.stdout.on('data', data => logger.info(`[stdout] ${data}`));
        dockerProcess.stderr.on('data', data => logger.error(`[stderr] ${data}`));

        dockerProcess.on('close', code => {
            code === 0 ? resolve() : reject(new Error(`Docker exited with code ${code}`));
        });
    });
}


module.exports = { buildProject };
