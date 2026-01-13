# Add Audio Feedback System

## Summary
Add immediate audio feedback when a player successfully hits a mole, enhancing the gameplay experience with a satisfying "pop" sound effect.

## Why
Audio feedback is a fundamental game design element that provides immediate sensory confirmation of player actions. The current game only uses visual feedback, which can feel "silent" and less engaging. Adding a satisfying "pop" sound on successful hits will make the game feel more polished and rewarding, especially for children who benefit from multi-sensory feedback.

## Motivation
Currently, the game provides only visual feedback (score increment, "好棒!" text) when hitting a mole. Adding audio feedback will:
- Create a more engaging and satisfying user experience
- Provide multi-sensory confirmation of successful hits
- Make rapid consecutive hits feel more rewarding

## Scope
This change adds a new **audio-feedback** capability that integrates with the existing gameplay system.

### In Scope
- Create a `playSound` utility function using HTML5 Audio API
- Support sound overlap for rapid consecutive hits
- Integrate audio trigger in `handleHit` function
- Respect browser autoplay policies (audio initialized after user interaction)

### Out of Scope
- Background music
- Sound effects for misses or timeouts
- Volume controls or mute toggles (future enhancement)
- Different sound effects per difficulty

## Technical Approach

### Audio Implementation
- Use `new Audio(soundUrl)` to play sounds
- Create a **new Audio instance per hit** to allow overlapping sounds
- Sound file: `/pop.mp3` in the public folder (or fallback to a CDN-hosted copyright-free sound)

### Browser Autoplay Policy Handling
- Audio context is only created after the user clicks "Start Game" (Easy/Hard mode button)
- No preloading required; each hit creates its own Audio instance

### Integration Point
- Modify `handleHit` function in `src/pages/Game/index.jsx`
- Add sound playback immediately after score increment

## Sound Asset

> [!NOTE]
> The implementation will use `/pop.mp3` from the public folder. For testing, a copyright-free fallback URL can be used:
> `https://cdn.freesound.org/previews/707/707270_11523868-lq.mp3` (bubble pop sound from Freesound.org, CC0 license)

## Affected Files

| File | Change Type |
|------|-------------|
| `src/pages/Game/index.jsx` | MODIFY - Add sound playback in `handleHit` |
| `src/utils/audio.js` | NEW - Audio utility module |
| `public/pop.mp3` | NEW - Sound asset (user-provided) |

## Related Specs
- **gameplay** - Extends "Scoring & Feedback" requirement
