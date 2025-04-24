// Helper function to extract repo info

const net = require('net');

function extractRepoInfo(repoUrl) {
    const parts = repoUrl.replace('.git', '').split('/');
    return [parts[parts.length - 2], parts[parts.length - 1]];  // Returns username and project name
}

// Helper function to find an available port
function findAvailablePort(start = 3000, end = 9000) {
    return new Promise((resolve, reject) => {
        const checkPort = (port) => {
            const server = net.createServer();
            server.listen(port, '127.0.0.1');
            server.on('listening', () => {
                server.close();
                resolve(port);
            });
            server.on('error', () => {
                if (port < end) {
                    checkPort(port + 1);  // Try next port
                } else {
                    reject(new Error('No available ports found.'));
                }
            });
        };
        checkPort(start); // Start checking from the provided port
    });
}

module.exports = {extractRepoInfo, findAvailablePort};