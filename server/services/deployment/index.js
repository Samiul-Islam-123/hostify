const express = require('express');
const Logger = require('../../utils/Logger');
const getIPAddress = require('../../utils/IP');
const { createSymlinkAndRestartNginx, createNginxConfig, serveBuildFilesWithNginx } = require('./systems/Deploy_system'); // Import your deploy system functions
const { buildProject } = require('./systems/Build_system'); // Assuming this is where your build function is located
const { extractRepoInfo } = require('./utils/Helper');
const portfinder = require('portfinder');

const PORT = process.env.PORT || 5502;
const app = express();
const logger = new Logger();

app.use(express.json())

app.get('/', (req, res) => {
    res.send("Deployment service is running");
})

app.post('/deploy', async (req, res) => {
    const { repoURL, env, rootDir } = req.body;
    if (!repoURL) return res.status(400).send("Missing repoURL");

    try {
        const [username, project] = extractRepoInfo(repoURL);

        

        const buildPath = await buildProject({
            repoUrl: repoURL,
            username,
            project,
            env,
            logger,
            rootDir
        });

         const dynamicPort = await portfinder.getPortPromise({ port: [5000, 6000] });
        // //logger.info(dynamicPort)
         const serveURL = await serveBuildFilesWithNginx(username, project, logger, dynamicPort);

        res.send({ message: "Deployment complete", url: serveURL });
    } catch (error) {
        logger.error(error.message);
        res.status(500).send("Deployment failed");
    }
});

app.listen(PORT, () => {
    const IP = getIPAddress();
    logger.info(`Deployment service is running at http://${IP}:${PORT}`);
})