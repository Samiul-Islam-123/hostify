const { spawn } = require('child_process');

/**
 * Runs a command with arguments in a specified directory and logs output.
 * 
 * @param {string} command - The command to run (e.g., 'npm')
 * @param {string[]} args - Array of arguments (e.g., ['run', 'build'])
 * @param {string} cwd - The directory to execute the command in
 * @param {object} options - Optional settings
 * @param {boolean} options.log - Whether to log output to console (default: true)
 * 
 * @returns {Promise<string>} - Resolves with the command's output
 */
const RunCommand = async (command, args, cwd, options = {}) => {
    const { log = true } = options;

    return new Promise((resolve, reject) => {
        let output = '';

        const child = spawn(command, args, {
            cwd,
            
            env: process.env
        });

        child.stdout.on('data', (data) => {
            const text = data.toString();
            if (log) process.stdout.write(text);
            output += text;
        });

        child.stderr.on('data', (data) => {
            const text = data.toString();
            if (log) process.stderr.write(text);
            output += text;
        });

        child.on('error', (err) => {
            reject(new Error(`Failed to start process: ${err.message}`));
        });

        child.on('close', (code) => {
            if (code === 0) {
                resolve(output);
            } else {
                reject(new Error(`${command} ${args.join(' ')} exited with code ${code}\n${output}`));
            }
        });
    });
};

module.exports = RunCommand;
