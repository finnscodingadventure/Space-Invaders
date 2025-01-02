#!/bin/bash

# Build the project
npm run build

# Create a timestamp for backup
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")

# Zip the dist folder
zip -r space-invaders-${TIMESTAMP}.zip dist/*

echo "Build completed and zipped as space-invaders-${TIMESTAMP}.zip"
echo "You can now upload this file to your Plesk server"
