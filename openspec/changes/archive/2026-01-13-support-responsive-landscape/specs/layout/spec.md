# Layout Requirements

## ADDED Requirements

### Requirement: Responsive Layout Strategies
The game layout MUST adapt to the device orientation to maximize usability and screen utilization.


#### Scenario: Portrait Mode Behavior
- **Given** the device is in portrait orientation (vertical)
- **Then** the game layout MUST render as a vertical stack: Header -> Grid -> Controls.
- **And** the container width MUST be constrained (e.g., `max-w-md`) to ensure playability.

#### Scenario: Landscape Mode Behavior
- **Given** the device is in landscape orientation (horizontal)
- **Then** the game layout MUST switch to a side-by-side split view.
- **And** the Left Panel (approx. 30% width) MUST contain the Score, Timer, and "Stop/Settings" controls.
- **And** the Right Panel (approx. 70% width) MUST contain the 3x3 Game Grid.
- **And** the Game Grid MUST scale to fit the vertical height (`100dvh`) without causing page scroll.
- **And** the targets (moles) MUST remain proportional (`aspect-square`).
