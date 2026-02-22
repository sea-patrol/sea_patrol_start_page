# sea_patrol_start_page

## Project Overview

A React + Vite application that renders a 3D scene using **React Three Fiber**. The project displays a sea background with a ship sailing on the waves, serving as the start page for the "Sea Patrol" game.

### Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | React 19 |
| **Build Tool** | Vite 7 |
| **3D Rendering** | Three.js + @react-three/fiber + @react-three/drei |
| **Testing** | Vitest + @testing-library/react + @react-three/test-renderer |
| **Linting** | ESLint (flat config) |

### Architecture

```
src/
├── main.jsx          # Entry point, renders App into #root
├── App.jsx           # Main component with Canvas and scene
├── SeaPlane.jsx      # Sea background plane (z: -10)
├── Ship.jsx          # Ship plane in foreground (z: -5)
├── setupTests.js     # Test setup (ResizeObserver polyfill)
├── App.test.jsx      # Canvas render test
├── SeaPlane.test.jsx # Sea plane test
├── Ship.test.jsx     # Ship test
└── index.css         # Global reset styles
```

## Building and Running

### Development Server

```bash
npm run dev
```

Starts Vite dev server with Hot Module Replacement (HMR).

### Build

```bash
npm run build
```

Creates production build in `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

### Run Tests

```bash
npm test          # Watch mode
npm test -- --run # Single run
```

### Linting

```bash
npm run lint
```

## Development Conventions

### Code Style

- **ESLint**: Uses flat config with `eslint-plugin-react-hooks` and `eslint-plugin-react-refresh`
- **JSX**: PascalCase for component names (ignored by `no-unused-vars`)
- **Modules**: ES modules only (`"type": "module"` in package.json)

### Testing Practices

- **Test files**: Named `*.test.jsx` alongside source files
- **Testing library**: `@testing-library/react` for React components
- **3D testing**: `@react-three/test-renderer` for Three Fiber scenes
- **Setup**: `src/setupTests.js` loaded before tests (ResizeObserver polyfill, jest-dom matchers)
- **Environment**: jsdom via Vitest config

### Project Structure

- **Components**: One component per file, default export
- **Assets**: Static files in `public/` (sea.png, ship.png)
- **Styles**: Minimal global CSS in `src/index.css`

### Git

- **Ignored**: `dist/`, `node_modules/`, `.env` files (see `.gitignore`)

## Key Dependencies

```json
{
  "@react-three/fiber": "^9.5.0",
  "@react-three/drei": "^10.7.7",
  "@react-three/test-renderer": "^9.1.0",
  "react": "^19.2.0",
  "three": "^0.183.1",
  "vitest": "^4.0.18"
}
```
