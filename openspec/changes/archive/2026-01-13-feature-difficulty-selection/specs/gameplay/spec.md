# Gameplay Specification Delta

## MODIFIED Requirements

### Requirement: Game Loop
The game loop logic SHALL be adapted to support multiple difficulties, controlling the maximum number of concurrent moles.

#### Scenario: Easy Mode Spawn
- **Given** the difficulty is set to "Easy"
- **Then** the maximum number of simultaneous moles on screen SHALL be 1.

#### Scenario: Hard Mode Spawn
- **Given** the difficulty is set to "Hard"
- **Then** the maximum number of simultaneous moles on screen SHALL be 2.
- **And** new moles SHALL NOT spawn on already active holes.

## ADDED Requirements

### Requirement: Difficulty Configuration
- The game MUST accept a difficulty parameter strictly of 'easy' or 'hard'.
- Default difficulty SHALL be 'easy' if not specified.

#### Scenario: Default Difficulty
- **Given** no difficulty is provided in the state
- **Then** the game defaults to logic for "Easy" mode.
