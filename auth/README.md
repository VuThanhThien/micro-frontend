### **ArtistDetails Micro Frontend**

It loads detailed information about an artist, including their top albums and tracks, using the Last.fm API.

## Features
- Displays artist details including their top albums and tracks
- Data fetching with SWR and Axios
- Integrated with Last.fm API
- Micro frontend integration using Module Federation

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
This application exposes the ArtistDetails component via Module Federation for use in other applications (e.g., ArtistList).

Remote Entry: http://localhost:3001/assets/remoteEntry.js