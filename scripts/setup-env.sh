#!/bin/bash

# Get the absolute path of the script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

# Function to copy example env file if .env doesn't exist
setup_env() {
    local service=$1
    if [ ! -f "${PROJECT_ROOT}/${service}/.env" ] && [ -f "${PROJECT_ROOT}/${service}/.env.example" ]; then
        echo "Creating .env file for ${service}"
        cp "${PROJECT_ROOT}/${service}/.env.example" "${PROJECT_ROOT}/${service}/.env"
    fi
}

# Root .env (build-time remote URLs for the host / Docker Compose)
if [ ! -f "${PROJECT_ROOT}/.env" ] && [ -f "${PROJECT_ROOT}/.env.example" ]; then
    echo "Creating .env file for <root>"
    cp "${PROJECT_ROOT}/.env.example" "${PROJECT_ROOT}/.env"
fi

# Setup env files for each service
setup_env "host-dashboard"
setup_env "remote-auth"
setup_env "remote-components"
setup_env "remote-vue"