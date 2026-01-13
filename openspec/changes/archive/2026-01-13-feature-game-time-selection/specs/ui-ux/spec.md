# UI-UX Specification Delta

## ADDED Requirements

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
