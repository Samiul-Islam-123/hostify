const express = require('express');
const Logger = require('../../utils/Logger');
const getIPAddress = require('../../utils/IP');
const RunCommand = require('./utils/CommandRunner');

const PORT = process.env.PORT || 5502;
const app = express();
const logger = new Logger();

app.use(express.json())

app.get('/', (req, res) => {
    res.send("Deployment service is running");
})

app.post('/deploy', async (req, res) => {
    const requestBody = req.body;
    try {
        logger.info('Clonning github repo...');
        await RunCommand(`git`, ['clone', requestBody.code.githubURL], '/tmp');
        logger.info('done');
    } catch (error) {
        logger.error(error.message)
    }
})

app.listen(PORT, () => {
    const IP = getIPAddress();
    logger.info(`Deployment service is running at http://${IP}:${PORT}`);
})