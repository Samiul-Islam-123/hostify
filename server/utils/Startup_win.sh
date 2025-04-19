#!/bin/bash

# For Windows using Git Bash or WSL
start cmd.exe /K "cd ../services/auth && node index.js"
start cmd.exe /K "cd ../services/payment && node index.js"
start cmd.exe /K "cd ../services/deployment && node index.js"
