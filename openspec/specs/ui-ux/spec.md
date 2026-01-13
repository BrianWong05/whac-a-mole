# ui-ux Specification

## Purpose
TBD - created by archiving change create-whac-a-mole-game. Update Purpose after archive.
## Requirements
### Requirement: Accessibility
- Touch interactions MUST be optimized for motor control issues.
- Zooming on double-tap MUST be disabled.

#### Scenario: Forgiving Hitbox
- **Given** a visible mole
- **When** the user taps slightly outside the visible mole graphic (within `p-6` padding)
- **Then** the hit registers as successful.

#### Scenario: Prevent Zoom
- **Given** a touch device
- **When** the user double-taps quickly
- **Then** the viewport does NOT zoom in (enforced by `touch-action: manipulation`).

### Requirement: Responsiveness
- The layout MUST fit within `100dvh` (dynamic viewport height) to prevent scrolling on mobile browsers.

#### Scenario: Mobile View
- **Given** the app is open on a mobile browser with address bar visible
- **Then** the game board is fully visible without strict scrolling needed.

### Requirement: Home Screen
- The "Start Game" button SHALL be removed.
- **Added**: "Easy Mode" button.
    - Label: "簡單模式"
    - Subtitle: "(一次一隻)"
    - Color: Green (visual cue for safety/ease)
- **Added**: "Hard Mode" button.
    - Label: "挑戰模式"
    - Subtitle: "(一次兩隻)"
    - Color: Orange/Red (visual cue for danger/challenge)

#### Scenario: Challenge Mode Selection
- **Given** the user is on the Home screen
- **When** the user clicks "Hard Mode"
- **Then** the game starts with difficulty set to "Hard".

### Requirement: Game Duration Selection
- The Home screen MUST allow the user to select a game duration before starting.
- Options: 30 seconds, 60 seconds (default), or Custom.
- The selected duration MUST be visually distinct.
- Custom input must allow numeric values (suggested range 10-999).

#### Scenario: Custom Time
- **Given** the user selects the custom input
- **When** the user types "45"
- **Then** the game starts with a 45-second timer.

### Requirement: Speed Selection
- The Home screen MUST allow selection of game speed: Normal (slow) or Fast.
- Default shall be Normal.
- **Normal** (正常): Easier, standard pacing.
- **Fast** (快速): Faster mole appearance/disappearance.

#### Scenario: Selecting 30s
- **Given** the user is on the Home Screen
- **When** the user taps "30s"
- **Then** the "30s" option becomes highlighted
- **And** subsequent game starts will last 30 seconds.

