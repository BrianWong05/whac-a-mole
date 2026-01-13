# UI-UX Specification Delta

## ADDED Requirements

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
