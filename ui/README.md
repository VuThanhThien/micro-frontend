### **UI Micro Frontend**

This is the UI micro frontend, which provides reusable UI components for other micro frontends, such as `ArtistList` and `ArtistDetails`.

## Features
- Reusable components such as `Title` and `Wave` (loading indicator)
- Built with React and TypeScript
- Styled using TailwindCSS and clsx

## Setup

1. Install dependencies:
  ```bash
  yarn install
  ```
2. Build the app:
  ```bash
  yarn build
  ```
3. Run the preview server:
  ```bash
  yarn preview
  ```

### **Module Federation**
This application exposes the following UI components via Module Federation:

Exposed components: Title, Wave
Remote Entry: http://localhost:3002/assets/remoteEntry.js