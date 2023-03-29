#!/bin/bash
git init -qqq
git remote add origin https://github.com/markshust/docker-magento
git fetch origin -qqq
# We checkout specific hash so we can ensure version stability
git checkout 41a7d8269352b8a6e43687d0110a47a987b5aa08 -- compose
mv compose/* ./
mv compose/.gitignore ./
mv compose/.vscode ./
rm -rf compose .git
git init

# Ensure these are created so Docker doesn't create them as root
mkdir -p ~/.composer ~/.ssh
