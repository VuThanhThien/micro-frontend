### **ArtistList Micro Frontend (Host)**

This is the host application that displays a list of top artists fetched from the Last.fm API. It integrates with the `ArtistDetails` and `UI` micro frontends.

## Features
- Displays a list of top artists using the Last.fm API
- Fetches artist data with SWR and Axios
- Loads artist details via the `ArtistDetails` micro frontend
- Uses shared UI components from the `UI` micro frontend
- Smooth animations using Framer Motion

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
This application integrates the ArtistDetails and UI micro frontends via Module Federation.

Remotes:
- artistDetails: http://localhost:3001/assets/remoteEntry.js
- ui: http://localhost:3002/assets/remoteEntry.js