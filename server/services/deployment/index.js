const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const Logger = require('../../utils/Logger');
const getIPAddress = require('../../utils/IP');
const { serveBuildFilesWithNginx } = require('./systems/Deploy_system');
const { buildProject } = require('./systems/Build_system');
const { extractRepoInfo } = require('./utils/Helper');
const portfinder = require('portfinder');
const cors = require('cors')

const PORT = process.env.PORT || 5502;
const app = express();
const server = http.createServer(app); // Attach HTTP server
const io = new Server(server, {
    cors: {
        origin: "http://100.90.238.12:5173", // ✅ Use the actual frontend origin
        methods: ["GET", "POST"],
        credentials: true // ✅ This must be true to allow cookies or auth headers
    }
});


const logger = new Logger();
app.use(express.json());
app.use(cors({
    origin: "http://100.90.238.12:5173",
    credentials: true
}));


const socketClients = new Map(); // Map<socketId, socket>
function emitLogs(socketID, io, data) {
    if (socketID && io) {
        io.to(socketID).emit('log', data);
    }
}


io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);
    socketClients.set(socket.id, socket);

    socket.on('test-data', data => {
        socket.emit('mushi', data)
    })

    socket.on('deploy-application', async (data) => {
        const { repoURL, env, rootDir } = data;

        if (!repoURL) return res.status(400).send("Missing repoURL or socketId");

        // const socket = socketClients.get(socketId);
        // // const emitLog = (msg) => {
        // //     if (socket) socket.emit('log', msg);
        // // };
        try {
            const [username, project] = extractRepoInfo(repoURL);
            const socketID = socket.id;
            const buildPath = await buildProject({
                repoUrl: repoURL,
                username,
                project,
                env,
                logger,
                rootDir,
                socketID,
                io
            });

            const dynamicPort = await portfinder.getPortPromise({ port: [5000, 6000] });

            const serveURL = await serveBuildFilesWithNginx(username, project, logger, dynamicPort, emitLog);

            res.send({ message: "Deployment complete", url: serveURL });
        } catch (error) {
            logger.error(error.message);
            // emitLog(`Error: ${error.message}`);
            res.status(500).send("Deployment failed");
        }
    })

    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
        socketClients.delete(socket.id);
    });
});

app.get('/', (req, res) => {
    res.send("Deployment service is running");
});

app.post('/deploy', async (req, res) => {
    const { repoURL, env, rootDir, socketId } = req.body;
    if (!repoURL || !socketId) return res.status(400).send("Missing repoURL or socketId");

    const socket = socketClients.get(socketId);
    // const emitLog = (msg) => {
    //     if (socket) socket.emit('log', msg);
    // };

    try {
        const [username, project] = extractRepoInfo(repoURL);

        const buildPath = await buildProject({
            repoUrl: repoURL,
            username,
            project,
            env,
            logger,
            rootDir,

        });

        const dynamicPort = await portfinder.getPortPromise({ port: [5000, 6000] });

        const serveURL = await serveBuildFilesWithNginx(username, project, logger, dynamicPort, emitLog);

        res.send({ message: "Deployment complete", url: serveURL });
    } catch (error) {
        logger.error(error.message);
        // emitLog(`Error: ${error.message}`);
        res.status(500).send("Deployment failed");
    }
});

app.delete('/remove', async (req, res) => {
    try {
        res.json({
            message: "This route is still under progress..."
        })
    } catch (error) {
        logger.error(error.message)
        res.json({
            success: false,
            message: error.message
        })
    }
})

server.listen(PORT, () => {
    const IP = getIPAddress();
    logger.info(`Deployment service running at http://${IP}:${PORT}`);
});
