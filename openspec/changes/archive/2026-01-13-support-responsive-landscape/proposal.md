# Support Responsive Landscape Orientation

## Problem
The current game is locked to a vertical mobile view. On landscape screens, the interface appears as a narrow column with significant unused space on the sides.

## Why
The goal is to improve the user experience on tablets and desktop browsers by utilizing the extra horizontal space, rather than forcing a mobile-sized column.

## What Changes
Implement a responsive layout that adapts to device orientation:
- **Portrait Mode**: Retain the current vertical stack (Header -> Grid -> Controls).
- **Landscape Mode**: Adopt a side-by-side split layout (Left: Stats/Controls, Right: Grid) to maximize screen real estate and accessibility.

## Scope
- Refactor `App.jsx` layout container.
- Update `Game.jsx` with responsive grid and flexbox logic.
- No changes to game logic or assets.
