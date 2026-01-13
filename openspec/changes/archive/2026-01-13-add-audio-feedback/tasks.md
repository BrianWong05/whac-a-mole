# Tasks: Add Audio Feedback System

## Overview
Implement audio feedback for mole hits, allowing overlapping sounds for rapid consecutive hits.

---

## Tasks

### 1. Create Audio Utility Module
- [x] Create `src/utils/audio.js` with `playSound` function
- [x] Use `new Audio()` pattern for overlapping sounds
- [x] Handle potential playback errors gracefully

**Verification**: Unit test or manual test that `playSound` executes without errors.

---

### 2. Integrate Sound into Game Logic
- [x] Import `playSound` in `src/pages/Game/index.jsx`
- [x] Call `playSound` inside `handleHit` after score increment
- [x] Use absolute path `/pop.mp3` for sound file

**Depends on**: Task 1

**Verification**: Manual test - hit a mole and hear the sound.

---

### 3. Test Overlapping Sounds
- [x] Rapidly hit multiple moles in quick succession
- [x] Verify sounds overlap (second sound doesn't cut off first)

**Depends on**: Task 2

**Verification**: Manual test in browser.

---

### 4. Verify Autoplay Policy Compliance
- [x] Reload the page and immediately start the game
- [x] Confirm sound plays on first mole hit (after "Start" button interaction)
- [x] Test on Chrome (most strict autoplay policy)

**Depends on**: Task 2

**Verification**: Manual test - no console errors about autoplay policy.

---

### 5. Add Sound Asset (User Action)
- [x] User places `pop.mp3` in `/public` folder
- [x] OR: Code uses fallback CDN URL for testing

**Verification**: Sound file accessible at `/pop.mp3` or fallback URL works.

---

## Parallelization Notes
- Tasks 1 and 5 can be done in parallel
- Tasks 2, 3, 4 are sequential and depend on Task 1

