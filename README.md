# Micro Frontend App

This project demonstrates the use of micro frontends in a music app built using Vite, React, and TypeScript, with the help of Module Federation. It consists of independent applications that come together to provide functionality such as displaying a list of artists, showing artist details, and reusable UI components.

## Project Structure

- **artist-list**: Displays a list of top artists using the Last.fm API.
- **artist-details**: Displays detailed information about a selected artist.
- **ui**: Contains reusable UI components (e.g., title, loading indicator) shared across the applications.
- **types**: Shared TypeScript types used across all applications.

## Features

- Micro Frontend architecture with Module Federation
- State and TypeScript type sharing between micro frontends
- Integration with Last.fm API for artist data
- TailwindCSS and NextUI for UI components
- SWR for data fetching
- PNPM Workspace for monorepo management

## Prerequisites

- Node.js (v16 or higher)
- PNPM (v8 or higher)

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/VuThanhThien/micro-frontend
   cd vite-micro-frontends
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Run the development servers:
   ```bash
   pnpm dev
   ```

4. For production build:
   ```bash
   pnpm build
   pnpm preview
   ```

5. Visit http://localhost:3000 to see the host application in action.

## Available Scripts

- `pnpm dev`: Run all applications in development mode
- `pnpm build`: Build all applications
- `pnpm preview`: Preview all built applications
- `pnpm clean`: Clean build artifacts from all applications
