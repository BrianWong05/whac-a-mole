# Spec: History Tracking

## ADDED Requirements

### Requirement: Save Game Results
The application MUST save the result of every completed game to the device's persistent `localStorage`.

#### Scenario: Auto-Save on Completion
User finishes a game with Score 10. The result page loads. The data `{ id, date, score: 10, ... }` is appended to the `whac-a-mole-history` array in localStorage.

### Requirement: View History List
The application MUST provide a dedicated page to view the list of past game records, sorted by Newest First.

#### Scenario: Navigate to History
User clicks "History" on the Home screen. A list of cards appears, showing the most recent game first.

### Requirement: Clear History
The application MUST allow the user to clear all saved history records.

#### Scenario: Clear All Records
User clicks "Clear All History" on the History page. The local storage key `whac-a-mole-history` is removed, and the list updates to show the "Empty State" message.
