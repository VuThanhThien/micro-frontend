# Micro Frontend Dashboard

This project demonstrates the use of micro frontends in a dashboard application built using Vite, React, and TypeScript, with the help of Module Federation. The project consists of independent applications that work together to provide functionality such as user management, authentication, and reusable UI components.

## Project Structure

- **host-dashboard**: Main application with layout and routing
  - Port: 3000
  - Features: Dashboard, user management, profile
  - Tech stack: React, TypeScript, TailwindCSS, Vite

- **remote-auth**: Independent authentication module
  - Port: 3001
  - Features: Login, register, forgot password
  - Tech stack: React, TypeScript, TailwindCSS, Vite

- **remote-components**: Shared component library
  - Port: 3002
  - Features: Reusable UI components
  - Tech stack: React, TypeScript, TailwindCSS, Vite

- **types**: Shared TypeScript types directory

## Key Features

- Micro Frontend architecture with Module Federation
- Lazy loading of components from remote apps
- Shared state and types between micro frontends
- Modern UI with TailwindCSS
- State management with React Query
- Routing with React Router DOM
- Monorepo management with PNPM Workspace

## System Requirements

- Node.js (v16 or higher)
- PNPM (v8 or higher)

## Installation

1. Clone repository:
   ```bash
   git clone https://github.com/VuThanhThien/micro-frontend
   cd vite-micro-frontends
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Run development servers:
   ```bash
   pnpm dev
   ```

4. Build for production:
   ```bash
   pnpm build
   pnpm preview
   ```

5. Visit http://localhost:3000 to see the main application

## Available Scripts

- `pnpm dev`: Run all applications in development mode
- `pnpm build`: Build all applications
- `pnpm preview`: Preview built applications
- `pnpm clean`: Clean build artifacts

## Important Notes

- Use react-router-dom instead of react-router
- Remote apps must be started before the host app
- Ensure ports are not conflicting
- Module Federation configuration must match between host and remote apps