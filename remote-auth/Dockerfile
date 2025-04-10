# syntax=docker/dockerfile:1.4
FROM --platform=linux/amd64 node:20.11.1-alpine as builder

WORKDIR /app

# Install required tools
RUN apk add --no-cache python3 make g++

# Install pnpm and typescript globally
RUN npm install -g pnpm@latest typescript

# Copy workspace config first
COPY pnpm-workspace.yaml ./

# Copy all package.json files
COPY package.json pnpm-lock.yaml ./
COPY types/package.json ./types/
COPY host-dashboard/package.json ./host-dashboard/
COPY remote-auth/package.json ./remote-auth/
COPY remote-components/package.json ./remote-components/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
WORKDIR /app/remote-auth
RUN pnpm install && pnpm build

# Debug: List contents of dist directory
RUN ls -la dist/assets/

# Production stage
FROM --platform=linux/amd64 nginx:stable-alpine

# Copy built files from builder stage
COPY --from=builder /app/remote-auth/dist /usr/share/nginx/html

# Debug: List contents after copying
RUN ls -la /usr/share/nginx/html/assets/

# Copy nginx configuration
COPY remote-auth/nginx.conf /etc/nginx/conf.d/default.conf

# Create directory for types
RUN mkdir -p /app/types

# Mount point for types volume
VOLUME /app/types

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"] 
