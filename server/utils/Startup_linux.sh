#!/bin/bash

# Open terminal and run each service in a new terminal window

# For Linux (GNOME Terminal)
gnome-terminal -- bash -c "cd ../services/auth && node index.js"
gnome-terminal -- bash -c "cd ../services/deployment && node index.js"
gnome-terminal -- bash -c "cd ../services/payment && node index.js"

# For macOS (Terminal)
# osascript -e 'tell application "Terminal" to do script "cd ./service1 && node index.js"'
# osascript -e 'tell application "Terminal" to do script "cd ./service2 && node index.js"'
# osascript -e 'tell application "Terminal" to do script "cd ./service3 && node index.js"'
