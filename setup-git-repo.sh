#!/bin/bash

# Rose Search - Git Repository Setup Script
# This script helps you create your own GitHub repository

echo "🌹 Rose Search - Git Repository Setup"
echo "=================================="

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first."
    echo "Visit: https://git-scm.com/downloads"
    exit 1
fi

echo "✅ Git is installed"

# Check if user is logged in to GitHub
if ! gh auth status &> /dev/null; then
    echo "❌ Not logged into GitHub CLI"
    echo "Please run: gh auth login"
    echo "Or visit: https://github.com/cli/cli"
    echo ""
    echo "To create a repository manually:"
    echo "1. Go to https://github.com/new"
    echo "2. Create a new repository"
    echo "3. Follow the instructions below"
    exit 1
fi

echo "✅ Logged into GitHub"

# Get repository name
REPO_NAME=${1:-"rose-search"}
echo ""
echo "📝 Enter repository name (default: rose-search):"
read -p "> " REPO_NAME=" REPO_NAME

if [ -z "$REPO_NAME" ]; then
    REPO_NAME="rose-search"
fi

echo ""
echo "📝 Creating repository: $REPO_NAME"

# Create repository
gh repo create $REPO_NAME --public --description "A stunning, creative search engine with beautiful design, featuring multi-language support, voice search, real image search, and extensive customization options." --clone=false

# Add remote origin
git remote add origin https://github.com/$(gh api user --login --jq '.login' | head -1)/$REPO_NAME.git

# Push to GitHub
git push -u origin main

echo ""
echo "✅ Repository created successfully!"
echo "📁 Repository URL: https://github.com/$(gh api user --login --jq '.login' | head -1)/$REPO_NAME"
echo ""
echo "📋 Next Steps:"
echo "1. Clone your repository:"
echo "   git clone https://github.com/$(gh api user --login --jq '.login' | head -1)/$REPO_NAME.git"
echo "   cd $REPO_NAME"
echo ""
echo "2. Install dependencies:"
echo "   npm install"
echo ""
echo "3. Start development server:"
echo "   npm run dev"
echo ""
echo "4. Open in browser:"
echo "   http://localhost:3000"
echo ""
echo "🌹 Happy coding with Rose Search!"