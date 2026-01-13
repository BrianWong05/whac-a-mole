# Routing Specification

## ADDED Requirements

### Requirement: URL Structure
- The app MUST use `HashRouter` for compatibility with static file hosting.
- The base path for assets SHALL be `/whac-a-mole/`.

#### Scenario: Root access
- **Given** the user accesses the root URL
- **Then** the "Home" page is rendered.

#### Scenario: Game start
- **When** the user clicks "Start Game"
- **Then** the router navigates to `/game`.

### Requirement: Deployment Configuration
- `vite.config.js` MUST specify `base: '/whac-a-mole/'`.

#### Scenario: Asset loading
- **Given** the app is deployed to `domain.com/whac-a-mole/`
- **When** the app loads
- **Then** all JS and CSS assets are fetched from `/whac-a-mole/assets/...`.
