# Proposal: Persistent Game History

## Change ID
`persist-game-history`

## Summary
Implement a persistent history system that saves game results to `localStorage` and provides a new "History" page for users to view their past performance.

## Motivation
Users currently lose all performance data when they leave the result screen. To support long-term therapeutic analysis and progress tracking, the app needs to persist game records and present them in a user-friendly list.

## Gap Analysis
- **Current**: No data persistence. Results are ephemeral in React Router state.
- **Missing**:
    - `localStorage` integration in `Result.jsx`.
    - New `/history` route and page component.
    - Navigation entry point in `Home.jsx`.

## Capabilities
- **Data Persistence**: Automatically save game stats (date, score, accuracy, reaction time) on game completion.
- **History Review**: Browse past records sorted by newest first.
- **Data Management**: Ability to clear all history.

## Risks & Mitigations
- **Storage Limits**: `localStorage` is limited (~5MB), but text-based JSON records are small. It would take tens of thousands of games to hit the limit.
- **Duplicate Saves**: `useEffect` in `Result.jsx` might run twice in Strict Mode. We'll use a `useRef` flag or `location.key` check to ensure the save only happens once per game session.
