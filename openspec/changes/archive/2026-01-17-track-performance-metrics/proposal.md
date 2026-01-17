# Proposal: Track Performance Metrics

## Change ID
`track-performance-metrics`

## Summary
Upgrade the Whac-A-Mole game to track detailed performance metrics (Total Spawns, Reaction Time) and display them on the Result screen in Traditional Chinese. This allows for therapeutic analysis of the user's hand-eye coordination.

## Motivation
The current game only tracks the final score. To serve as a therapeutic tool ("Hand-Eye Training"), we need granular data on the user's performance, specifically how fast they react to stimuli and their overall hit rate.

## Gap Analysis
- **Current**: 
    - `Game.jsx` tracks `score` and `timeLeft`.
    - `Result.jsx` displays only `score`.
- **Missing**:
    - No record of how many moles spawned vs. how many were hit.
    - No timing data for how long it took to hit a mole.
    - Result screen is too simple for analysis.

## Capabilities
- **Performance Tracking**: The game engine will record timestamps for every spawn and calculate reaction durations for every hit.
- **Detailed Reporting**: The result screen will present derived metrics (Hit Rate, Avg Reaction Time) and a log of individual reaction times.

## Risks & Mitigations
- **Logic Overhead**: Tracking every spawn time might add slight memory usage, but for a 60s game, it's negligible (max ~100 spawns).
- **Navigation State**: `history` state size is limited, but sending an array of ~100 integers is safe.
