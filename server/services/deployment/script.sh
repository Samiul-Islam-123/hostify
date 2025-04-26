#!/bin/bash

REPO_URL=$1
OUTPUT_DIR=$2
ENV=$3
ROOT_DIR=$4

# Clean working directory
echo "[INFO] Cleaning working directory..."
rm -rf ./repo

echo "[INFO] Cloning $REPO_URL..."
git clone "$REPO_URL" repo
cd repo || exit 1

if [ -n "$ROOT_DIR" ]; then
  echo "[INFO] Changing to root directory: $ROOT_DIR"
  cd "$ROOT_DIR" || exit 1
fi

echo "[INFO] Installing dependencies..."
npm install

if [ -n "$ENV" ]; then
  echo "[INFO] Creating .env file..."
  echo "$ENV" > .env
fi

echo "[INFO] Running build..."
npm run build

echo "[INFO] Copying build output to $OUTPUT_DIR..."
mkdir -p "$OUTPUT_DIR"

# Handle different build output directories
if [ -d "dist" ]; then
  cp -r dist/* "$OUTPUT_DIR"
elif [ -d "build" ]; then
  cp -r build/* "$OUTPUT_DIR"
else
  echo "[ERROR] No build output found!"
  exit 1
fi

echo "[INFO] Build completed successfully!"