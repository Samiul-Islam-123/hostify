#!/bin/bash

# Inputs
REPO_URL=$1
OUTPUT_DIR=$2
ENV=$3
ROOT_DIR=$4

# Clean any old repo
echo "[INFO] cleaning old repo"
rm -rf repo

echo "[INFO] Cloning $REPO_URL..."
git clone "$REPO_URL" repo
cd repo || exit 1

# If ROOT_DIR is set, cd into it
if [ -n "$ROOT_DIR" ]; then
  cd "$ROOT_DIR" || exit 1
fi

echo "[INFO] Installing dependencies..."
npm install

# If ENV is set, save it as a .env
if [ -n "$ENV" ]; then
  echo "$ENV" > .env
fi

echo "[INFO] Running build..."
npm run build

# Copy build output
echo "[INFO] Copying build output..."
mkdir -p "$OUTPUT_DIR"

if [ -d "dist" ]; then
  cp -r dist/* "$OUTPUT_DIR"
elif [ -d "build" ]; then
  cp -r build/* "$OUTPUT_DIR"
else
  echo "[ERROR] Neither dist nor build folder exists, skipping copy"
  exit 1
fi

echo "[INFO] Build output successfully copied to $OUTPUT_DIR"
