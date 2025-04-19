class Logger {
    getTimestamp() {
        const now = new Date();
        const date = now.toLocaleDateString('en-CA'); // YYYY-MM-DD format
        const time = now.toLocaleTimeString('en-GB', { hour12: false }); // HH:mm:ss
        return `${date} ${time}`;
    }

    info(data) {
        console.log(`\x1b[92m[INFO][${this.getTimestamp()}] : ${data}\x1b[0m`); // Light green
    }

    error(data) {
        console.error(`\x1b[31m[ERROR][${this.getTimestamp()}] : ${data}\x1b[0m`); // Red
    }

    warn(data) {
        console.warn(`\x1b[33m[WARN][${this.getTimestamp()}] : ${data}\x1b[0m`); // Yellow
    }
}

module.exports = Logger;
