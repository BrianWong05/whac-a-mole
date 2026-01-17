# metrics-tracking Specification

## Purpose
TBD - created by archiving change track-performance-metrics. Update Purpose after archive.
## Requirements
### Requirement: Track Total Spawns
The game MUST count the total number of times a mole attempts to spawn (or successfully spawns) during a session and store this value.

#### Scenario: Basic Spawn Counting
The user starts a game. 10 moles pop up in total during the 60s session. The user hits 5. At the end of the game, the system records "Total Spawns" as 10.

### Requirement: Track Reaction Time
The game MUST calculate the time difference (in milliseconds) between a mole appearing and the user clicking it for every successful hit.

#### Scenario: Reaction Time Calculation
A mole spawns at timestamp T=1000ms. The user successfully clicks the mole at T=1500ms. The system records a reaction time of 500ms for this hit.

### Requirement: Calculate Hit Rate
The result screen MUST display the hit rate percentage, calculated as (Score / Total Spawns) * 100.

#### Scenario: hit Rate Display
The user finishes a game with a Score of 5 and Total Spawns of 10. The Result screen displays "命中率: 50%".

### Requirement: Calculate Average Reaction Time
The result screen MUST display the average reaction time of all successful hits in seconds.

#### Scenario: Average Time Display
The user gets two hits during the game: one at 500ms and one at 700ms. The average is 600ms. The Result screen displays "平均反應時間: 0.60 秒".

### Requirement: Display Detailed Log
The result screen MUST provide a scrollable list of individual reaction times for all successful hits.

#### Scenario: Detailed Log Display
The user finishes a game. On the Result screen, there is a list showing:
"第 1 下: 0.50s"
"第 2 下: 0.70s"

