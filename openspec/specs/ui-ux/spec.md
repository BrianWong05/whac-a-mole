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

