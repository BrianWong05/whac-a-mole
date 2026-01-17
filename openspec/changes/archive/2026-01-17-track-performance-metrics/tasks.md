# Implementation Tasks

1.  **Game Logic Refactor** (`src/pages/Game/index.jsx`)
    -   [x] Initialize `totalSpawns` ref to count every mole appearance.
    -   [x] Initialize `spawnTimes` ref (Map/Object) to store `{ moleIndex: timestamp }` when `occupiedHoles` is updated.
    -   [x] Initialize `reactionHistory` ref (Array) to store reaction times in ms.
    -   [x] Update `activeIndices` logic to record spawn time.
    -   [x] Update `handleHit` to calculate `Date.now() - spawnTime` and push to `reactionHistory`.
    -   [x] Update `endGame` (and navigation) to pass `{ score, totalSpawns, reactionHistory }` in state.

2.  **Result Page Update** (`src/pages/Result/index.jsx`)
    -   [x] Update `useLocation` to retrieve `totalSpawns` and `reactionHistory`.
    -   [x] Calculate `hitRate`: `(score / totalSpawns * 100).toFixed(0)`.
    -   [x] Calculate `avgReaction`: `(average(reactionHistory) / 1000).toFixed(2)` seconds.
    -   [x] Add UI section for "總出現次數" (Total Spawns).
    -   [x] Add UI section for "命中率" (Hit Rate).
    -   [x] Add UI section for "平均反應時間" (Average Reaction Time).
    -   [x] Add scrollable list for "Details" (e.g., "第 1 下: 0.5s").

3.  **Verification**
    -   [x] Manual test: Play one full game, count spawns manually (~5-10), verify Result page matches.
    -   [x] Verify calculation correctness (e.g., hit 2 moles, 1 fast 1 slow, check average).

