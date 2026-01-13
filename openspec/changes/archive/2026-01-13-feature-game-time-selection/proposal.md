# Proposal: Game Time Selection

## Why
Currently, the game lasts for a fixed 60 seconds (or has a hardcoded initial state). Different users have different attention spans or therapy needs. Adding a time selection allows for shorter sessions (e.g., 30s) or longer challenges (e.g., 120s), making the game more adaptable and user-friendly.

## What Changes
- **Home Screen**:
    - Add "Duration Selection" (遊戲時間): 30s, 60s, Custom.
    - Add "Speed Selection" (速度): Normal (正常), Fast (快速).
- **Game Logic**: Update `Game` component to accept `duration` and `speed` from router state.

## Implementation Details

### UI Design
- A segmented control or horizontal list of clickable timestamps on the Home screen.
- Selected time is visually highlighted.
- Default selection: 60s.

### Logic Flow
1. User selects time (state in `Home`).
2. User clicks difficulty button.
3. `navigate('/game', { state: { difficulty: '...', duration: <selectedTime> } })`
4. `Game` reads `location.state.duration`.
