FROM --platform=linux/amd64 node:20.11.1-alpine

WORKDIR /app

# Install pnpm and typescript globally
RUN npm install -g pnpm@latest typescript

# Copy workspace config first
COPY pnpm-workspace.yaml ./

# Copy package files
COPY package.json pnpm-lock.yaml ./
COPY types/package.json ./types/package.json

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy type definitions
COPY types ./types

# Create volume directory for type definitions
VOLUME /app/types

# Keep container running
CMD ["tail", "-f", "/dev/null"]
