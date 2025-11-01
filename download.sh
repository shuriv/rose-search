#!/bin/bash

# Rose Search Engine - Download Script
# This script helps you package the entire project for download

echo "🌹 Preparing Rose Search Engine for download..."

# Create a timestamp for the archive
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
ARCHIVE_NAME="rose-search-engine-${TIMESTAMP}"

# Create temporary directory
mkdir -p "${ARCHIVE_NAME}"

# Copy essential files
echo "📁 Copying project files..."
cp -r src "${ARCHIVE_NAME}/"
cp -r public "${ARCHIVE_NAME}/"
cp package.json "${ARCHIVE_NAME}/"
cp package-lock.json "${ARCHIVE_NAME}/"
cp tailwind.config.ts "${ARCHIVE_NAME}/"
cp tsconfig.json "${ARCHIVE_NAME}/"
cp next.config.ts "${ARCHIVE_NAME}/"
cp README.md "${ARCHIVE_NAME}/"
cp components.json "${ARCHIVE_NAME}/"
cp eslint.config.mjs "${ARCHIVE_NAME}/"
cp postcss.config.mjs "${ARCHIVE_NAME}/"

# Copy Prisma files if they exist
if [ -d "prisma" ]; then
    cp -r prisma "${ARCHIVE_NAME}/"
fi

# Create installation instructions
cat > "${ARCHIVE_NAME}/INSTALL.md" << 'EOF'
# Rose Search Engine - Installation Guide

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Open in Browser**
   ```
   http://localhost:3000
   ```

## Features
- 🌹 Beautiful rose-themed design
- 🔍 Web search and AI image generation
- 🎨 6 themes + 15 backgrounds
- ⚙️ Extensive customization options
- 📱 Fully responsive design

## Need Help?
Read the full README.md file for detailed instructions.

Enjoy your beautiful search engine! 🌹
EOF

# Create the archive
echo "📦 Creating archive..."
tar -czf "${ARCHIVE_NAME}.tar.gz" "${ARCHIVE_NAME}"

# Clean up temporary directory
rm -rf "${ARCHIVE_NAME}"

echo "✅ Success! Your project is ready for download:"
echo "📁 Archive: ${ARCHIVE_NAME}.tar.gz"
echo ""
echo "📋 Next Steps:"
echo "1. Download the ${ARCHIVE_NAME}.tar.gz file"
echo "2. Extract it to your desired location"
echo "3. Run 'npm install' to install dependencies"
echo "4. Run 'npm run dev' to start the development server"
echo ""
echo "🌹 Thank you for using Rose Search Engine!"

# Show file size
echo ""
echo "📊 Archive size:"
ls -lh "${ARCHIVE_NAME}.tar.gz" | awk '{print $5}'