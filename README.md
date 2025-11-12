# Aurora Version History (Demo UI)

This is a single React component implementing the Aurora Version Control 'Version History Flow' desktop interface as described.

## How to Run

1. **Set up a React app** (using [Create React App](https://create-react-app.dev/), [Vite](https://vitejs.dev/), or similar.)
   
   Example for Create React App:
   ```bash
   npx create-react-app aurora-ui-demo
   cd aurora-ui-demo
   ```
2. **Copy the `AuroraVersionHistory.jsx` file** into your `src/` directory.

3. **Edit `src/App.js` (or `src/App.jsx`)** to import and render the component:
   ```jsx
   import React from 'react';
   import AuroraVersionHistory from './AuroraVersionHistory';

   function App() {
     return <AuroraVersionHistory />;
   }

   export default App;
   ```

4. **Run the app:**
   ```bash
   npm start
   ```

5. **Open [http://localhost:3000](http://localhost:3000) in your desktop browser** to see the Aurora Version History Flow UI.

---

- All code and styles are in one file, with no external dependencies except React and the Inter font via Google Fonts.
- Responsive for desktop browsers, best viewed at 1200px+ width.






