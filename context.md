# Mishap Clocks - Project Context

This file serves as a comprehensive breakdown of the project architecture, file structure, state objects, core logic, and styling systems to provide context for AI coding assistants.

---

## 1. Project Overview & Architecture
Mishap Clocks is a web-based interactive tool designed for tabletop roleplaying games to track and roll magic mishaps on a complex, circular "Magic Mandala" clock UI. Caster classes (Wizard/Priest) cast spells of varying tiers (T0–T5), choose a Cast School Polarity (e.g., Thermal, Aero, Electro/Electromagnetism, etc., positive or negative), and roll mishaps that escalate and highlight slices of the mandala.

- **Frontend Core**: Vanilla HTML5, CSS3, and JavaScript (ES Modules).
- **Bundler/Dev Server**: Vite.
- **Rendering Model**: The Magic Mandala is rendered dynamically as a scalable inline SVG built with JavaScript DOM elements.

---

## 2. Directory & File Structure

```
MishapClocks/
├── index.html                  # Main UI layout and skeleton structure
├── package.json                # Project script configuration (Vite, build, dev)
├── mishap_rules.md             # Textual reference of the mishap system rules
├── context.md                  # This project breakdown file
└── src/
    ├── main.js                 # Central application state, UI handlers, SVG rendering, and rolling logic
    ├── style.css               # Styling rules, grid layouts, animations, and mandala result states
    ├── mishapData.js           # Mishap tier definitions, DC, dice, and OSR text rulings
    └── spells.js               # Database of default spells (Priest/Wizard) for autocomplete/search
```

---

## 3. State Models (`src/main.js`)

The application is driven by three main global state variables in [main.js](file:///c:/Users/Seejay/source/repos/MishapClocks/src/main.js):

### `appState`
Controls UI preferences, scaling options, and the source data:
- `overlayStyle`: `'classic'`, `'floating-pill'`, `'constant-column'`, or `'radial-arc'` (defines how DC/dice pills look).
- `viewMode`: `'full'`, `'clean-top'`, `'clean-bottom'`, `'stacked-pill'`, etc.
- `magicNodes`: Array of 8 magic schools with icons, colors, labels, opposites, and polarity info.
- `scaledTiers`: Deep copy of mishap data tiers that can be modified or scaled dynamically.
- `rollFontSize`: Font size for the central HUD roll numbers.

### `mishapState`
Controls the current state of the Cosmic Mishap Roller:
- `selectedSchoolIdx`: Integer index of the cast school selected by the user.
- `selectedPolarity`: `'positive'` or `'negative'` sign.
- `selectedTier`: Integer (0–5), representing the active cast tier selected under "SPELL TIER".
- `displayedTier`: Integer (0–5), representing the tier currently highlighted on the mandala. (Decoupled from `selectedTier` to ensure that rolls causing tier escalations do not mutate the user's selected casting tier buttons).

### `spellState`
Manages the spell search tab:
- `selectedTier`: `'all'` or integer (1–5) representing the filter state for spell tier listing.

---

## 4. Core Logic Flows

### Mandala Rendering (`renderScaledMandala`)
- Clears the inner HTML of `#target-mandala`.
- Renders an SVG element with standard background (`#1e1e1e`).
- Loops through all 6 tiers (`appState.scaledTiers.forEach((tierData, tIndex) => { ... })`).
- Draws curved wedge paths for each school slice inside each tier.
- If `overlayStyle !== 'classic'`, renders vertical pill structures containing Tiers (T0–T5), Dice, and DCs:
  - If a pill corresponds to `mishapState.displayedTier`, it is marked with the class `selected-tier`.
  - Texts get marked with classes `.overlay-text-dice`, `.overlay-text-dc`, `.overlay-text-tier`, appending `selected-tier` when relevant.

### Roll Mishap Logic (`rollMishap`)
1. Resets `mishapState.displayedTier = mishapState.selectedTier` and clears previous mandala highlights.
2. Re-renders the mandala (`renderScaledMandala()`) to refresh the pill selection state back to the casting tier.
3. Appends `.has-results` class to `#target-mandala` to trigger CSS styling overrides.
4. Generates 2 random numbers: `d1` (School) and `d2` (Effect) from 1 to 8.
5. **Standard Roll** (`d1 !== d2`):
   - Computes results based on cast school, cast polarity, and selected tier.
   - Highlights the rolled slices using `highlightMandalaElements()`.
6. **Axis Fracture / Doubles Roll** (`d1 === d2`):
   - Escalates the tier (`currentTier = initialTier + 1`).
   - Runs a `while` loop to check for explosions/resonance (rolling `d3 === d1` increases tier further).
   - Clamps the final tier: `finalTierClamp = Math.min(currentTier, 5)`.
   - Sets `mishapState.displayedTier = finalTierClamp;` (keeping `selectedTier` intact).
   - Re-renders the mandala (`renderScaledMandala()`) and re-adds `.has-results`.
   - Highlights the final escalated slices on the mandala.

### Reset Roller (`btn-mishap-reset` handler)
- Clears highlighted slice and polarity classes in the DOM.
- Removes `.has-results` from `#target-mandala`.
- Resets `mishapState.displayedTier = mishapState.selectedTier`.
- Re-renders the mandala to restore neutral pill state.

---

## 5. Styling Systems & Result Overlays (`src/style.css`)

The style system uses high-contrast colors, glows, and transitions to guide user focus.

### Default State (Neutral/Reset)
- `.mandala-overlay-box`: Styled with `stroke: rgba(255, 255, 255, 0.15) !important`, `stroke-width: 4px`.
- `.overlay-text-*`: All text values (DC, dice, tier) have `opacity: 1.0 !important` for normal brightness.

### Rolled State (`.has-results` active on `#target-mandala`)
- Slices, labels, and text elements that do **not** have the `.highlighted` class are dimmed via:
  ```css
  .has-results .mandala-slice:not(.highlighted) {
    fill-opacity: 0.25;
    filter: grayscale(80%) brightness(0.6);
  }
  ```
- **Selected Tier Pill**:
  - The box with `.selected-tier` receives a thick yellow selection highlight:
    ```css
    .has-results .mandala-overlay-box.selected-tier {
      stroke: #fbbf24 !important;
      stroke-width: 8px !important;
    }
    ```
- **Unselected Tier Pills**:
  - Keep the default border styling.
- **Pill Text**:
  - `.has-results .overlay-text-*:not(.selected-tier)` dims to `opacity: 0.25 !important`.
  - `.has-results .overlay-text-*.selected-tier` stays bright at `opacity: 1.0 !important`.
