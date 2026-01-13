# Tasks

- [x] Update Home Screen UI
    - [x] Remove "Start Game" button
    - [x] Add "Easy Mode" button (Green, navigate state: easy)
    - [x] Add "Hard Mode" button (Orange, navigate state: hard)
- [x] Refactor Game Component State
    - [x] Change `activeMole` to `activeIndices` (array)
    - [x] Update render loop to check `activeIndices.includes(index)`
    - [x] Refactor `handleHit` to process generic index removal
- [x] Implement Multi-Mole Logic
    - [x] Read `difficulty` from location state (default 'easy')
    - [x] Abstract `runSpawnCycle` logic for reuse
    - [x] Effect: Start Cycle A (always)
    - [x] Effect: Start Cycle B (if difficulty === 'hard')
- [x] Verify
    - [x] Test Easy Mode (1 mole max)
    - [x] Test Hard Mode (2 moles observed)
    - [x] Test Hit logic (score increments properly, specific mole removed)
