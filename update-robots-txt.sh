#!/usr/bin/env bash

# Move to the directory containing this script
cd "$(dirname "$(realpath "${BASH_SOURCE[0]}")")" || exit 1

curl -L https://raw.githubusercontent.com/ai-robots-txt/ai.robots.txt/refs/heads/main/robots.txt -o static/robots.txt
