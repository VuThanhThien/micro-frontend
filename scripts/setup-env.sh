#!/bin/bash

# Function to copy example env file if .env doesn't exist
setup_env() {
    local service=$1
    if [ ! -f "${service}/.env" ] && [ -f "${service}/.env.example" ]; then
        echo "Creating .env file for ${service}"
        cp "${service}/.env.example" "${service}/.env"
    fi
}

# Setup env files for each service
setup_env "host-dashboard"
setup_env "remote-auth"
setup_env "remote-components"

# Create root .env if it doesn't exist
if [ ! -f ".env" ] && [ -f ".env.example" ]; then
    echo "Creating root .env file"
    cp .env.example .env
fi