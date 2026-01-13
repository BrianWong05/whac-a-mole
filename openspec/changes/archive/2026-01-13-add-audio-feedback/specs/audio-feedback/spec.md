# audio-feedback Specification

## Purpose
Provide immediate audio feedback when a player successfully hits a mole, enhancing the game's sensory experience and providing confirmation of successful actions.

## ADDED Requirements

### Requirement: Hit Sound Effect
- A short, positive sound effect SHALL play immediately when the player successfully hits a mole.
- The sound MUST use the HTML5 Audio API (`new Audio()`).
- The sound file path SHALL be `/pop.mp3` (located in the public folder).

#### Scenario: Sound plays on hit
- **Given** the game is in progress
- **When** the player successfully clicks/taps an active mole
- **Then** the score increments by 1
- **And** a "pop" sound effect plays immediately.

### Requirement: Overlapping Sounds
- Multiple sounds MUST be able to play simultaneously (overlap).
- If the user taps two moles quickly, the second sound SHALL NOT cut off the first.

#### Scenario: Rapid consecutive hits
- **Given** two moles are visible simultaneously (Hard mode)
- **When** the player hits both within 100ms
- **Then** both sound effects play fully without interruption.

### Requirement: Browser Autoplay Compliance
- Audio playback MUST only be triggered after a user interaction (e.g., clicking "Start Game").
- The implementation SHALL NOT attempt to play audio before user interaction to avoid browser autoplay policy violations.

#### Scenario: First hit after game start
- **Given** the user just started the game by clicking a mode button
- **When** the user hits their first mole
- **Then** the sound plays successfully without browser console errors.

## Cross-References
- **gameplay** - Extends "Scoring & Feedback" with audio dimension
- **ui-ux** - Complements existing visual feedback
