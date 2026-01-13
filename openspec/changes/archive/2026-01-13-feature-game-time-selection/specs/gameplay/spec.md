# Gameplay Specification Delta

## MODIFIED Requirements

### Requirement: Game Loop
- The game session length SHALL be determined by the user's selection (30s, 60s, or 120s).
- The default duration SHALL be 60 seconds.

#### Scenario: Variable Timer
- **Given** the user selected a duration of 120 seconds
- **When** the game starts
- **Then** the timer countdown starts at 120.
