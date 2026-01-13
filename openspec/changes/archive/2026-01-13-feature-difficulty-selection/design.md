# Design: Multi-Mole Spawning Logic

## Architecture

### State Management
Current:
```javascript
const [activeMole, setActiveMole] = useState(null);
```

Proposed:
```javascript
const [activeIndices, setActiveIndices] = useState([]);
```

### Spawning Strategy (Hard Mode)
To support up to 2 moles without complex single-loop management, we will employ **Concurrent Spawn Cycles**:

1.  **Cycle A**: The primary loop (always active). Spawns a mole, waits for it to expire/hit, waits for gap, repeats.
2.  **Cycle B**: The secondary loop (active only in Hard Mode). Runs identical logic but independently.

**Collision Handling**:
When a cycle attempts to pick a hole:
```javascript
do {
  nextMole = random(0..8);
} while (activeIndices.includes(nextMole));
```

**State Updates**:
Using functional state updates to ensure atomicity:
```javascript
setActiveIndices(prev => [...prev, newMole]);
// ... later ...
setActiveIndices(prev => prev.filter(i => i !== newMole));
```

### Difficulty Context
Passed via `location.state`:
```javascript
const { state } = useLocation();
const difficulty = state?.difficulty || 'easy'; // Default to easy if direct access
```

- **Easy**: 1 Spawn Cycle.
- **Hard**: 2 Spawn Cycles.
