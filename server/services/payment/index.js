const express = require('express');
const Logger = require('../../utils/Logger');
const getIPAddress = require('../../utils/IP');

const PORT = process.env.PORT || 5503;
const app = express();
const logger = new Logger();

app.get('/', (req,res) => {
    res.send("Payment service is running");;
})

app.listen(PORT, () => {
    const IP = getIPAddress();
    logger.info(`Payment service is running at http://${IP}:${PORT}`);
})