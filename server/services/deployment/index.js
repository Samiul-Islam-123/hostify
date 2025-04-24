const express = require('express');
const Logger = require('../../utils/Logger');
const getIPAddress = require('../../utils/IP');
const { createSymlinkAndRestartNginx, createNginxConfig } = require('./systems/Deploy_system'); // Import your deploy system functions
const { buildProject } = require('./systems/Build_system'); // Assuming this is where your build function is located
const {extractRepoInfo} = require('./utils/Helper');

const PORT = process.env.PORT || 5502;
const app = express();
const logger = new Logger();

app.use(express.json())

app.get('/', (req, res) => {
    res.send("Deployment service is running");
})

app.post('/deploy', async (req, res) => {
    const { repoURL, env } = req.body;

    if (!repoURL) return res.status(400).send("Missing repoURL");

    try {
        // Step 1: Build the project
        const buildOutput = await buildProject(repoURL, env, logger);
        
        // Step 2: Extract username and project from the repo URL
        const [username, project] = extractRepoInfo(repoURL);

        // Step 3: Create Nginx config for the project
        logger.info(`Creating Nginx config for ${username}/${project}...`);
        const configOutput =await createNginxConfig(username, project);
        logger.info(`Nginx config file created: ${configOutput.configPath}`);

        // Step 4: Create symlink and restart Nginx
        logger.info(`Creating symlink and restarting Nginx for ${username}/${project}...`);
        createSymlinkAndRestartNginx(username, project);

        // Send response after successful deployment
        res.send({ message: "Deployment complete", output: `http://100.125.12.34:${configOutput.port}` });

    } catch (error) {
        logger.error(error.message);
        console.log(error)
        res.status(500).send("Deployment failed");
    }
})

app.listen(PORT, () => {
    const IP = getIPAddress();
    logger.info(`Deployment service is running at http://${IP}:${PORT}`);
})