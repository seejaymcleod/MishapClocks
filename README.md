# MishapClocks

MishapClocks is a web-based interactive tool designed for tabletop roleplaying games to track and roll magic mishaps on a complex, circular "Magic Mandala" clock UI. Caster classes cast spells of varying tiers, choose a Cast School Polarity (e.g., Thermal, Aero, Electromagnetic, etc., positive or negative), and roll mishaps that visually escalate and highlight slices on the mandala.

## Features
- **Dynamic Mandala Generation**: Creates a responsive, scalable SVG representation of the magic schools and tiers.
- **Mishap Rolling**: Implements custom mishap rules (School + Effect rolls) with escalation events like "Axis Fracture" for doubles.
- **Customization Options**: Includes multiple view modes, label positioning, styling, and color overlays configurable via UI settings.
- **Spell Database**: A built-in search tool for default spells with class and tier filtering.

## Getting Started
To run the project locally, ensure you have [Node.js](https://nodejs.org/) installed, then:
1. Run `npm install` to install dependencies (Vite).
2. Run `npm run dev` to start the local development server.
3. Open the provided localhost URL in your browser.

## File Structure
- `index.html`: Main UI layout.
- `src/main.js`: Central application state, UI handlers, SVG rendering, and rolling logic.
- `src/style.css`: Styling rules, grid layouts, animations, and mandala result states.
- `src/mishapData.js`: Default mishap tier definitions, DC, dice tracks, and OSR text rulings.
- `src/spells.js`: Database of default spells for autocomplete/search.
- `mishap_rules.md`: Textual reference of the mishap system rules.
- `context.md`: Project architecture and logic breakdown.
