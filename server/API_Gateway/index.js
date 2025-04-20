const express = require('express');
const proxy = require('express-http-proxy');
const cors = require('cors');
const Logger = require('../utils/Logger');
const getIPAddress = require('../utils/IP');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5500;

const services = {
    auth : `http://${getIPAddress()}:5501`,
    deployment : `http://${getIPAddress()}:5502`,
    payment : `http://${getIPAddress()}:5503`,
}

const logger = new Logger();

app.get('/', (req,res) => {
    res.send("API Gateway");
})


app.use('/auth', proxy(services.auth));
app.use('/payment', proxy(services.payment));
app.use('/deployment', proxy(services.deployment));



app.listen(PORT, () => {
    const URL = `http://${getIPAddress()}:${PORT}`
    logger.info("API Gateway is up and runnin at : "+URL);
})