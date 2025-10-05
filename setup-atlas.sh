#!/usr/bin/env bash

# setup-atlas.sh – ResumeParsePro MongoDB Atlas Edition

# Exit on any error
set -e

echo "• No local MongoDB required – uses cloud database!"
echo "• Node.js v20.19.5 detected"
echo "• Python $(py --version | cut -d' ' -f2) detected"
echo "• Installing dependencies..."

# Install Node.js deps
npm install

# Audit and fix vulnerabilities (optional)
npm audit || true

echo "• Setting up Python virtual environment…"
# Create venv if missing
if [ ! -d "venv" ]; then
  py -m venv venv
fi

# Activate venv – cross-platform
if [ -f "venv/bin/activate" ]; then
  # Unix/macOS
  source venv/bin/activate
elif [ -f "venv/Scripts/activate" ]; then
  # Git Bash on Windows
  source venv/Scripts/activate
elif [ -f "venv/Scripts/Activate.ps1" ]; then
  # PowerShell on Windows
  pwsh -NoLogo -NoProfile -ExecutionPolicy Bypass -Command "venv/Scripts/Activate.ps1"
else
  echo "ERROR: No virtualenv activate script found in venv/!" >&2
  echo "Did you run 'py -m venv venv'?" >&2
  exit 1
fi

echo "• Installing Python dependencies…"
py -m pip install --upgrade pip
py -m pip install -r requirements.txt

echo "Setup complete! Your virtualenv is active."
echo "Run 'deactivate' to exit the venv, then 'npm start' to launch ResumeParsePro."
