# Design: Whac-A-Mole Game Architecture

## Architecture
- **Framework**: React (Vite)
- **Styling**: Tailwind CSS
- **Routing**: `react-router-dom` (HashRouter)

## Component Structure
- `App.jsx`: Main layout, Router setup.
- `pages/Home.jsx`: Landing screen.
- `pages/Game.jsx`: Core gameplay logic.
- `pages/Result.jsx`: Score summary.

## Configuration Details

### Vite Configuration (`vite.config.js`)
Must set `base` to ensure assets load correctly in subdirectory deployment.

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/whac-a-mole/', // CRITICAL: For deployment
})
```

### Routing (`main.jsx`)
Using `HashRouter` to avoid server-side routing issues on static hosts.

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
)
```

## Accessibility & UI Strategy
- **Touch Action**: `touch-action: manipulation` utility in Tailwind to prevent double-tap zoom.
- **Viewport**: `h-dvh` for full mobile height.
- **Hitboxes**: Moles will be wrapped in a transparent container with `p-6` padding to increase the clickable area without visual clutter.

## Game Logic State
- `score`: Integer.
- `timeLeft`: Integer (starts at 60).
- `activeMole`: Index (0-8) or null.
- `settings`: { speed: 'slow' | 'fast', size: 'normal' | 'large' }.

## Reference Implementation (Proposed)

### App.jsx
```jsx
// Proposed structure
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Game from './pages/Game';
import Result from './pages/Result';

function App() {
  return (
    <div className="min-h-dvh bg-yellow-50 font-sans text-gray-900 touch-manipulation">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </div>
  );
}
export default App;
```
