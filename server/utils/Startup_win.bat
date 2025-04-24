#!/bin/bash

# For Windows using Git Bash or WSL
start cmd.exe /K "cd ../services/auth && npm run dev"
start cmd.exe /K "cd ../services/payment && npm run dev"
start cmd.exe /K "cd ../services/deployment && npm run dev"
