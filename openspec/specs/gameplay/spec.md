# gameplay Specification

## Purpose
TBD - created by archiving change create-whac-a-mole-game. Update Purpose after archive.
## Requirements
### Requirement: Game Loop
- The game session length SHALL be determined by the user's selection (30s, 60s, or 120s).
- The default duration SHALL be 60 seconds.

#### Scenario: Variable Timer
- **Given** the user selected a duration of 120 seconds
- **When** the game starts
- **Then** the timer countdown starts at 120.

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

### Requirement: Difficulty Configuration
- The game MUST accept a difficulty parameter strictly of 'easy' or 'hard'.
- Default difficulty SHALL be 'easy' if not specified.

#### Scenario: Default Difficulty
- **Given** no difficulty is provided in the state
- **Then** the game defaults to logic for "Easy" mode.

