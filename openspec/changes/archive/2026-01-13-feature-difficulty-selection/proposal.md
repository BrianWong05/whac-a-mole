# Proposal: Difficulty Selection & Multi-Mole Logic

## Objective
Update "Whac-A-Mole" to include a Difficulty Selection screen (Easy/Hard) and refactor game logic to support multiple concurrent moles for increased difficulty.

## Why
To improve the training value and engagement of the Whac-A-Mole game, specifically for users with varying levels of motor control. A one-size-fits-all approach doesn't provide enough challenge for advanced users or a clear entry point for beginners.

## What Changes
- Replaced the single start button with a difficulty selection interface.
- Refactored game state to support concurrent active moles.
- Implemented a parallelized spawning algorithm constrained by difficulty settings.

## Background
Currently, the game launches directly into a single mode where only one mole appears at a time. The `activeMole` state is a single integer. To support "Hard Mode" (Challenge Mode), we need to allow up to 2 moles simultaneously, requiring a state refactor to an array.

## Implementation Details

### 1. Home Screen Revamp
- Remove single "Start Game" button.
- Add "Easy Mode" (簡單模式) and "Hard Mode" (挑戰模式) buttons.
- Pass difficulty selection to `Game` page via Router state.

### 2. Game Logic Refactor
- **State Migration**: `activeMole` (number) -> `activeIndices` (number[]).
- **Spawn Logic**:
    - **Easy**: Maintains strictly 1 active mole max.
    - **Hard**: Allows up to 2 active moles.
    - **Collision**: Ensure new spawns do not overlap with existing active indices.

### 3. Visuals
- Distinct button styles (Green for Easy, Orange/Red for Hard).
- Large accessible touch targets.

## Verification
- Validate state transition from Home to Game.
- Verify "Easy" mode never shows >1 mole.
- Verify "Hard" mode shows up to 2 moles.
- Ensure no overlapping moles.
