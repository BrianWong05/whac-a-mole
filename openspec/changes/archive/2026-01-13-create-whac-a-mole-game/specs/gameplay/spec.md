# Gameplay Specification

## ADDED Requirements

### Requirement: Game Loop
- The game session MUST last exactly 60 seconds.
- Moles SHALL appear randomly in a 3x3 grid.
- Moles MUST disappear automatically if not hit within the timeframe (determined by speed setting).

#### Scenario: Timer runs out
- **Given** the game timer reaches 0
- **Then** the game automatically navigates to the `/result` page.

### Requirement: Scoring & Feedback
- Only positive feedback SHALL be shown.
- Missing a mole SHALL result in no visual penalty, just the mole disappearing.

#### Scenario: Player hits a mole
- **Given** an active mole is on screen
- **When** the user clicks/taps the mole area
- **Then** the score increments by 1
- **And** a "Star" or "Heart" icon appears briefly
- **And** the text "好棒!" (Great Job!) is displayed.

### Requirement: Settings
- Users MUST be able to toggle between "Slow" and "Fast" speeds.
- Users MUST be able to toggle mole size.

#### Scenario: Speed adjustment
- **Given** the user selects "Fast" mode
- **Then** the mole active duration is reduced.
