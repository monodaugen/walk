**
 * Ring Walk Route Suggestion Tool
 * ----------------------------------
 * This is a React web app that generates 5 loop (ring) walking routes based on a user-defined starting point, pace, and walking duration.
 * It uses OpenStreetMap + OSRM for routing, and Leaflet.js for map rendering.
 *
 * 📦 Features:
 * - Click map to set start point
 * - Set walk time (e.g. 45 minutes)
 * - Set walking pace (e.g. 12 min/km)
 * - Generate 5 unique walking loops
 * - Visualize routes on map with color and stats
 *
 * 🚀 Tech Stack:
 * - React
 * - Leaflet.js
 * - OSRM public API
 * - Tailwind CSS (optional)
 *
 * 📁 Folder Structure:
 * - src/App.jsx (main component)
 * - public/index.html
 * - index.js (React entry point)
 *
 * 🛠 Setup Instructions:
 * -----------------------
 * 1. Clone repo:
 *    git clone https://github.com/YOUR_USERNAME/ring-walk-route-app
 *    cd ring-walk-route-app
 *
 * 2. Install dependencies:
 *    npm install
 *
 * 3. Start development server:
 *    npm run dev (or npm start if using Create React App)
 *
 * 4. Open in browser:
 *    http://localhost:5173 (or default port)
 *
 * 🧾 Build & Deploy:
 * -------------------
 * For Vite:
 *    npm run build
 *    Then deploy `dist/` to Netlify, Vercel, GitHub Pages, etc.
 *
 * For CRA:
 *    npm run build
 *    Deploy `build/` folder
 *
 * 📤 Deployment Example:
 * - Netlify: drag and drop the build folder on Netlify UI
 * - GitHub Pages: use `gh-pages` branch with correct `homepage` in package.json
 *
 * 🗺️ Credits:
 * - Leaflet.js (map)
 * - OpenStreetMap (tiles & data)
 * - OSRM (public routing API)
 *
 * ✨ Future Features (Optional):
 * - GPX download for each route
 * - Avoid major roads option
 * - Elevation profile using open-elevation API
 */
