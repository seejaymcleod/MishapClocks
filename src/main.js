import { spells } from './spells.js';
import { defaultScaledTiers } from './mishapData.js';

// State
let appState = {
  viewMode: 'curved-axis',
  polarityMode: 'gap',
  polarityLayout: 'visual-right',
  polarityGap: 4,
  centerOuterText: false,
  outerPinOffset: 11,
  iconSeparation: 15,
  wrapDistance: 35,
  labelOffsetTop: 0,
  labelOffsetBottom: 0,
  bottomIconShift: 0,
  rollFontSize: 180,
  labelSeparation: 160,
  outerDistTop: 280,
  outerDistBottom: 280,
  overlayBoxWidth: 10.5,
  overlayBoxHeight: 188,
  overlayFontSize: 45,
  overlayStyle: 'floating-pill',
  modifierMinFontSize: 22,
  modifierMaxFontSize: 80,
  modifierDesiredFontSize: 100,
  effectWrapChars: 40,
  inlineNumberSize: 90,
  inlineNumberSpacing: 40,
  polarityCharSize: 145,
  polarityLineGap: 0,
  polarityLineLength: 10,
  polarityLineGradPos: 40,
  headerFontSize: 0.75,
  animationMode: true,
  animationSpeed: 15,
  animationDuration: 1.8,
  momentumCurve: 2,
  staticPills: false,
  clockXOffset: 0,
  clockPadding: 0,
  freeSpinMode: false,
  freeSpinFriction: 0.985,
  alignSchoolToTop: true,
  alignEffectToTop: true,
  showOuterCenterNumbers: false,
  showInlineNumbers: true,
  clockYOffset: -5,
  magicNodes: [
    { id: 'm0', label: 'Thermal', icon: 'gi-flame-spin', negativeIcon: 'gi-snowflake-1', color: '#ff4500', opposite: 'Hydro', slider: 'Injecting kinetic heat (ignition) ↔ siphoning it (absolute zero).' },
    { id: 'm1', label: 'Aero', icon: 'gi-tornado', negativeIcon: 'gi-wind-hole', color: '#87ceeb', opposite: 'Geo', slider: 'High pressure and gales ↔ suffocating vacuums.' },
    { id: 'm2', label: 'Electromagnetic', icon: 'gi-lightning-electron', negativeIcon: 'gi-radiations', color: '#ffd700', opposite: 'Dimensional', slider: 'Spiking electrical/magnetic currents ↔ grounding them into dead zones.' },
    { id: 'm3', label: 'Neural', icon: 'gi-smart', negativeIcon: 'gi-screaming', color: '#ff69b4', opposite: 'Vital', slider: 'Structuring logic and perception ↔ shattering the psyche into madness.' },
    { id: 'm4', label: 'Hydro', icon: 'gi-water-drop', negativeIcon: 'gi-desert', color: '#1e90ff', opposite: 'Thermal', slider: 'Flooding and fluidity ↔ severe desiccation and drought.' },
    { id: 'm5', label: 'Geo', icon: 'gi-stone-block', negativeIcon: 'gi-broken-wall', color: '#8b4513', opposite: 'Aero', slider: 'Density, metal, and bedrock ↔ rust, erosion, and dust.' },
    { id: 'm6', label: 'Dimensional', icon: 'gi-portal', negativeIcon: 'gi-hourglass', color: '#8a2be2', opposite: 'Electromagnetic', slider: 'Accelerating chronological flow ↔ halting momentum into stasis.' },
    { id: 'm7', label: 'Vital', icon: 'gi-beech', negativeIcon: 'gi-dead-wood', color: '#32cd32', opposite: 'Neural', slider: 'Rapid cellular growth and healing ↔ necrosis, atrophy, and decay.' },
  ],
  targetNodes: [],
  scaledTiers: JSON.parse(JSON.stringify(defaultScaledTiers))
};


let activeNodeId = null;

// Markdown Table Parser & Configuration Mapper
function parseMarkdownTables(markdownText) {
  const lines = markdownText.split(/\r?\n/);
  const tables = [];
  let currentTable = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith('|') && line.endsWith('|')) {
      const cells = line.slice(1, -1).split('|').map(c => c.trim());

      // Skip separator lines like |---|---|
      if (cells.every(cell => cell.match(/^:?-+:?$/))) {
        continue;
      }

      if (!currentTable) {
        currentTable = {
          headers: cells,
          rows: []
        };
      } else {
        currentTable.rows.push(cells);
      }
    } else {
      if (currentTable) {
        tables.push(currentTable);
        currentTable = null;
      }
    }
  }
  if (currentTable) {
    tables.push(currentTable);
  }
  return tables;
}

function mapTablesToState(tables) {
  if (tables.length < 2) return null;

  const schoolsTable = tables[0];
  const tiersTable = tables[1];

  // Parse magic nodes
  const magicNodes = schoolsTable.rows.map((row, idx) => {
    return {
      id: `m${idx}`,
      label: row[0] || `School ${idx + 1}`,
      color: row[1] || '#888888',
      icon: row[2] || 'gi-help',
      negativeIcon: row[3] || 'gi-help',
      opposite: row[4] || '',
      slider: row[5] || ''
    };
  });

  // Parse mishap tiers
  // Headers starting from index 3 are the mishap types
  const mishapTypes = tiersTable.headers.slice(3);

  const scaledTiers = tiersTable.rows.map((row, tIdx) => {
    const dc = row[1] || '';
    const dice = row[2] || '';

    const nodes = mishapTypes.map((type, i) => {
      const modifier = row[3 + i] || '—';
      const node = {
        type,
        modifier
      };
      if (i === 0) {
        node.dc = dc;
        node.dice = dice;
      }
      return node;
    });

    return {
      offset: 0,
      nodes
    };
  });

  return {
    magicNodes,
    scaledTiers
  };
}

function renderSidebarTables() { }

// Drawing Utilities
function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}

function describeArc(x, y, radius, startAngle, endAngle) {
  // Handle full circle
  if (Math.abs(endAngle - startAngle) >= 360) {
    endAngle -= 0.001; // Tiny offset to make it a valid arc, not a 0-area point
  }

  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  const d = [
    "M", start.x, start.y,
    "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
    "L", x, y,
    "Z"
  ].join(" ");

  return d;
}

function getOverlayHalfAngle(radius) {
  if (appState.overlayStyle === 'classic') return 0;
  if (appState.overlayStyle === 'radial-arc') {
    return (appState.overlayBoxWidth ?? 12) / 2;
  }
  // constant-column or floating-pill
  const w = (appState.overlayStyle === 'floating-pill')
    ? (appState.overlayBoxWidth ?? 12) * 13
    : (appState.overlayBoxWidth ?? 12) * 16;
  const halfW = w / 2;
  return Math.asin(Math.min(0.99, halfW / radius)) * 180 / Math.PI;
}

// Gradient Helper function
function getGradientColor(hexColor, tIndex, isAlt) {
  let factor = 0.3 + (tIndex * 0.1);
  if (isAlt) factor -= 0.05;

  let r = parseInt(hexColor.slice(1, 3), 16);
  let g = parseInt(hexColor.slice(3, 5), 16);
  let b = parseInt(hexColor.slice(5, 7), 16);

  r = Math.min(255, Math.floor(r * factor));
  g = Math.min(255, Math.floor(g * factor));
  b = Math.min(255, Math.floor(b * factor));

  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

// Smart wrapping and font scaling helper functions
// Smart wrapping and font scaling helper functions
function splitTextIntoTwoRows(text) {
  let row1 = text;
  let row2 = '';
  if (text.includes(' - ')) {
    const parts = text.split(' - ');
    row1 = parts[0];
    row2 = '- ' + parts[1];

    // If row1 is still long and contains a space, split row1 and prepend to row2
    if (row1.length > 10 && row1.includes(' ')) {
      const words = row1.split(' ');
      const mid = Math.ceil(words.length / 2);
      row1 = words.slice(0, mid).join(' ');
      row2 = words.slice(mid).join(' ') + ' ' + row2;
    }
  } else if (text.includes(' ')) {
    const words = text.split(' ');
    const mid = Math.ceil(words.length / 2);
    row1 = words.slice(0, mid).join(' ');
    row2 = words.slice(mid).join(' ');
  }
  return { row1, row2 };
}

function splitTextIntoThreeRows(text) {
  let row1 = '';
  let row2 = '';
  let row3 = '';
  if (text.includes(' - ')) {
    const parts = text.split(' - ');
    const mainText = parts[0];
    const tierPart = '- ' + parts[1];

    if (mainText.includes(' + ')) {
      const mainParts = mainText.split(' + ');
      row1 = mainParts[0] + ' +';
      row2 = mainParts[1];
      row3 = tierPart;
    } else if (mainText.includes('+')) {
      const mainParts = mainText.split('+');
      row1 = mainParts[0] + ' +';
      row2 = mainParts[1].trim();
      row3 = tierPart;
    } else if (mainText.includes(' ')) {
      const mainParts = mainText.split(' ');
      row1 = mainParts[0];
      row2 = mainParts[1];
      row3 = tierPart;
    } else {
      row1 = mainText;
      row2 = tierPart;
    }
  } else {
    const words = text.split(' ');
    if (words.length >= 3) {
      row1 = words[0];
      row2 = words[1];
      row3 = words.slice(2).join(' ');
    } else if (words.length === 2) {
      row1 = words[0];
      row2 = words[1];
    } else {
      row1 = text;
    }
  }
  return { row1, row2, row3 };
}

function calculateCurvedFontSize(text, radius, angleStep, numLines = 1) {
  const arcLength = radius * (angleStep * Math.PI / 180);
  const maxChars = text.length || 1;
  const targetWidth = arcLength * 0.85; // 85% safety margin

  // Calculate size to fit width
  let size = targetWidth / (maxChars * 0.52);

  // Height constraints:
  // Ring height is 280px.
  // We keep font sizes highly consistent across tiers using slider configurations:
  // 1 line: max modifierMaxFontSize
  // 2 lines: max modifierMaxFontSize - 5
  // 3 lines: max modifierMaxFontSize - 10
  const maxVal = appState.modifierMaxFontSize ?? 55;
  const minVal = appState.modifierMinFontSize ?? 22;

  let limit = maxVal;
  if (numLines === 2) limit = Math.max(minVal, maxVal - 5);
  if (numLines === 3) limit = Math.max(minVal, maxVal - 10);

  size = Math.min(limit, size);
  return Math.max(minVal, size);
}

function getOptimalModifierLayout(text, radius, angleStep) {
  // Try single line
  const fsSingle = calculateCurvedFontSize(text, radius, angleStep, 1);

  // Try double line
  const { row1: row2_1, row2: row2_2 } = splitTextIntoTwoRows(text);
  let fsDouble = 0;
  if (row2_2) {
    const fsRow2_1 = calculateCurvedFontSize(row2_1, radius, angleStep, 2);
    const fsRow2_2 = calculateCurvedFontSize(row2_2, radius, angleStep, 2);
    fsDouble = Math.min(fsRow2_1, fsRow2_2);
  }

  // Try triple line
  const { row1: row3_1, row2: row3_2, row3: row3_3 } = splitTextIntoThreeRows(text);
  let fsTriple = 0;
  if (row3_3) {
    const fsRow3_1 = calculateCurvedFontSize(row3_1, radius, angleStep, 3);
    const fsRow3_2 = calculateCurvedFontSize(row3_2, radius, angleStep, 3);
    const fsRow3_3 = calculateCurvedFontSize(row3_3, radius, angleStep, 3);
    fsTriple = Math.min(fsRow3_1, fsRow3_2, fsRow3_3);
  }

  const desiredVal = appState.modifierDesiredFontSize ?? 50;

  // Prefer single line if it achieves a good size (>= desiredVal)
  if (fsSingle >= desiredVal) {
    return {
      isDouble: false,
      isTriple: false,
      row1: text,
      row2: '',
      row3: '',
      fontSize: fsSingle
    };
  }

  // Otherwise, compare double and triple lines. Choose the one that yields the larger font size.
  if (fsTriple > fsDouble && fsTriple > fsSingle) {
    return {
      isDouble: false,
      isTriple: true,
      row1: row3_1,
      row2: row3_2,
      row3: row3_3,
      fontSize: fsTriple
    };
  } else if (fsDouble > fsSingle) {
    return {
      isDouble: true,
      isTriple: false,
      row1: row2_1,
      row2: row2_2,
      row3: '',
      fontSize: fsDouble
    };
  } else {
    return {
      isDouble: false,
      isTriple: false,
      row1: text,
      row2: '',
      row3: '',
      fontSize: fsSingle
    };
  }
}

// Render Magic Mandala (Merged with Scaled Mandala)
function renderMagicMandala() {
  renderScaledMandala(); // keep it as a proxy so existing listeners don't break
}

function renderScaledMandala() {
  const container = document.getElementById('target-mandala');
  if (!container) return;
  container.innerHTML = '';

  const size = 5200;
  const cx = size / 2;
  const cy = size / 2;

  const holeRadius = 120;
  const outerRadius = 1800;
  const ringWidth = (outerRadius - holeRadius) / 6;

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", `0 0 ${size} ${size}`);

  // Add defs for text shadow filter
  const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
  const filter = document.createElementNS("http://www.w3.org/2000/svg", "filter");
  filter.setAttribute("id", "text-shadow-filter");
  filter.setAttribute("x", "-20%");
  filter.setAttribute("y", "-20%");
  filter.setAttribute("width", "140%");
  filter.setAttribute("height", "140%");

  const dropShadow = document.createElementNS("http://www.w3.org/2000/svg", "feDropShadow");
  dropShadow.setAttribute("dx", "0");
  dropShadow.setAttribute("dy", "4");
  dropShadow.setAttribute("stdDeviation", "8");
  dropShadow.setAttribute("flood-color", "#000000");
  dropShadow.setAttribute("flood-opacity", "0.95");

  filter.appendChild(dropShadow);
  defs.appendChild(filter);
  svg.appendChild(defs);

  // Background
  const bg = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  bg.setAttribute("cx", cx);
  bg.setAttribute("cy", cy);
  bg.setAttribute("r", outerRadius);
  bg.setAttribute("fill", "#1e1e1e");
  svg.appendChild(bg);

  const numSlices = appState.magicNodes.length;
  const angleStep = 360 / Math.max(numSlices, 1);

  appState.scaledTiers.forEach((tierData, tIndex) => {
    const tier = tierData.nodes;
    const innerR = holeRadius + tIndex * ringWidth;
    const outerR = innerR + ringWidth;

    // Draw slices
    appState.magicNodes.forEach((school, i) => {
      const node = tier[i] || { dc: '—', dice: '—' };
      const centerAngle = i * angleStep + angleStep / 2;
      const startAngle = i * angleStep;
      const endAngle = (i + 1) * angleStep;
      const sliceAngle = angleStep;

      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

      const startOuter = polarToCartesian(cx, cy, outerR, endAngle);
      const endOuter = polarToCartesian(cx, cy, outerR, startAngle);
      const startInner = polarToCartesian(cx, cy, innerR, startAngle);
      const endInner = polarToCartesian(cx, cy, innerR, endAngle);
      const largeArcFlag = sliceAngle <= 180 ? "0" : "1";

      const d = [
        "M", startOuter.x, startOuter.y,
        "A", outerR, outerR, 0, largeArcFlag, 0, endOuter.x, endOuter.y,
        "L", startInner.x, startInner.y,
        "A", innerR, innerR, 0, largeArcFlag, 1, endInner.x, endInner.y,
        "Z"
      ].join(" ");

      path.setAttribute("d", d);

      const isAlt = (i % 2 !== 0);
      const brightness = getGradientColor(school.color, tIndex, isAlt);
      path.setAttribute("fill", brightness);
      path.setAttribute("stroke", "var(--bg-color)");
      path.setAttribute("stroke-opacity", "0.5");
      path.setAttribute("stroke-width", "8");
      path.setAttribute("class", "node-path mandala-slice");
      path.setAttribute("data-school-idx", i);
      path.setAttribute("data-tier-idx", tIndex);
      path.setAttribute("id", `mandala-slice-${tIndex}-${i}`);

      path.addEventListener('click', () => openModal(school, 'magic'));

      svg.appendChild(path);

      // Add text label
      const isThermalSlice = (i === 0);
      const hideModText = (appState.overlayStyle === 'classic') && isThermalSlice;
      const modText = (tIndex === 0 || hideModText) ? '' : (node.modifier || '—');
      const textRadius = innerR + ringWidth * 0.5;

      if (modText) {
        // Calculate adjusted angles for text if adjacent to overlay
        let textStartAngle = startAngle;
        let textEndAngle = endAngle;
        let textCenterAngle = centerAngle;
        let textSpan = angleStep;

        if (appState.overlayStyle !== 'classic') {
          const overlayHalfAngle = getOverlayHalfAngle(textRadius);
          const margin = 2; // degrees margin to clear boundaries
          const offsetAngle = overlayHalfAngle + margin;

          if (i === 0) {
            // First slice (to the right of 12 o'clock boundary)
            textStartAngle = startAngle + offsetAngle;
            textSpan = angleStep - offsetAngle;
            textCenterAngle = (textStartAngle + textEndAngle) / 2;
          } else if (i === numSlices - 1) {
            // Last slice (to the left of 12 o'clock boundary)
            textEndAngle = endAngle - offsetAngle;
            textSpan = angleStep - offsetAngle;
            textCenterAngle = (textStartAngle + textEndAngle) / 2;
          }
        }

        if (['curved-axis', 'horizontal-hud', 'radial-vector', 'minimal-rune', 'curved-text'].includes(appState.viewMode)) {
          const layout = getOptimalModifierLayout(modText, textRadius, textSpan);
          const isBottomHalf = (textCenterAngle > 90 && textCenterAngle < 270);

          const drawCurvedText = (textContent, radiusOffset, fontSize, lineIndex = 1, totalLines = 1) => {
            const currentRadius = textRadius + radiusOffset;
            let pathData;
            if (isBottomHalf) {
              const pathStart = polarToCartesian(cx, cy, currentRadius, textEndAngle);
              const pathEnd = polarToCartesian(cx, cy, currentRadius, textStartAngle);
              pathData = [
                "M", pathStart.x, pathStart.y,
                "A", currentRadius, currentRadius, 0, 0, 0, pathEnd.x, pathEnd.y
              ].join(" ");
            } else {
              const pathStart = polarToCartesian(cx, cy, currentRadius, textStartAngle);
              const pathEnd = polarToCartesian(cx, cy, currentRadius, textEndAngle);
              pathData = [
                "M", pathStart.x, pathStart.y,
                "A", currentRadius, currentRadius, 0, 0, 1, pathEnd.x, pathEnd.y
              ].join(" ");
            }

            const pathId = `curved-path-${tIndex}-${i}-${radiusOffset}`;
            const defsPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
            defsPath.setAttribute("id", pathId);
            defsPath.setAttribute("class", "inner-curved-path");
            defsPath.setAttribute("data-cx", cx);
            defsPath.setAttribute("data-cy", cy);
            defsPath.setAttribute("data-radius", currentRadius);
            defsPath.setAttribute("data-base-radius", textRadius);
            defsPath.setAttribute("data-line-index", lineIndex);
            defsPath.setAttribute("data-total-lines", totalLines);
            defsPath.setAttribute("data-start-angle", textStartAngle);
            defsPath.setAttribute("data-end-angle", textEndAngle);
            defsPath.setAttribute("data-school-idx", i);
            defsPath.setAttribute("d", pathData);
            defsPath.setAttribute("fill", "none");
            svg.appendChild(defsPath);

            const textEl = document.createElementNS("http://www.w3.org/2000/svg", "text");
            textEl.setAttribute("class", "scaled-text effect-name-text");
            textEl.setAttribute("data-school-idx", i);
            textEl.setAttribute("data-tier-idx", tIndex);
            textEl.setAttribute("fill", "#ffffff");

            textEl.setAttribute("font-size", `${fontSize}px`);
            textEl.setAttribute("font-weight", "bold");
            textEl.style.pointerEvents = "none";

            const textPath = document.createElementNS("http://www.w3.org/2000/svg", "textPath");
            textPath.setAttribute("href", `#${pathId}`);
            textPath.setAttribute("startOffset", "50%");
            textPath.setAttribute("text-anchor", "middle");
            textPath.textContent = textContent;

            textEl.appendChild(textPath);
            svg.appendChild(textEl);
          };

          if (layout.isTriple) {
            const offset1 = isBottomHalf ? -48 : 48;
            const offset2 = 0;
            const offset3 = isBottomHalf ? 48 : -48;
            drawCurvedText(layout.row1, offset1, layout.fontSize, 1, 3);
            drawCurvedText(layout.row2, offset2, layout.fontSize, 2, 3);
            drawCurvedText(layout.row3, offset3, layout.fontSize, 3, 3);
          } else if (layout.isDouble) {
            const offset1 = isBottomHalf ? -28 : 28;
            const offset2 = isBottomHalf ? 28 : -28;
            drawCurvedText(layout.row1, offset1, layout.fontSize, 1, 2);
            drawCurvedText(layout.row2, offset2, layout.fontSize, 2, 2);
          } else {
            drawCurvedText(layout.row1, 0, layout.fontSize, 1, 1);
          }
        } else {
          // Draw standard straight text (original code)
          const textPos = polarToCartesian(cx, cy, textRadius, textCenterAngle);
          const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
          text.setAttribute("x", textPos.x);
          text.setAttribute("y", textPos.y);
          text.setAttribute("class", "scaled-text effect-name-text straight-effect-text");
          text.setAttribute("data-school-idx", i);
          text.setAttribute("data-tier-idx", tIndex);
          text.setAttribute("data-text-center-angle", textCenterAngle);
          text.style.pointerEvents = "none";

          let rot = textCenterAngle;
          if (rot > 90 && rot < 270) {
            rot += 180;
          }
          text.setAttribute("transform", `rotate(${rot}, ${textPos.x}, ${textPos.y})`);
          text.setAttribute("fill", "#ffffff");
          text.setAttribute("text-anchor", "middle");
          text.setAttribute("dominant-baseline", "middle");

          // Dynamic Font Size to prevent boundary overlap in inner tiers
          const arcLength = textRadius * (textSpan * Math.PI / 180);
          const maxChars = modText.length || 1;
          const targetWidth = arcLength * 0.85; // 85% safety margin
          const fontSize = Math.min(80, targetWidth / (maxChars * 0.55));

          text.setAttribute("font-size", `${fontSize}px`);
          text.setAttribute("font-weight", "600");
          text.textContent = modText;
          svg.appendChild(text);
        }
      }
    });

    // Render Overlay or Classic labels
    const firstNode = tierData.nodes[0] || {};
    const diceText = firstNode.dice || '—';
    const dcText = firstNode.dc || '—';

    const isSelectedTier = (tIndex === mishapState.displayedTier);
    const textOpacity = isSelectedTier ? "1.0" : "0.25";
    const fontSize = appState.overlayFontSize ?? 45;

    if (appState.overlayStyle === 'classic') {
      // -------------------------------------------------------------
      // CLASSIC MODE (No overlay boxes, original layout restored)
      // -------------------------------------------------------------
      if (['curved-axis', 'horizontal-hud', 'radial-vector', 'minimal-rune', 'curved-text'].includes(appState.viewMode)) {
        const getDynamicFontSize = (text, radius) => {
          const arcLength = radius * (angleStep * Math.PI / 180);
          const maxChars = text.length || 1;
          const targetWidth = arcLength * 0.85;
          return Math.min(75, targetWidth / (maxChars * 0.50));
        };

        const pathRadius = innerR + ringWidth * 0.5;
        const modifierText = firstNode.modifier || '—';

        const createCurvedLine = (id, radius, textContent, color, fontSize, customClass = "scaled-text") => {
          const pathStart = polarToCartesian(cx, cy, radius, 0);
          const pathEnd = polarToCartesian(cx, cy, radius, 45);
          const pathData = [
            "M", pathStart.x, pathStart.y,
            "A", radius, radius, 0, 0, 1, pathEnd.x, pathEnd.y
          ].join(" ");

          const defsPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
          defsPath.setAttribute("id", id);
          defsPath.setAttribute("d", pathData);
          defsPath.setAttribute("fill", "none");
          svg.appendChild(defsPath);

          const textEl = document.createElementNS("http://www.w3.org/2000/svg", "text");
          textEl.setAttribute("class", customClass);
          textEl.setAttribute("fill", color);
          textEl.setAttribute("font-size", `${fontSize}px`);
          textEl.setAttribute("font-weight", "bold");
          textEl.setAttribute("filter", "url(#text-shadow-filter)");
          textEl.style.pointerEvents = "none";

          const textPath = document.createElementNS("http://www.w3.org/2000/svg", "textPath");
          textPath.setAttribute("href", `#${id}`);
          textPath.setAttribute("startOffset", "50%");
          textPath.setAttribute("text-anchor", "middle");
          textPath.textContent = textContent;

          textEl.appendChild(textPath);
          svg.appendChild(textEl);
        };

        if (tIndex === 0) {
          const rRow1 = pathRadius + 35;
          const rRow2 = pathRadius - 35;
          createCurvedLine(`curved-path-${tIndex}-r1`, rRow1, `${diceText}   ${dcText}`, "#fbbf24", 45, "scaled-text");
          createCurvedLine(`curved-path-${tIndex}-r2`, rRow2, "T0", "rgba(255, 255, 255, 0.7)", 56, "scaled-text tier-label-text");
        } else {
          let row1Text = modifierText;
          let row2Text = '';
          if (modifierText.includes(' - ')) {
            const parts = modifierText.split(' - ');
            row1Text = parts[0];
            row2Text = '- ' + parts[1];
          } else if (modifierText.includes(' ')) {
            const words = modifierText.split(' ');
            const mid = Math.ceil(words.length / 2);
            row1Text = words.slice(0, mid).join(' ');
            row2Text = words.slice(mid).join(' ');
          }

          if (row2Text) {
            const rRow1a = pathRadius + 90;
            const rRow1b = pathRadius + 40;
            const rRow2 = pathRadius - 20;
            const rRow3 = pathRadius - 85;

            const fs1 = getDynamicFontSize(row1Text, rRow1a);
            const fs2 = getDynamicFontSize(row2Text, rRow1b);

            createCurvedLine(`curved-path-${tIndex}-r1a`, rRow1a, row1Text, "#ffffff", Math.min(fs1 + 10, 80), "scaled-text effect-name-text");
            createCurvedLine(`curved-path-${tIndex}-r1b`, rRow1b, row2Text, "#ffffff", Math.min(fs2 + 10, 80), "scaled-text effect-name-text");
            createCurvedLine(`curved-path-${tIndex}-r2`, rRow2, `${diceText}   ${dcText}`, "#fbbf24", 45, "scaled-text");
            createCurvedLine(`curved-path-${tIndex}-r3`, rRow3, `T${tIndex}`, "rgba(255, 255, 255, 0.7)", 56, "scaled-text tier-label-text");
          } else {
            const rRow1 = pathRadius + 65;
            const rRow2 = pathRadius - 10;
            const rRow3 = pathRadius - 85;

            const calculatedFontSize = getDynamicFontSize(modifierText, rRow1);

            createCurvedLine(`curved-path-${tIndex}-r1`, rRow1, modifierText, "#ffffff", Math.min(calculatedFontSize + 10, 80), "scaled-text effect-name-text");
            createCurvedLine(`curved-path-${tIndex}-r2`, rRow2, `${diceText}   ${dcText}`, "#fbbf24", 45, "scaled-text");
            createCurvedLine(`curved-path-${tIndex}-r3`, rRow3, `T${tIndex}`, "rgba(255, 255, 255, 0.7)", 56, "scaled-text tier-label-text");
          }
        }
      }
    } else {
      // -------------------------------------------------------------
      // OVERLAY STYLES
      // -------------------------------------------------------------
      const boxPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
      boxPath.setAttribute("fill", "rgba(17, 24, 39, 0.95)");
      if (isSelectedTier) {
        boxPath.setAttribute("stroke", "#fbbf24");
        boxPath.setAttribute("stroke-width", "8");
        boxPath.setAttribute("stroke-opacity", "1");
      } else {
        boxPath.setAttribute("stroke", "rgba(255, 255, 255, 0.15)");
        boxPath.setAttribute("stroke-width", "4");
      }
      boxPath.setAttribute("class", isSelectedTier ? "mandala-overlay-box selected-tier" : "mandala-overlay-box");

      const yCenter = cy - (innerR + ringWidth * 0.5);

      if (appState.overlayStyle === 'floating-pill') {
        const w = (appState.overlayBoxWidth ?? 12) * 13;
        const h = appState.overlayBoxHeight ?? 165;
        const pillW = w - 36;
        const pillH = h;
        boxPath.setAttribute("d", `M ${cx - pillW / 2} ${yCenter - pillH / 2} h ${pillW} a 18 18 0 0 1 18 18 v ${pillH - 36} a 18 18 0 0 1 -18 18 h ${-pillW} a 18 18 0 0 1 -18 -18 v ${-pillH + 36} a 18 18 0 0 1 18 -18 Z`);
      } else if (appState.overlayStyle === 'constant-column') {
        const w = (appState.overlayBoxWidth ?? 12) * 16;
        const halfW = w / 2;

        const angleOuter = Math.asin(Math.min(0.99, halfW / outerR));
        const angleOuterDeg = angleOuter * 180 / Math.PI;
        const angleInner = Math.asin(Math.min(0.99, halfW / innerR));
        const angleInnerDeg = angleInner * 180 / Math.PI;

        const startOuter = polarToCartesian(cx, cy, outerR, angleOuterDeg);
        const endOuter = polarToCartesian(cx, cy, outerR, -angleOuterDeg);
        const startInner = polarToCartesian(cx, cy, innerR, -angleInnerDeg);
        const endInner = polarToCartesian(cx, cy, innerR, angleInnerDeg);

        const d = [
          "M", startOuter.x, startOuter.y,
          "A", outerR, outerR, 0, 0, 0, endOuter.x, endOuter.y,
          "L", startInner.x, startInner.y,
          "A", innerR, innerR, 0, 0, 1, endInner.x, endInner.y,
          "Z"
        ].join(" ");
        boxPath.setAttribute("d", d);
      } else {
        // 'radial-arc'
        const boxHalfAngle = (appState.overlayBoxWidth ?? 12) / 2;
        const startOuter = polarToCartesian(cx, cy, outerR, boxHalfAngle);
        const endOuter = polarToCartesian(cx, cy, outerR, -boxHalfAngle);
        const startInner = polarToCartesian(cx, cy, innerR, -boxHalfAngle);
        const endInner = polarToCartesian(cx, cy, innerR, boxHalfAngle);
        const largeArcFlag = "0";

        const d = [
          "M", startOuter.x, startOuter.y,
          "A", outerR, outerR, 0, largeArcFlag, 0, endOuter.x, endOuter.y,
          "L", startInner.x, startInner.y,
          "A", innerR, innerR, 0, largeArcFlag, 1, endInner.x, endInner.y,
          "Z"
        ].join(" ");
        boxPath.setAttribute("d", d);
      }
      svg.appendChild(boxPath);

      // -------------------------------------------------------------
      // OVERLAY TEXT (Stacked Vertically)
      // -------------------------------------------------------------
      let activeFontSize = fontSize;
      if (appState.overlayStyle !== 'floating-pill') {
        const boxWidth = (appState.overlayStyle === 'constant-column')
          ? (appState.overlayBoxWidth ?? 12) * 16
          : innerR * ((appState.overlayBoxWidth ?? 12) * Math.PI / 180);

        const maxTextChars = Math.max(diceText.length, dcText.length, 4);
        const fitFontSize = (boxWidth * 0.85) / (maxTextChars * 0.55);
        activeFontSize = Math.min(fontSize, Math.max(16, fitFontSize));
      }

      // Snug line spacing: 1.12 factor for floating-pill, 1.35 for other styles
      const lineSpacing = (appState.overlayStyle === 'floating-pill') ? activeFontSize * 1.12 : activeFontSize * 1.35;
      const cleanDcText = dcText.replace(/\s+/g, '');

      // Dice text (Top)
      const diceTextEl = document.createElementNS("http://www.w3.org/2000/svg", "text");
      diceTextEl.setAttribute("x", cx);
      diceTextEl.setAttribute("y", yCenter - lineSpacing);
      diceTextEl.setAttribute("fill", "#fbbf24");
      diceTextEl.setAttribute("font-size", `${activeFontSize}px`);
      diceTextEl.setAttribute("font-weight", "bold");
      diceTextEl.setAttribute("text-anchor", "middle");
      diceTextEl.setAttribute("dominant-baseline", "middle");
      diceTextEl.setAttribute("opacity", textOpacity);
      diceTextEl.setAttribute("class", isSelectedTier ? "overlay-text-dice selected-tier" : "overlay-text-dice");
      diceTextEl.style.pointerEvents = "none";
      diceTextEl.textContent = diceText;
      svg.appendChild(diceTextEl);

      // DC text (Middle)
      const dcTextEl = document.createElementNS("http://www.w3.org/2000/svg", "text");
      dcTextEl.setAttribute("x", cx);
      dcTextEl.setAttribute("y", yCenter);
      dcTextEl.setAttribute("fill", "#fbbf24");
      dcTextEl.setAttribute("font-size", `${activeFontSize}px`);
      dcTextEl.setAttribute("font-weight", "bold");
      dcTextEl.setAttribute("text-anchor", "middle");
      dcTextEl.setAttribute("dominant-baseline", "middle");
      dcTextEl.setAttribute("opacity", textOpacity);
      dcTextEl.setAttribute("class", isSelectedTier ? "overlay-text-dc selected-tier" : "overlay-text-dc");
      dcTextEl.style.pointerEvents = "none";
      dcTextEl.textContent = cleanDcText;
      svg.appendChild(dcTextEl);

      // Tier text (Bottom)
      const tierTextEl = document.createElementNS("http://www.w3.org/2000/svg", "text");
      tierTextEl.setAttribute("x", cx);
      tierTextEl.setAttribute("y", yCenter + lineSpacing);
      tierTextEl.setAttribute("fill", "#ffffff");
      tierTextEl.setAttribute("font-size", `${activeFontSize}px`);
      tierTextEl.setAttribute("font-weight", "bold");
      tierTextEl.setAttribute("text-anchor", "middle");
      tierTextEl.setAttribute("dominant-baseline", "middle");
      tierTextEl.setAttribute("opacity", textOpacity);
      tierTextEl.setAttribute("class", isSelectedTier ? "overlay-text-tier selected-tier" : "overlay-text-tier");
      tierTextEl.style.pointerEvents = "none";
      tierTextEl.textContent = `T${tIndex}`;
      svg.appendChild(tierTextEl);
    }
  });

  // Center circle and icon
  const centerCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  centerCircle.setAttribute("cx", cx);
  centerCircle.setAttribute("cy", cy);
  centerCircle.setAttribute("r", holeRadius);
  centerCircle.setAttribute("fill", "#111827");
  centerCircle.setAttribute("stroke", "#fbbf24");
  centerCircle.setAttribute("stroke-width", "8");
  svg.appendChild(centerCircle);

  // Mandala Central icon (atomic-slashes, perfectly centered, 2x bigger)
  const centerIconSize = holeRadius * 2.6; // 312px (previously 156px)
  const centerIconFObj = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
  centerIconFObj.setAttribute("id", "center-hud-content");
  centerIconFObj.setAttribute("x", cx - centerIconSize / 2);
  centerIconFObj.setAttribute("y", cy - centerIconSize / 2);
  centerIconFObj.setAttribute("width", centerIconSize);
  centerIconFObj.setAttribute("height", centerIconSize);
  centerIconFObj.innerHTML = `<i class="gi gi-atomic-slashes" style="font-size: ${centerIconSize}px; color: #fbbf24; display: flex; justify-content: center; align-items: center; width: 100%; height: 100%;"></i>`;
  svg.appendChild(centerIconFObj);

  // Outer Ring Section
  appState.magicNodes.forEach((school, i) => {
    const angle = i * angleStep + angleStep / 2;
    const effectName = appState.scaledTiers[0].nodes[i]?.type || `Effect ${i + 1}`;

    // Retrieve opposite school color dynamically
    const oppositeNode = appState.magicNodes.find(n => n.label === school.opposite);
    const negativeColor = oppositeNode ? oppositeNode.color : school.color;
    if (appState.viewMode === 'curved-axis' || appState.viewMode === 'curved-text') {
      const isBottomHalf = (angle > 90 && angle < 270);
      const outerDistTop = Number(appState.outerDistTop ?? 320);
      const outerDistBottom = Number(appState.outerDistBottom ?? 320);
      const centerRadius = outerRadius + (isBottomHalf ? outerDistBottom : outerDistTop);
      const labelOffsetTop = Number(appState.labelOffsetTop ?? 0);
      const labelOffsetBottom = Number(appState.labelOffsetBottom ?? 65);
      const bottomIconShift = Number(appState.bottomIconShift ?? 0);
      const rollFontSize = Number(appState.rollFontSize ?? 110);
      const labelSep = Number(appState.labelSeparation ?? 100);

      // 1. Center Big Number
      if (appState.showOuterCenterNumbers) {
        const textPos = polarToCartesian(cx, cy, centerRadius, angle);
        let rot = angle;
        if (isBottomHalf) {
          rot += 180;
        }

        const numberText = document.createElementNS("http://www.w3.org/2000/svg", "text");
        numberText.setAttribute("class", `scaled-text outer-number outer-number-${i}`);
        numberText.setAttribute("data-school-idx", i);
        numberText.setAttribute("x", textPos.x);
        numberText.setAttribute("y", textPos.y);
        numberText.setAttribute("text-anchor", "middle");
        numberText.setAttribute("dominant-baseline", "middle");
        numberText.setAttribute("fill", "#fbbf24");
        numberText.setAttribute("font-size", `${rollFontSize}px`);
        numberText.setAttribute("font-weight", "bold");
        numberText.setAttribute("filter", "url(#text-shadow-filter)");
        numberText.setAttribute("transform", `rotate(${rot}, ${textPos.x}, ${textPos.y})`);
        numberText.textContent = (i + 1).toString();
        svg.appendChild(numberText);
      }

      // Left/Right center angle calculations based on the centerOuterText toggle and iconSeparation/outerPinOffset
      let leftCenterAngle;
      let rightCenterAngle;
      const offsetVal = Number(appState.iconSeparation ?? appState.outerPinOffset ?? 15); // Default to 15 degrees for horizontal spacing
      if (appState.centerOuterText) {
        leftCenterAngle = isBottomHalf ? (angle + 15) : (angle - 15);
        rightCenterAngle = isBottomHalf ? (angle - 15) : (angle + 15);
      } else {
        leftCenterAngle = isBottomHalf ? (angle + offsetVal) : (angle - offsetVal);
        rightCenterAngle = isBottomHalf ? (angle - offsetVal) : (angle + offsetVal);
      }

      // Helper to draw centered text along a circular path segment
      const drawSingleLineText = (text, radius, centerAngle, pathId, isSchool, prefix) => {
        let pathStart, pathEnd, pathData;
        const halfSpan = 15; // 30-degree path segment span to prevent clipping

        if (isBottomHalf) {
          pathStart = polarToCartesian(cx, cy, radius, centerAngle + halfSpan);
          pathEnd = polarToCartesian(cx, cy, radius, centerAngle - halfSpan);
          pathData = [
            "M", pathStart.x, pathStart.y,
            "A", radius, radius, 0, 0, 0, pathEnd.x, pathEnd.y
          ].join(" ");
        } else {
          pathStart = polarToCartesian(cx, cy, radius, centerAngle - halfSpan);
          pathEnd = polarToCartesian(cx, cy, radius, centerAngle + halfSpan);
          pathData = [
            "M", pathStart.x, pathStart.y,
            "A", radius, radius, 0, 0, 1, pathEnd.x, pathEnd.y
          ].join(" ");
        }

        const defsPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        defsPath.setAttribute("id", pathId);
        defsPath.setAttribute("class", isSchool ? "outer-school-path" : "outer-effect-path");
        defsPath.setAttribute("data-cx", cx);
        defsPath.setAttribute("data-cy", cy);
        defsPath.setAttribute("data-radius", radius);
        defsPath.setAttribute("data-center-angle", centerAngle);
        defsPath.setAttribute("data-half-span", halfSpan);
        defsPath.setAttribute("data-school-idx", i);
        defsPath.setAttribute("data-is-school", isSchool ? "true" : "false");
        defsPath.setAttribute("d", pathData);
        defsPath.setAttribute("fill", "none");
        svg.appendChild(defsPath);

        const textEl = document.createElementNS("http://www.w3.org/2000/svg", "text");
        const extraClass = isSchool ? `outer-school-label-${i}` : `outer-effect-label-${i}`;
        textEl.setAttribute("class", `scaled-text outer-ring-text ${extraClass}`);
        textEl.setAttribute("data-school-idx", i);
        textEl.setAttribute("font-size", "70px");
        textEl.setAttribute("font-weight", isSchool ? "bold" : "normal");
        textEl.setAttribute("dominant-baseline", "middle");
        textEl.setAttribute("filter", "url(#text-shadow-filter)");
        textEl.style.pointerEvents = "none";

        const textPath = document.createElementNS("http://www.w3.org/2000/svg", "textPath");
        textPath.setAttribute("href", `#${pathId}`);
        textPath.setAttribute("startOffset", "50%");
        textPath.setAttribute("text-anchor", "middle");
        textPath.setAttribute("text-anchor", "middle");
        textPath.setAttribute("fill", isSchool ? school.color : "#e2e8f0");
        if (prefix) {
          const tspanPrefix = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
          tspanPrefix.setAttribute("font-weight", "bold");
          tspanPrefix.setAttribute("fill", "#fbbf24");
          const pSize = Number(appState.inlineNumberSize ?? 70);
          tspanPrefix.setAttribute("font-size", `${pSize}px`);
          tspanPrefix.textContent = prefix.replace(/\u00A0/g, '').trim();
          textPath.appendChild(tspanPrefix);

          const tspanText = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
          tspanText.textContent = text;
          const pSpace = Number(appState.inlineNumberSpacing ?? 30);
          tspanText.setAttribute("dx", `${pSpace}px`);
          textPath.appendChild(tspanText);
        } else {
          textPath.textContent = text;
        }

        textEl.appendChild(textPath);
        svg.appendChild(textEl);
      };

      const drawCenteredText = (text, radius, centerAngle, pathId, isSchool, prefix) => {
        // Wrap effect names if they contain a space or hyphen and are long enough
        const shouldWrap = !isSchool && (text.includes(" ") || text.includes("-")) && text.length > Number(appState.effectWrapChars ?? 40);
        if (shouldWrap) {
          let parts = [];
          if (text.includes(" ")) {
            const idx = text.indexOf(" ");
            parts = [text.substring(0, idx), text.substring(idx + 1)];
          } else {
            const idx = text.indexOf("-");
            parts = [text.substring(0, idx), text.substring(idx + 1)];
          }
          const wrapDist = Number(appState.wrapDistance ?? 25);
          const radius1 = isBottomHalf ? (radius - wrapDist) : (radius + wrapDist);
          const radius2 = isBottomHalf ? (radius + wrapDist) : (radius - wrapDist);
          drawSingleLineText(parts[0], radius1, centerAngle, `${pathId}-line1`, isSchool, prefix);
          drawSingleLineText(parts[1], radius2, centerAngle, `${pathId}-line2`, isSchool);
        } else {
          drawSingleLineText(text, radius, centerAngle, pathId, isSchool, prefix);
        }
      };

      // 2. School Name above the number (curved)
      const schoolPathId = `outer-school-path-${i}`;
      // Add bottom/top label offset directly for perfect symmetry and adjustment
      const schoolRadius = isBottomHalf ? (centerRadius + labelSep + labelOffsetBottom) : (centerRadius + labelSep + labelOffsetTop);

      let schoolPrefix = "";
      if (appState.showInlineNumbers) {
        schoolPrefix += (i + 1) + "\u00A0\u00A0\u00A0\u00A0";
      }
      if (appState.showInlineDice) {
        const dText = appState.scaledTiers?.[0]?.nodes?.[i]?.dice || '';
        if (dText) {
          schoolPrefix += "[" + dText + "]\u00A0\u00A0\u00A0\u00A0";
        }
      }
      drawCenteredText(school.label, schoolRadius, angle, schoolPathId, true, schoolPrefix);

      // 3. Effect Name below the number (curved)
      const effectPathId = `outer-effect-path-${i}`;
      // Add bottom/top label offset directly for perfect symmetry and adjustment
      const effectRadius = isBottomHalf ? (centerRadius - labelSep + labelOffsetBottom) : (centerRadius - labelSep + labelOffsetTop);

      let effectPrefix = "";
      if (appState.showInlineNumbers) {
        effectPrefix += (i + 1) + "\u00A0\u00A0\u00A0\u00A0";
      }
      drawCenteredText(effectName, effectRadius, angle, effectPathId, false, effectPrefix);

      // 4. Positive and Negative Icons (aligned horizontally along the arc, swapped positions)
      const iconSize = 180;
      const containerSize = iconSize * 2;
      const mode = appState.polarityMode || 'gap';

      const polarityOffset = appState.centerOuterText ? 15 : offsetVal;
      const ccwAngleIcon = angle - polarityOffset;
      const cwAngleIcon = angle + polarityOffset;

      let ccwAngleText = ccwAngleIcon;
      let cwAngleText = cwAngleIcon;
      let radiusTopText = centerRadius;
      let radiusBottomText = centerRadius + bottomIconShift;
      const gapVal = Number(appState.polarityGap ?? 3.2);

      if (mode === 'gap') {
        ccwAngleText = angle - polarityOffset + gapVal;
        cwAngleText = angle + polarityOffset - gapVal;
      } else if (mode === 'flanking') {
        ccwAngleText = angle - polarityOffset - gapVal;
        cwAngleText = angle + polarityOffset + gapVal;
      } else if (mode === 'above') {
        radiusTopText = centerRadius + labelSep + labelOffsetTop;
        radiusBottomText = centerRadius + labelSep + labelOffsetBottom;
      }

      const renderIcon = (iconClass, targetColor, polarity) => {
        const iconGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
        iconGroup.setAttribute("class", `outer-icon-group outer-icon-${i} clickable`);
        iconGroup.setAttribute("data-school-idx", i);
        iconGroup.setAttribute("data-polarity", polarity);
        iconGroup.setAttribute("data-base-angle", angle);
        iconGroup.setAttribute("data-ccw-angle", ccwAngleIcon);
        iconGroup.setAttribute("data-cw-angle", cwAngleIcon);

        const radiusTop = centerRadius;
        const radiusBottom = centerRadius + bottomIconShift;
        iconGroup.setAttribute("data-radius-top", radiusTop);
        iconGroup.setAttribute("data-radius-bottom", radiusBottom);

        const layout = appState.polarityLayout || 'visual-right';
        const isVisuallyBottomHalf = angle > 90 && angle < 270;
        const useCW = polarity === 'positive' ?
          (layout === 'visual-right' && isVisuallyBottomHalf ? false : true) :
          (layout === 'visual-right' && isVisuallyBottomHalf ? true : false);
        const localAngle = useCW ? cwAngleIcon : ccwAngleIcon;
        const radius = isVisuallyBottomHalf ? radiusBottom : radiusTop;
        const pos = polarToCartesian(cx, cy, radius, localAngle);
        let iconRot = localAngle + (isVisuallyBottomHalf ? 180 : 0);

        iconGroup.setAttribute("transform", `translate(${pos.x}, ${pos.y}) rotate(${iconRot})`);

        // Check if selected to preserve state on redraw
        const isSelected = (mishapState.selectedSchoolIdx === i && mishapState.selectedPolarity === polarity);
        if (isSelected) {
          iconGroup.classList.add('selected-school-polarity');
        }

        // Draw selection outer ring (dashed marquee)
        const selectionRingOuter = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        selectionRingOuter.setAttribute("class", "selection-ring-outer");
        selectionRingOuter.setAttribute("cx", 0);
        selectionRingOuter.setAttribute("cy", 0);
        selectionRingOuter.setAttribute("r", "145");
        iconGroup.appendChild(selectionRingOuter);

        // Draw selection inner ring (glowing solid)
        const selectionRingInner = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        selectionRingInner.setAttribute("class", "selection-ring-inner");
        selectionRingInner.setAttribute("cx", 0);
        selectionRingInner.setAttribute("cy", 0);
        selectionRingInner.setAttribute("r", "120");
        iconGroup.appendChild(selectionRingInner);

        const fObj = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
        fObj.setAttribute("x", -containerSize / 2);
        fObj.setAttribute("y", -containerSize / 2);
        fObj.setAttribute("width", containerSize);
        fObj.setAttribute("height", containerSize);
        fObj.innerHTML = `
          <div style="position: relative; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center;">
            <i class="gi gi-atomic-slashes selected-backdrop" style="position: absolute; font-size: ${iconSize * 1.6}px; color: #fbbf24; z-index: 1;"></i>
            <i class="gi ${iconClass} base-icon" style="position: relative; font-size: ${iconSize}px; color: ${targetColor}; z-index: 2; transition: all 0.3s ease;"></i>
          </div>
        `;
        iconGroup.appendChild(fObj);
        svg.appendChild(iconGroup);

        // Add click listener to select polarity from the circle
        iconGroup.addEventListener('click', (e) => {
          e.stopPropagation();
          selectMishapIconFromCircle(i, polarity);
        });
      };

      const drawPolarity = (symbolText, polarity) => {
        const sizeVal = Number(appState.polarityCharSize ?? 110);
        let fontSize = `${sizeVal}px`;
        let opacity = "0.45";
        let isWatermark = (mode === 'watermark');

        if (mode === 'gap' || mode === 'flanking') {
          fontSize = `${sizeVal}px`;
          opacity = "0.55";
        } else if (mode === 'above') {
          fontSize = `${Math.floor(sizeVal * 0.86)}px`;
          opacity = "0.6";
        }

        const text = symbolText === '-' ? '\u2212' : symbolText;

        const layout = appState.polarityLayout || 'visual-right';
        const isVisuallyBottomHalf = angle > 90 && angle < 270;
        const useCW = polarity === 'positive' ?
          (layout === 'visual-right' && isVisuallyBottomHalf ? false : true) :
          (layout === 'visual-right' && isVisuallyBottomHalf ? true : false);

        const localAngle = useCW ? cwAngleText : ccwAngleText;
        const radiusTop = isWatermark ? centerRadius : radiusTopText;
        const radiusBottom = isWatermark ? (centerRadius + bottomIconShift) : radiusBottomText;
        const radius = isVisuallyBottomHalf ? radiusBottom : radiusTop;

        const pos = polarToCartesian(cx, cy, radius, localAngle);
        let rot = localAngle + (isVisuallyBottomHalf ? 180 : 0);

        if (isWatermark) {
          const watermarkGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
          watermarkGroup.setAttribute("class", "watermark-group");
          watermarkGroup.setAttribute("data-polarity", polarity);
          watermarkGroup.setAttribute("data-base-angle", angle);
          watermarkGroup.setAttribute("data-ccw-angle", ccwAngleText);
          watermarkGroup.setAttribute("data-cw-angle", cwAngleText);
          watermarkGroup.setAttribute("data-radius-top", radiusTop);
          watermarkGroup.setAttribute("data-radius-bottom", radiusBottom);
          watermarkGroup.setAttribute("transform", `translate(${pos.x}, ${pos.y}) rotate(${rot})`);

          const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
          circle.setAttribute("cx", 0);
          circle.setAttribute("cy", 0);
          circle.setAttribute("r", "110");
          circle.setAttribute("stroke", school.color);
          circle.setAttribute("stroke-width", "4");
          circle.setAttribute("fill", "none");
          circle.setAttribute("opacity", "0.18");
          watermarkGroup.appendChild(circle);

          const textEl = document.createElementNS("http://www.w3.org/2000/svg", "text");
          textEl.setAttribute("x", 0);
          textEl.setAttribute("y", 0);
          textEl.setAttribute("text-anchor", "middle");
          textEl.setAttribute("dominant-baseline", "central");
          textEl.setAttribute("fill", school.color);
          textEl.setAttribute("font-size", "145px");
          textEl.setAttribute("font-weight", "bold");
          textEl.setAttribute("opacity", "0.22");
          textEl.textContent = text;
          watermarkGroup.appendChild(textEl);

          svg.appendChild(watermarkGroup);
        } else {
          const textEl = document.createElementNS("http://www.w3.org/2000/svg", "text");
          textEl.setAttribute("class", "polarity-text");
          textEl.setAttribute("data-polarity", polarity);
          textEl.setAttribute("data-base-angle", angle);
          textEl.setAttribute("data-ccw-angle", ccwAngleText);
          textEl.setAttribute("data-cw-angle", cwAngleText);
          textEl.setAttribute("data-radius-top", radiusTop);
          textEl.setAttribute("data-radius-bottom", radiusBottom);
          textEl.setAttribute("x", 0);
          textEl.setAttribute("y", 0);
          textEl.setAttribute("text-anchor", "middle");
          textEl.setAttribute("dominant-baseline", "central");
          textEl.setAttribute("fill", school.color);
          textEl.setAttribute("font-size", fontSize);
          textEl.setAttribute("font-weight", "bold");
          textEl.setAttribute("opacity", opacity);
          textEl.setAttribute("transform", `translate(${pos.x}, ${pos.y}) rotate(${rot})`);
          textEl.textContent = text;
          svg.appendChild(textEl);
        }
      };

      // Draw watermarks BEFORE icons so they sit in the background
      if (mode === 'watermark') {
        if (school.negativeIcon) drawPolarity('-', 'negative');
        if (school.icon) drawPolarity('+', 'positive');
      }

      // Render Icons
      if (school.negativeIcon) renderIcon(school.negativeIcon, school.color, 'negative');
      if (school.icon) renderIcon(school.icon, school.color, 'positive');

      // Draw other polarity label styles AFTER icons
      if (mode && mode !== 'watermark') {
        if (school.negativeIcon) drawPolarity('-', 'negative');
        if (school.icon) drawPolarity('+', 'positive');
      }

      const iconRadius = centerRadius + (isBottomHalf ? bottomIconShift : 0);

      // 5. Draw Minimalistic Translucent Curved Line Arrows pointing OUTWARDS (no arrowheads)
      const arrowRadius = iconRadius;

      const pGap = Number(appState.polarityLineGap ?? 3.5);
      const pLen = Number(appState.polarityLineLength ?? 8);
      const gradPos = Number(appState.polarityLineGradPos ?? 40);

      // Define Arrow Gradients dynamically in the SVG defs (more aggressive fade to 0.0 opacity)
      const defs = svg.querySelector('defs');
      if (defs) {
        // Left gradient: starts at center number (high opacity), ends at left icon (fully transparent)
        const leftGradId = `arrow-grad-left-${i}`;
        let leftGrad = defs.querySelector(`#${leftGradId}`);
        if (!leftGrad) {
          leftGrad = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
          leftGrad.setAttribute("id", leftGradId);
          leftGrad.setAttribute("gradientUnits", "userSpaceOnUse");
          defs.appendChild(leftGrad);
        }
        const startLeftG = polarToCartesian(cx, cy, arrowRadius, angle - pGap);
        const endLeftG = polarToCartesian(cx, cy, arrowRadius, angle - (pGap + pLen));
        leftGrad.setAttribute("x1", startLeftG.x);
        leftGrad.setAttribute("y1", startLeftG.y);
        leftGrad.setAttribute("x2", endLeftG.x);
        leftGrad.setAttribute("y2", endLeftG.y);
        leftGrad.innerHTML = `
          <stop offset="0%" stop-color="${school.color}" stop-opacity="1.0" />
          <stop offset="${gradPos}%" stop-color="${school.color}" stop-opacity="0.2" />
          <stop offset="100%" stop-color="${school.color}" stop-opacity="0.0" />
        `;

        // Right gradient: starts at center number (high opacity), ends at right icon (fully transparent)
        const rightGradId = `arrow-grad-right-${i}`;
        let rightGrad = defs.querySelector(`#${rightGradId}`);
        if (!rightGrad) {
          rightGrad = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
          rightGrad.setAttribute("id", rightGradId);
          rightGrad.setAttribute("gradientUnits", "userSpaceOnUse");
          defs.appendChild(rightGrad);
        }
        const startRightG = polarToCartesian(cx, cy, arrowRadius, angle + pGap);
        const endRightG = polarToCartesian(cx, cy, arrowRadius, angle + (pGap + pLen));
        rightGrad.setAttribute("x1", startRightG.x);
        rightGrad.setAttribute("y1", startRightG.y);
        rightGrad.setAttribute("x2", endRightG.x);
        rightGrad.setAttribute("y2", endRightG.y);
        rightGrad.innerHTML = `
          <stop offset="0%" stop-color="${school.color}" stop-opacity="1.0" />
          <stop offset="${gradPos}%" stop-color="${school.color}" stop-opacity="0.2" />
          <stop offset="100%" stop-color="${school.color}" stop-opacity="0.0" />
        `;
      }

      // Draw Left Arrow Line
      const startLeft = polarToCartesian(cx, cy, arrowRadius, angle - pGap);
      const endLeft = polarToCartesian(cx, cy, arrowRadius, angle - (pGap + pLen));

      const leftArrowLine = document.createElementNS("http://www.w3.org/2000/svg", "path");
      leftArrowLine.setAttribute("d", `M ${startLeft.x} ${startLeft.y} A ${arrowRadius} ${arrowRadius} 0 0 0 ${endLeft.x} ${endLeft.y}`);
      leftArrowLine.setAttribute("fill", "none");
      leftArrowLine.setAttribute("stroke", `url(#arrow-grad-left-${i})`);
      leftArrowLine.setAttribute("stroke-width", "8");
      leftArrowLine.setAttribute("stroke-linecap", "round");
      svg.appendChild(leftArrowLine);

      // Draw Right Arrow Line
      const startRight = polarToCartesian(cx, cy, arrowRadius, angle + pGap);
      const endRight = polarToCartesian(cx, cy, arrowRadius, angle + (pGap + pLen));

      const rightArrowLine = document.createElementNS("http://www.w3.org/2000/svg", "path");
      rightArrowLine.setAttribute("d", `M ${startRight.x} ${startRight.y} A ${arrowRadius} ${arrowRadius} 0 0 1 ${endRight.x} ${endRight.y}`);
      rightArrowLine.setAttribute("fill", "none");
      rightArrowLine.setAttribute("stroke", `url(#arrow-grad-right-${i})`);
      rightArrowLine.setAttribute("stroke-width", "8");
      rightArrowLine.setAttribute("stroke-linecap", "round");
      svg.appendChild(rightArrowLine);
    } else if (appState.viewMode === 'horizontal-hud') {
      const isBottomHalf = (angle > 90 && angle < 270);
      const outerDistTop = Number(appState.outerDistTop ?? 320);
      const outerDistBottom = Number(appState.outerDistBottom ?? 320);
      const hudRadius = outerRadius + (isBottomHalf ? outerDistBottom : outerDistTop) + 40;
      const hudPos = polarToCartesian(cx, cy, hudRadius, angle);
      let hudRot = angle;
      if (isBottomHalf) {
        hudRot += 180;
      }

      const hudGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
      hudGroup.setAttribute("class", "hud-group");
      hudGroup.setAttribute("data-angle", angle);
      hudGroup.setAttribute("data-school-idx", i);
      hudGroup.setAttribute("transform", `translate(${hudPos.x}, ${hudPos.y}) rotate(${hudRot})`);

      // Glassmorphic Capsule Background
      const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      rect.setAttribute("x", "-550");
      rect.setAttribute("y", "-90");
      rect.setAttribute("width", "1100");
      rect.setAttribute("height", "180");
      rect.setAttribute("rx", "90");
      rect.setAttribute("ry", "90");
      rect.setAttribute("fill", "rgba(13, 17, 23, 0.9)");
      rect.setAttribute("stroke", school.color);
      rect.setAttribute("stroke-width", "6");
      rect.setAttribute("filter", "url(#text-shadow-filter)");
      hudGroup.appendChild(rect);

      // Swapped: Negative Icon on Left
      const leftIconFObj = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
      leftIconFObj.setAttribute("x", "-510");
      leftIconFObj.setAttribute("y", "-60");
      leftIconFObj.setAttribute("width", "120");
      leftIconFObj.setAttribute("height", "120");
      leftIconFObj.innerHTML = `<i class="gi ${school.negativeIcon}" style="font-size: 100px; color: ${school.color}; display: flex; justify-content: center; align-items: center; width: 100%; height: 100%;"></i>`;
      hudGroup.appendChild(leftIconFObj);

      // Effect/Mishap Label on Left
      const effectText = document.createElementNS("http://www.w3.org/2000/svg", "text");
      effectText.setAttribute("x", "-380");
      effectText.setAttribute("y", "0");
      effectText.setAttribute("text-anchor", "start");
      effectText.setAttribute("dominant-baseline", "middle");
      effectText.setAttribute("fill", "#ffffff");
      effectText.setAttribute("font-size", "45px");
      effectText.setAttribute("font-weight", "normal");
      effectText.setAttribute("filter", "url(#text-shadow-filter)");
      if (appState.showInlineNumbers) {
        const tspanNum = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
        tspanNum.setAttribute("fill", "#fbbf24");
        tspanNum.setAttribute("font-weight", "bold");
        tspanNum.textContent = (i + 1) + "\u00A0\u00A0\u00A0\u00A0";
        effectText.appendChild(tspanNum);
      }
      const tspanEffectText = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
      tspanEffectText.textContent = effectName;
      effectText.appendChild(tspanEffectText);
      hudGroup.appendChild(effectText);

      // Left Transition Arrow (pointing left)
      const leftArrowFObj = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
      leftArrowFObj.setAttribute("x", "-160");
      leftArrowFObj.setAttribute("y", "-40");
      leftArrowFObj.setAttribute("width", "80");
      leftArrowFObj.setAttribute("height", "80");
      leftArrowFObj.innerHTML = `<i class="gi gi-plain-arrow gi-flip-horizontal" style="font-size: 70px; color: ${school.color}; display: flex; justify-content: center; align-items: center; width: 100%; height: 100%;"></i>`;
      hudGroup.appendChild(leftArrowFObj);

      // Center Big Number Badge
      const numCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      numCircle.setAttribute("cx", "0");
      numCircle.setAttribute("cy", "0");
      numCircle.setAttribute("r", "60");
      numCircle.setAttribute("fill", "#1f2937");
      numCircle.setAttribute("stroke", "#fbbf24");
      numCircle.setAttribute("stroke-width", "5");
      hudGroup.appendChild(numCircle);

      const numText = document.createElementNS("http://www.w3.org/2000/svg", "text");
      numText.setAttribute("x", "0");
      numText.setAttribute("y", "0");
      numText.setAttribute("text-anchor", "middle");
      numText.setAttribute("dominant-baseline", "middle");
      numText.setAttribute("fill", "#fbbf24");
      const rollFontSize = Number(appState.rollFontSize ?? 110);
      numText.setAttribute("font-size", `${rollFontSize * 65 / 110}px`);
      numText.setAttribute("font-weight", "bold");
      numText.textContent = (i + 1).toString();
      hudGroup.appendChild(numText);

      // Right Transition Arrow (pointing right)
      const rightArrowFObj = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
      rightArrowFObj.setAttribute("x", "80");
      rightArrowFObj.setAttribute("y", "-40");
      rightArrowFObj.setAttribute("width", "80");
      rightArrowFObj.setAttribute("height", "80");
      rightArrowFObj.innerHTML = `<i class="gi gi-plain-arrow" style="font-size: 70px; color: ${school.color}; display: flex; justify-content: center; align-items: center; width: 100%; height: 100%;"></i>`;
      hudGroup.appendChild(rightArrowFObj);

      // School Label on Right
      const schoolText = document.createElementNS("http://www.w3.org/2000/svg", "text");
      schoolText.setAttribute("x", "180");
      schoolText.setAttribute("y", "0");
      schoolText.setAttribute("text-anchor", "start");
      schoolText.setAttribute("dominant-baseline", "middle");
      schoolText.setAttribute("fill", "#ffffff");
      schoolText.setAttribute("font-size", "52px");
      schoolText.setAttribute("font-weight", "bold");
      schoolText.setAttribute("filter", "url(#text-shadow-filter)");
      if (appState.showInlineNumbers) {
        const tspanNum = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
        tspanNum.setAttribute("fill", "#fbbf24");
        tspanNum.setAttribute("font-weight", "bold");
        tspanNum.textContent = (i + 1) + "\u00A0\u00A0\u00A0\u00A0";
        schoolText.appendChild(tspanNum);
      }
      const tspanSchoolText = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
      tspanSchoolText.textContent = school.label;
      schoolText.appendChild(tspanSchoolText);
      hudGroup.appendChild(schoolText);

      // Swapped: Positive Icon on Right
      const rightIconFObj = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
      rightIconFObj.setAttribute("x", "400");
      rightIconFObj.setAttribute("y", "-60");
      rightIconFObj.setAttribute("width", "120");
      rightIconFObj.setAttribute("height", "120");
      rightIconFObj.innerHTML = `<i class="gi ${school.icon}" style="font-size: 100px; color: ${school.color}; display: flex; justify-content: center; align-items: center; width: 100%; height: 100%;"></i>`;
      hudGroup.appendChild(rightIconFObj);

      svg.appendChild(hudGroup);
    } else if (appState.viewMode === 'radial-vector') {
      const isBottomHalf = (angle > 90 && angle < 270);
      const outerDistTop = Number(appState.outerDistTop ?? 320);
      const outerDistBottom = Number(appState.outerDistBottom ?? 320);
      const centerRadius = outerRadius + (isBottomHalf ? outerDistBottom : outerDistTop);

      // Center Group (Icons + Arrow + Number)
      const centerPos = polarToCartesian(cx, cy, centerRadius, angle);
      let rot = angle;
      if (isBottomHalf) {
        rot += 180;
      }

      const vectorGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
      vectorGroup.setAttribute("transform", `translate(${centerPos.x}, ${centerPos.y}) rotate(${rot})`);

      // Swapped: Negative Icon (Left)
      const negIconFObj = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
      negIconFObj.setAttribute("x", "-240");
      negIconFObj.setAttribute("y", "-75");
      negIconFObj.setAttribute("width", "150");
      negIconFObj.setAttribute("height", "150");
      negIconFObj.innerHTML = `<i class="gi ${school.negativeIcon}" style="font-size: 140px; color: ${school.color}; display: flex; justify-content: center; align-items: center; width: 100%; height: 100%;"></i>`;
      vectorGroup.appendChild(negIconFObj);

      // Left transition arrow (pointing left)
      const arrowLeftFObj = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
      arrowLeftFObj.setAttribute("x", "-80");
      arrowLeftFObj.setAttribute("y", "-55");
      arrowLeftFObj.setAttribute("width", "70");
      arrowLeftFObj.setAttribute("height", "70");
      arrowLeftFObj.innerHTML = `<i class="gi gi-plain-arrow gi-flip-horizontal" style="font-size: 60px; color: ${school.color}; display: flex; justify-content: center; align-items: center; width: 100%; height: 100%;"></i>`;
      vectorGroup.appendChild(arrowLeftFObj);

      // Right transition arrow (pointing right)
      const arrowRightFObj = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
      arrowRightFObj.setAttribute("x", "10");
      arrowRightFObj.setAttribute("y", "-55");
      arrowRightFObj.setAttribute("width", "70");
      arrowRightFObj.setAttribute("height", "70");
      arrowRightFObj.innerHTML = `<i class="gi gi-plain-arrow" style="font-size: 60px; color: ${school.color}; display: flex; justify-content: center; align-items: center; width: 100%; height: 100%;"></i>`;
      vectorGroup.appendChild(arrowRightFObj);

      // Swapped: Positive Icon (Right)
      const posIconFObj = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
      posIconFObj.setAttribute("x", "90");
      posIconFObj.setAttribute("y", "-75");
      posIconFObj.setAttribute("width", "150");
      posIconFObj.setAttribute("height", "150");
      posIconFObj.innerHTML = `<i class="gi ${school.icon}" style="font-size: 140px; color: ${school.color}; display: flex; justify-content: center; align-items: center; width: 100%; height: 100%;"></i>`;
      vectorGroup.appendChild(posIconFObj);

      // Sector Number (bottom centered)
      const numText = document.createElementNS("http://www.w3.org/2000/svg", "text");
      numText.setAttribute("x", "0");
      numText.setAttribute("y", "120");
      numText.setAttribute("text-anchor", "middle");
      numText.setAttribute("dominant-baseline", "middle");
      numText.setAttribute("fill", "#fbbf24");
      const rollFontSize = Number(appState.rollFontSize ?? 110);
      numText.setAttribute("font-size", `${rollFontSize * 75 / 110}px`);
      numText.setAttribute("font-weight", "bold");
      numText.setAttribute("filter", "url(#text-shadow-filter)");
      numText.textContent = (i + 1).toString();
      vectorGroup.appendChild(numText);

      svg.appendChild(vectorGroup);

      // Radial Rays Labels
      let leftAngle, rightAngle;
      const offsetVal = Number(appState.iconSeparation ?? appState.outerPinOffset ?? 11);
      leftAngle = isBottomHalf ? (angle + offsetVal) : (angle - offsetVal);
      rightAngle = isBottomHalf ? (angle - offsetVal) : (angle + offsetVal);

      const drawRadialRayText = (text, textAngle, isSchool) => {
        const baseDist = isBottomHalf ? outerDistBottom : outerDistTop;
        const textStartRadius = outerRadius + baseDist - 210;
        const pos = polarToCartesian(cx, cy, textStartRadius, textAngle);
        let actualRot = textAngle + 90;
        if (textAngle > 90 && textAngle < 270) {
          actualRot += 180;
        }

        const textEl = document.createElementNS("http://www.w3.org/2000/svg", "text");
        textEl.setAttribute("class", "scaled-text radial-ray-text");
        textEl.setAttribute("data-text-angle", textAngle);
        textEl.setAttribute("data-school-idx", i);
        textEl.setAttribute("data-is-school", isSchool ? "true" : "false");
        textEl.setAttribute("x", pos.x);
        textEl.setAttribute("y", pos.y);
        textEl.setAttribute("font-size", "65px");
        textEl.setAttribute("font-weight", isSchool ? "bold" : "normal");
        textEl.setAttribute("dominant-baseline", "middle");
        textEl.setAttribute("transform", `rotate(${actualRot}, ${pos.x}, ${pos.y})`);
        textEl.setAttribute("filter", "url(#text-shadow-filter)");

        if (appState.showInlineNumbers) {
          const tspanNum = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
          tspanNum.setAttribute("fill", "#fbbf24");
          tspanNum.setAttribute("font-weight", "bold");
          tspanNum.textContent = (i + 1) + "\u00A0\u00A0\u00A0\u00A0";
          textEl.appendChild(tspanNum);
        }

        const tspanText = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
        tspanText.setAttribute("fill", isSchool ? school.color : "#e2e8f0");
        tspanText.textContent = text;
        textEl.appendChild(tspanText);

        svg.appendChild(textEl);
      };

      // Swapped side labels to match swapped icons
      drawRadialRayText(effectName, leftAngle, false);
      drawRadialRayText(school.label, rightAngle, true);
    } else if (appState.viewMode === 'minimal-rune') {
      const isBottomHalf = (angle > 90 && angle < 270);
      const outerDistTop = Number(appState.outerDistTop ?? 320);
      const outerDistBottom = Number(appState.outerDistBottom ?? 320);
      const centerRadius = outerRadius + (isBottomHalf ? outerDistBottom : outerDistTop);

      const centerPos = polarToCartesian(cx, cy, centerRadius, angle);
      let rot = angle;
      if (isBottomHalf) {
        rot += 180;
      }

      const runeGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
      runeGroup.setAttribute("class", "rune-group");
      runeGroup.setAttribute("data-angle", angle);
      runeGroup.setAttribute("data-school-idx", i);
      runeGroup.setAttribute("transform", `translate(${centerPos.x}, ${centerPos.y}) rotate(${rot})`);

      // Let iconSeparation determine the coordinate multiplier (default 15 -> 165px center offset)
      const iconSep = Number(appState.iconSeparation ?? 15);
      const shiftX = iconSep * 11;

      // Swapped: Negative Icon (Left)
      const negIconFObj = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
      negIconFObj.setAttribute("x", (-shiftX - 75).toString());
      negIconFObj.setAttribute("y", "-75");
      negIconFObj.setAttribute("width", "150");
      negIconFObj.setAttribute("height", "150");
      negIconFObj.innerHTML = `<i class="gi ${school.negativeIcon}" style="font-size: 140px; color: ${school.color}; display: flex; justify-content: center; align-items: center; width: 100%; height: 100%;"></i>`;
      runeGroup.appendChild(negIconFObj);

      // Left transition arrow
      const arrowLeftFObj = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
      arrowLeftFObj.setAttribute("x", (-shiftX / 2 - 35).toString());
      arrowLeftFObj.setAttribute("y", "-55");
      arrowLeftFObj.setAttribute("width", "70");
      arrowLeftFObj.setAttribute("height", "70");
      arrowLeftFObj.innerHTML = `<i class="gi gi-plain-arrow gi-flip-horizontal" style="font-size: 60px; color: ${school.color}; display: flex; justify-content: center; align-items: center; width: 100%; height: 100%;"></i>`;
      runeGroup.appendChild(arrowLeftFObj);

      // Right transition arrow
      const arrowRightFObj = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
      arrowRightFObj.setAttribute("x", (shiftX / 2 - 35).toString());
      arrowRightFObj.setAttribute("y", "-55");
      arrowRightFObj.setAttribute("width", "70");
      arrowRightFObj.setAttribute("height", "70");
      arrowRightFObj.innerHTML = `<i class="gi gi-plain-arrow" style="font-size: 60px; color: ${school.color}; display: flex; justify-content: center; align-items: center; width: 100%; height: 100%;"></i>`;
      runeGroup.appendChild(arrowRightFObj);

      // Swapped: Positive Icon (Right)
      const posIconFObj = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
      posIconFObj.setAttribute("x", (shiftX - 75).toString());
      posIconFObj.setAttribute("y", "-75");
      posIconFObj.setAttribute("width", "150");
      posIconFObj.setAttribute("height", "150");
      posIconFObj.innerHTML = `<i class="gi ${school.icon}" style="font-size: 140px; color: ${school.color}; display: flex; justify-content: center; align-items: center; width: 100%; height: 100%;"></i>`;
      runeGroup.appendChild(posIconFObj);

      // Sector Number
      const numText = document.createElementNS("http://www.w3.org/2000/svg", "text");
      numText.setAttribute("x", "0");
      numText.setAttribute("y", "120");
      numText.setAttribute("text-anchor", "middle");
      numText.setAttribute("dominant-baseline", "middle");
      numText.setAttribute("fill", "#fbbf24");
      const rollFontSize = Number(appState.rollFontSize ?? 110);
      numText.setAttribute("font-size", `${rollFontSize * 75 / 110}px`);
      numText.setAttribute("font-weight", "bold");
      numText.setAttribute("filter", "url(#text-shadow-filter)");
      numText.textContent = (i + 1).toString();
      runeGroup.appendChild(numText);

      svg.appendChild(runeGroup);
    }

    // tick mark on the boundary
    const tickAngle = angle - angleStep / 2;
    const tickStart = polarToCartesian(cx, cy, outerRadius, tickAngle);
    const tickEnd = polarToCartesian(cx, cy, outerRadius + 30, tickAngle);
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", tickStart.x);
    line.setAttribute("y1", tickStart.y);
    line.setAttribute("x2", tickEnd.x);
    line.setAttribute("y2", tickEnd.y);
    line.setAttribute("stroke", "#fbbf24");
    line.setAttribute("stroke-width", "6");
    svg.appendChild(line);
  });


  if (appState.animationMode) {
    svg.classList.add('animating-ring');

    const spinCCWGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    spinCCWGroup.setAttribute("class", "spin-ccw-group");
    const initialCCW = mishapState.ccwAngle || 0;
    spinCCWGroup.style.transform = `rotate(${-initialCCW}deg)`;

    const spinCWGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    spinCWGroup.setAttribute("class", "spin-cw-group");
    const initialCW = mishapState.cwAngle || 0;
    spinCWGroup.style.transform = `rotate(${initialCW}deg)`;

    // Static items stay in svg: defs, bg, center circle, center icon, dice/dc texts
    const staticPillsList = [];
    const activePillsList = [];
    const childrenToMove = Array.from(svg.childNodes).filter(el => {
      const tagName = el.tagName ? el.tagName.toLowerCase() : '';
      const idName = el.getAttribute('id') || '';
      const className = el.getAttribute('class') || '';
      if (tagName === 'defs' || tagName === 'circle' || idName === 'center-hud-content' || className.includes('dice-dc-text')) return false;

      const isPill = className.includes('mandala-overlay-box') || className.includes('overlay-text-dice') || className.includes('overlay-text-dc') || className.includes('overlay-text-tier') || className.includes('pill-');
      if (isPill) {
        if (appState.staticPills) {
          staticPillsList.push(el);
        } else {
          activePillsList.push(el);
        }
        return false;
      }
      return true;
    });

    childrenToMove.forEach(el => {
      const className = el.getAttribute('class') || '';
      const idName = el.getAttribute('id') || '';

      let isCW = false;
      if (className.includes('effect-name-text') || className.includes('outer-effect-label') || className.includes('tier-label-text')) {
        isCW = true;
      } else if (idName.startsWith('curved-path') || idName.startsWith('outer-effect-path')) {
        isCW = true;
      }

      if (isCW) {
        el.dataset.isOuter = "true";
        spinCWGroup.appendChild(el);
      } else {
        el.dataset.isOuter = "false";
        spinCCWGroup.appendChild(el);
      }
    });

    svg.appendChild(spinCCWGroup);
    svg.appendChild(spinCWGroup);

    const spinPillsGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    spinPillsGroup.setAttribute("class", "spin-pills-group");
    const initialPills = mishapState.pillsAngle || 0;
    spinPillsGroup.style.transform = `rotate(${initialPills}deg)`;
    activePillsList.forEach(el => spinPillsGroup.appendChild(el));
    svg.appendChild(spinPillsGroup);

    // Append static pills last to render on top
    if (appState.staticPills) {
      staticPillsList.forEach(el => svg.appendChild(el));
    }

    const outerNumbers = svg.querySelectorAll('.outer-number');
    const straightEffectTexts = svg.querySelectorAll('.straight-effect-text');
    const innerCurvedPaths = svg.querySelectorAll('.inner-curved-path');
    const outerPaths = svg.querySelectorAll('.outer-school-path, .outer-effect-path');
    const radialRayTexts = svg.querySelectorAll('.radial-ray-text');
    const hudGroups = svg.querySelectorAll('.hud-group');
    const runeGroups = svg.querySelectorAll('.rune-group');

    // Layout and flip text paths based on current target rotation angles
    const updatePaths = () => {
      if (!svg.isConnected) return; // stop if SVG is removed

      const angleCCW = -(mishapState.ccwAngle || 0);
      const angleCW = mishapState.cwAngle || 0;
      const anglePills = mishapState.pillsAngle || 0;

      // 1. Update outer numbers
      outerNumbers.forEach(textEl => {
        const sIdx = parseInt(textEl.getAttribute('data-school-idx'), 10);
        const baseAngle = sIdx * 45 + 22.5;
        let visualAngle = (baseAngle + angleCCW) % 360;
        if (visualAngle < 0) visualAngle += 360;
        const isVisuallyBottomHalf = visualAngle > 90 && visualAngle < 270;
        const cxNum = parseFloat(textEl.getAttribute('x'));
        const cyNum = parseFloat(textEl.getAttribute('y'));
        const rotOffset = isVisuallyBottomHalf ? 180 : 0;
        textEl.setAttribute("transform", `rotate(${baseAngle + rotOffset}, ${cxNum}, ${cyNum})`);
      });

      // 2. Update straight effect texts
      straightEffectTexts.forEach(textEl => {
        const textCenterAngle = parseFloat(textEl.getAttribute('data-text-center-angle'));
        let visualAngle = (textCenterAngle + angleCW) % 360;
        if (visualAngle < 0) visualAngle += 360;
        const isVisuallyBottomHalf = visualAngle > 90 && visualAngle < 270;
        const cxNum = parseFloat(textEl.getAttribute('x'));
        const cyNum = parseFloat(textEl.getAttribute('y'));
        const rotOffset = isVisuallyBottomHalf ? 180 : 0;
        textEl.setAttribute("transform", `rotate(${textCenterAngle + rotOffset}, ${cxNum}, ${cyNum})`);
      });

      // Update flip logic for icons and polarity texts
      const updateFlippable = (selector) => {
        const layout = appState.polarityLayout || 'visual-right';
        svg.querySelectorAll(selector).forEach(el => {
          const baseAngle = parseFloat(el.getAttribute('data-base-angle'));
          const ccwAngle = parseFloat(el.getAttribute('data-ccw-angle'));
          const cwAngle = parseFloat(el.getAttribute('data-cw-angle'));
          const polarity = el.getAttribute('data-polarity');
          const radiusTop = parseFloat(el.getAttribute('data-radius-top'));
          const radiusBottom = parseFloat(el.getAttribute('data-radius-bottom'));

          let visualWedgeAngle = (baseAngle + angleCCW) % 360;
          if (visualWedgeAngle < 0) visualWedgeAngle += 360;
          const isVisuallyBottomHalf = visualWedgeAngle > 90 && visualWedgeAngle < 270;

          const useCW = polarity === 'positive' ?
            (layout === 'visual-right' && isVisuallyBottomHalf ? false : true) :
            (layout === 'visual-right' && isVisuallyBottomHalf ? true : false);

          const localAngle = useCW ? cwAngle : ccwAngle;
          const radius = isVisuallyBottomHalf ? radiusBottom : radiusTop;

          const pos = polarToCartesian(cx, cy, radius, localAngle);
          let rot = localAngle + (isVisuallyBottomHalf ? 180 : 0);

          el.setAttribute("transform", `translate(${pos.x}, ${pos.y}) rotate(${rot})`);
        });
      };
      updateFlippable('.outer-icon-group');
      updateFlippable('.watermark-group');
      updateFlippable('.polarity-text');

      // 3. Update inner curved paths
      const angleStep = 360 / Math.max(appState.magicNodes.length, 1);
      innerCurvedPaths.forEach(pathEl => {
        const cxVal = parseFloat(pathEl.getAttribute('data-cx'));
        const cyVal = parseFloat(pathEl.getAttribute('data-cy'));
        const startAng = parseFloat(pathEl.getAttribute('data-start-angle'));
        const endAng = parseFloat(pathEl.getAttribute('data-end-angle'));
        const sIdx = parseInt(pathEl.getAttribute('data-school-idx'), 10);

        const centerAngle = sIdx * angleStep + angleStep / 2;
        let visualAngle = (centerAngle + angleCW) % 360;
        if (visualAngle < 0) visualAngle += 360;
        const isVisuallyBottomHalf = visualAngle > 90 && visualAngle < 270;

        // Calculate dynamic radius for line wraps
        const baseRadiusAttr = pathEl.getAttribute('data-base-radius');
        const lineIndexAttr = pathEl.getAttribute('data-line-index');
        const totalLinesAttr = pathEl.getAttribute('data-total-lines');

        let radius = parseFloat(pathEl.getAttribute('data-radius'));
        if (baseRadiusAttr) {
          const baseRadius = parseFloat(baseRadiusAttr);
          const lineIndex = parseInt(lineIndexAttr || "1", 10);
          const totalLines = parseInt(totalLinesAttr || "1", 10);
          if (totalLines === 2) {
            if (lineIndex === 1) {
              radius = isVisuallyBottomHalf ? (baseRadius - 28) : (baseRadius + 28);
            } else if (lineIndex === 2) {
              radius = isVisuallyBottomHalf ? (baseRadius + 28) : (baseRadius - 28);
            }
          } else if (totalLines === 3) {
            if (lineIndex === 1) {
              radius = isVisuallyBottomHalf ? (baseRadius - 48) : (baseRadius + 48);
            } else if (lineIndex === 2) {
              radius = baseRadius;
            } else if (lineIndex === 3) {
              radius = isVisuallyBottomHalf ? (baseRadius + 48) : (baseRadius - 48);
            }
          }
          pathEl.setAttribute('data-radius', radius);
        }

        let pathData;
        if (isVisuallyBottomHalf) {
          const pathStart = polarToCartesian(cxVal, cyVal, radius, endAng);
          const pathEnd = polarToCartesian(cxVal, cyVal, radius, startAng);
          pathData = [
            "M", pathStart.x, pathStart.y,
            "A", radius, radius, 0, 0, 0, pathEnd.x, pathEnd.y
          ].join(" ");
        } else {
          const pathStart = polarToCartesian(cxVal, cyVal, radius, startAng);
          const pathEnd = polarToCartesian(cxVal, cyVal, radius, endAng);
          pathData = [
            "M", pathStart.x, pathStart.y,
            "A", radius, radius, 0, 0, 1, pathEnd.x, pathEnd.y
          ].join(" ");
        }
        pathEl.setAttribute("d", pathData);
      });

      // 4. Update outer curved paths (schools & effects)
      outerPaths.forEach(pathEl => {
        const cxVal = parseFloat(pathEl.getAttribute('data-cx'));
        const cyVal = parseFloat(pathEl.getAttribute('data-cy'));
        const radius = parseFloat(pathEl.getAttribute('data-radius'));
        const centerAngle = parseFloat(pathEl.getAttribute('data-center-angle'));
        const halfSpan = parseFloat(pathEl.getAttribute('data-half-span'));
        const isSchool = pathEl.getAttribute('data-is-school') === 'true';

        let visualAngle;
        if (isSchool) {
          visualAngle = (centerAngle + angleCCW) % 360;
        } else {
          visualAngle = (centerAngle + angleCW) % 360;
        }
        if (visualAngle < 0) visualAngle += 360;
        const isVisuallyBottomHalf = visualAngle > 90 && visualAngle < 270;

        let pathData;
        if (isVisuallyBottomHalf) {
          const pathStart = polarToCartesian(cxVal, cyVal, radius, centerAngle + halfSpan);
          const pathEnd = polarToCartesian(cxVal, cyVal, radius, centerAngle - halfSpan);
          pathData = [
            "M", pathStart.x, pathStart.y,
            "A", radius, radius, 0, 0, 0, pathEnd.x, pathEnd.y
          ].join(" ");
        } else {
          const pathStart = polarToCartesian(cxVal, cyVal, radius, centerAngle - halfSpan);
          const pathEnd = polarToCartesian(cxVal, cyVal, radius, centerAngle + halfSpan);
          pathData = [
            "M", pathStart.x, pathStart.y,
            "A", radius, radius, 0, 0, 1, pathEnd.x, pathEnd.y
          ].join(" ");
        }
        pathEl.setAttribute("d", pathData);
      });

      // 5. Update radial ray texts
      radialRayTexts.forEach(textEl => {
        const textAngle = parseFloat(textEl.getAttribute('data-text-angle'));
        const isSchool = textEl.getAttribute('data-is-school') === 'true';
        let visualAngle;
        if (isSchool) {
          visualAngle = (textAngle + angleCCW) % 360;
        } else {
          visualAngle = (textAngle + angleCW) % 360;
        }
        if (visualAngle < 0) visualAngle += 360;
        const isVisuallyBottomHalf = visualAngle > 90 && visualAngle < 270;
        const cxNum = parseFloat(textEl.getAttribute('x'));
        const cyNum = parseFloat(textEl.getAttribute('y'));
        let actualRot = textAngle + 90 + (isVisuallyBottomHalf ? 180 : 0);
        textEl.setAttribute("transform", `rotate(${actualRot}, ${cxNum}, ${cyNum})`);
      });

      // 6. Update hud groups
      hudGroups.forEach(groupEl => {
        const angleVal = parseFloat(groupEl.getAttribute('data-angle'));
        let visualAngle = (angleVal + angleCCW) % 360;
        if (visualAngle < 0) visualAngle += 360;
        const isVisuallyBottomHalf = visualAngle > 90 && visualAngle < 270;

        const outerDistTop = Number(appState.outerDistTop ?? 320);
        const outerDistBottom = Number(appState.outerDistBottom ?? 320);
        const hudRadius = outerRadius + (isVisuallyBottomHalf ? outerDistBottom : outerDistTop) + 40;
        const hudPos = polarToCartesian(cx, cy, hudRadius, angleVal);
        let hudRot = angleVal + (isVisuallyBottomHalf ? 180 : 0);

        groupEl.setAttribute("transform", `translate(${hudPos.x}, ${hudPos.y}) rotate(${hudRot})`);
      });

      // 7. Update rune groups
      runeGroups.forEach(groupEl => {
        const angleVal = parseFloat(groupEl.getAttribute('data-angle'));
        let visualAngle = (angleVal + angleCCW) % 360;
        if (visualAngle < 0) visualAngle += 360;
        const isVisuallyBottomHalf = visualAngle > 90 && visualAngle < 270;

        const outerDistTop = Number(appState.outerDistTop ?? 320);
        const outerDistBottom = Number(appState.outerDistBottom ?? 320);
        const centerRadius = outerRadius + (isVisuallyBottomHalf ? outerDistBottom : outerDistTop);
        const centerPos = polarToCartesian(cx, cy, centerRadius, angleVal);
        let rot = angleVal + (isVisuallyBottomHalf ? 180 : 0);

        groupEl.setAttribute("transform", `translate(${centerPos.x}, ${centerPos.y}) rotate(${rot})`);
      });
    };

    // Expose updatePaths on mishapState
    mishapState.updatePaths = updatePaths;
  }

  container.appendChild(svg);
  if (appState.animationMode) {
    setupDragAndFlick(svg);
    if (mishapState.updatePaths) {
      mishapState.updatePaths();
    }
  }
}

// Setup interactive drag & flick on the SVG element
function setupDragAndFlick(svg) {
  if (!svg || !appState.animationMode) return;

  const container = document.getElementById('target-mandala');
  if (!container) return;

  let isDragging = false;
  let hasDragged = false;
  let startAngle = 0;
  let initialCW = 0;
  let initialCCW = 0;
  let initialPills = 0;
  let lastMovements = [];
  
  const getPointerAngle = (clientX, clientY) => {
    const rect = container.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    return Math.atan2(clientY - centerY, clientX - centerX) * 180 / Math.PI;
  };

  const handlePointerDown = (e) => {
    // If currently rolling/animating, ignore new drag actions
    if (mishapState.isRolling) return;
    
    // Clear any active free spin animation frame
    if (mishapState.freeSpinFrameId) {
      cancelAnimationFrame(mishapState.freeSpinFrameId);
      mishapState.freeSpinFrameId = null;
    }

    isDragging = true;
    hasDragged = false;
    startAngle = getPointerAngle(e.clientX, e.clientY);

    initialCW = mishapState.cwAngle || 0;
    initialCCW = mishapState.ccwAngle || 0;
    initialPills = mishapState.pillsAngle || 0;

    lastMovements = [{ time: performance.now(), angle: startAngle }];

    // Set pointer capture so move/up events continue even if leaving the element
    svg.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;

    const currentAngle = getPointerAngle(e.clientX, e.clientY);
    let angleDiff = currentAngle - startAngle;

    // Unwrap angle difference to avoid wrap-around jumps
    if (angleDiff > 180) angleDiff -= 360;
    else if (angleDiff < -180) angleDiff += 360;

    if (Math.abs(angleDiff) > 3) {
      hasDragged = true;
    }

    const now = performance.now();
    lastMovements.push({ time: now, angle: currentAngle });
    lastMovements = lastMovements.filter(m => now - m.time < 150);

    const spinCWGroup = svg.querySelector('.spin-cw-group');
    const spinCCWGroup = svg.querySelector('.spin-ccw-group');
    const spinPillsGroup = svg.querySelector('.spin-pills-group');

    // Drag-rotations (synchronized opposite directions)
    if (spinCWGroup) spinCWGroup.style.transform = `rotate(${initialCW + angleDiff}deg)`;
    if (spinCCWGroup) spinCCWGroup.style.transform = `rotate(${-initialCCW - angleDiff}deg)`;
    if (spinPillsGroup) spinPillsGroup.style.transform = `rotate(${initialPills + angleDiff}deg)`;

    // Update current angles in state for path-updating/flips
    mishapState.cwAngle = initialCW + angleDiff;
    mishapState.ccwAngle = initialCCW + angleDiff;
    mishapState.pillsAngle = initialPills + angleDiff;

    if (mishapState.updatePaths) {
      mishapState.updatePaths();
    }
  };

  const handlePointerUp = (e) => {
    if (!isDragging) return;
    isDragging = false;
    svg.releasePointerCapture(e.pointerId);

    const currentAngle = getPointerAngle(e.clientX, e.clientY);
    let angleDiff = currentAngle - startAngle;
    if (angleDiff > 180) angleDiff -= 360;
    else if (angleDiff < -180) angleDiff += 360;

    mishapState.cwAngle = (initialCW + angleDiff) % 360;
    mishapState.ccwAngle = (initialCCW + angleDiff) % 360;
    mishapState.pillsAngle = (initialPills + angleDiff) % 360;

    if (mishapState.cwAngle < 0) mishapState.cwAngle += 360;
    if (mishapState.ccwAngle < 0) mishapState.ccwAngle += 360;
    if (mishapState.pillsAngle < 0) mishapState.pillsAngle += 360;

    // Calculate drag velocity (deg/ms)
    const now = performance.now();
    lastMovements = lastMovements.filter(m => now - m.time < 150);
    let velocity = 0;
    if (lastMovements.length >= 2) {
      const first = lastMovements[0];
      const last = lastMovements[lastMovements.length - 1];
      const dt = last.time - first.time;
      if (dt > 10) {
        let dAngle = last.angle - first.angle;
        if (dAngle > 180) dAngle -= 360;
        else if (dAngle < -180) dAngle += 360;
        velocity = dAngle / dt;
      }
    }

    const flickThreshold = 0.15; // deg/ms
    if (Math.abs(velocity) > flickThreshold) {
      // FLICK SPIN!
      if (appState.freeSpinMode) {
        startFreeSpin(velocity, svg);
      } else {
        // If school is not selected, select the one closest to the top
        if (mishapState.selectedSchoolIdx === null) {
          const schoolIdx = (Math.round(mishapState.ccwAngle / 45) % 8 + 8) % 8;
          selectMishapIconFromCircle(schoolIdx, mishapState.selectedPolarity || 'positive');
        }
        rollMishap();
      }
    }
  };

  svg.addEventListener('pointerdown', handlePointerDown);
  svg.addEventListener('pointermove', handlePointerMove);
  svg.addEventListener('pointerup', handlePointerUp);
  svg.addEventListener('pointercancel', handlePointerUp);

  // Prevent drag selection from firing click events on paths
  const handleCaptureClick = (e) => {
    if (hasDragged) {
      e.stopPropagation();
      e.preventDefault();
      hasDragged = false;
    }
  };
  svg.addEventListener('click', handleCaptureClick, true);
}

// Free spin triggered by drag
function startFreeSpin(vel, svg) {
  if (mishapState.isRolling) return;
  // Trigger exactly the same logic as the 2d8 roll button 
  // so that flips, pills, and target outcomes align perfectly 
  // with valid slice snaps.
  rollMishap();
}



// Modal Logic
function openModal(node, type) {
  activeNodeId = node.id;
  document.getElementById('node-label').value = node.label;
  document.getElementById('node-color').value = node.color;
  document.getElementById('edit-modal').classList.remove('hidden');
}

function closeModal() {
  document.getElementById('edit-modal').classList.add('hidden');
  activeNodeId = null;
}

document.getElementById('modal-cancel').addEventListener('click', closeModal);

document.getElementById('modal-save').addEventListener('click', () => {
  if (!activeNodeId) return;

  const newLabel = document.getElementById('node-label').value;
  const newColor = document.getElementById('node-color').value;

  let node = appState.magicNodes.find(n => n.id === activeNodeId);
  if (node) {
    node.label = newLabel;
    node.color = newColor;
    renderMagicMandala();
  }

  closeModal();
});

// Slot Modification Logic
function resizeNodes(nodeArray, newSize, prefix) {
  if (newSize < nodeArray.length) {
    nodeArray.length = newSize; // Truncate
  } else {
    while (nodeArray.length < newSize) {
      const idx = nodeArray.length;
      nodeArray.push({
        id: `${prefix}${Date.now()}_${idx}`, // unique ID
        label: `Slot ${idx + 1}`,
        color: '#888888'
      });
    }
  }
}

const magicSlotsEl = document.getElementById('magic-slots');
if (magicSlotsEl) {
  magicSlotsEl.addEventListener('change', (e) => {
    const newSize = parseInt(e.target.value, 10);
    if (newSize > 0) {
      resizeNodes(appState.magicNodes, newSize, 'm');
      renderMagicMandala();
    }
  });
}

function renderTierControls() {
  const container = document.getElementById('tier-controls');
  if (!container) return;
  container.innerHTML = '';

  if (!appState.scaledTiers) return;

  // Outer Clock Numbers control
  const globalRow = document.createElement('div');
  globalRow.className = 'tier-control-row';
  globalRow.style.marginBottom = '1rem';
  globalRow.style.paddingBottom = '1rem';
  globalRow.style.borderBottom = '1px solid var(--border-color)';

  const globalLabel = document.createElement('label');
  globalLabel.textContent = 'Outer Clock:';
  globalLabel.style.fontWeight = 'bold';
  globalRow.appendChild(globalLabel);

  const globalGroup = document.createElement('div');
  globalGroup.className = 'tier-control-group';

  const numLabel = document.createElement('label');
  numLabel.textContent = 'Numbers:';

  const numInput = document.createElement('input');
  numInput.type = 'number';
  numInput.min = '1';
  numInput.max = '100';
  numInput.value = appState.outerClockNumbers || 12;
  numInput.addEventListener('change', (e) => {
    appState.outerClockNumbers = parseInt(e.target.value, 10);
    renderScaledMandala();
  });

  globalGroup.appendChild(numLabel);
  globalGroup.appendChild(numInput);
  globalRow.appendChild(globalGroup);

  container.appendChild(globalRow);

  appState.scaledTiers.forEach((tierData, tIndex) => {
    const row = document.createElement('div');
    row.className = 'tier-control-row';

    const label = document.createElement('label');
    label.textContent = `Tier${tIndex}`;
    row.appendChild(label);

    // Slices control
    const sliceGroup = document.createElement('div');
    sliceGroup.className = 'tier-control-group';

    const sliceLabel = document.createElement('label');
    sliceLabel.textContent = 'Slices:';

    const sliceInput = document.createElement('input');
    sliceInput.type = 'number';
    sliceInput.min = '1';
    sliceInput.max = '36';
    sliceInput.value = tierData.nodes.length;
    sliceInput.addEventListener('change', (e) => {
      const newSize = parseInt(e.target.value, 10);
      if (newSize > 0) {
        // resize scaled tier nodes
        const nodeArray = tierData.nodes;
        if (newSize < nodeArray.length) {
          nodeArray.length = newSize; // Truncate
        } else {
          while (nodeArray.length < newSize) {
            nodeArray.push({
              type: 'New', dc: '—', dice: '—', span: 1
            });
          }
        }
        renderScaledMandala();
      }
    });

    sliceGroup.appendChild(sliceLabel);
    sliceGroup.appendChild(sliceInput);
    row.appendChild(sliceGroup);

    // Rotation control
    const rotGroup = document.createElement('div');
    rotGroup.className = 'tier-control-group';
    rotGroup.style.flexGrow = '1';

    const rotInput = document.createElement('input');
    rotInput.type = 'range';
    rotInput.min = '-180';
    rotInput.max = '180';
    rotInput.value = tierData.offset || 0;
    rotInput.title = 'Rotation Offset';
    rotInput.addEventListener('input', (e) => {
      tierData.offset = parseInt(e.target.value, 10);
      renderScaledMandala();
    });

    rotGroup.appendChild(rotInput);
    row.appendChild(rotGroup);

    container.appendChild(row);
  });
}

// Save/Load Logic
document.getElementById('save-btn').addEventListener('click', () => {
  const dataStr = JSON.stringify(appState, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'mandalas.json';
  a.click();

  URL.revokeObjectURL(url);
});

document.getElementById('load-btn').addEventListener('click', () => {
  document.getElementById('file-input').click();
});

document.getElementById('file-input').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const loadedState = JSON.parse(event.target.result);
      if (loadedState.magicNodes) {
        appState = loadedState;
        // Update input values
        const msEl = document.getElementById('magic-slots');
        if (msEl) msEl.value = appState.magicNodes.length;
        renderMagicMandala();

        // Ensure old saves have scaledTiers
        if (!appState.scaledTiers) {
          appState.scaledTiers = [];
        }
        if (!appState.viewMode) {
          appState.viewMode = 'curved-axis';
        }
        if (!appState.polarityMode) {
          appState.polarityMode = 'gap';
        }
        if (appState.polarityGap === undefined) {
          appState.polarityGap = 3.2;
        }
        if (appState.labelOffsetTop === undefined) appState.labelOffsetTop = appState.labelOffsetTop !== undefined ? appState.labelOffsetTop : 0;
        if (appState.labelOffsetBottom === undefined) appState.labelOffsetBottom = appState.bottomShift !== undefined ? appState.bottomShift : 65;
        if (appState.bottomIconShift === undefined) appState.bottomIconShift = 0;
        if (appState.rollFontSize === undefined) appState.rollFontSize = 110;
        if (appState.labelSeparation === undefined) appState.labelSeparation = 100;
        if (appState.outerDistTop === undefined) appState.outerDistTop = appState.outerDistance !== undefined ? appState.outerDistance : 320;
        if (appState.outerDistBottom === undefined) appState.outerDistBottom = (appState.outerDistance !== undefined && appState.bottomOuterShift !== undefined) ? (appState.outerDistance + appState.bottomOuterShift) : 320;
        if (appState.iconSeparation === undefined) appState.iconSeparation = appState.outerPinOffset !== undefined ? appState.outerPinOffset : 15;
        if (appState.wrapDistance === undefined) appState.wrapDistance = 25;
        if (appState.overlayBoxWidth === undefined) appState.overlayBoxWidth = 12;
        if (appState.overlayFontSize === undefined) appState.overlayFontSize = 45;
        if (appState.overlayStyle === undefined) appState.overlayStyle = 'floating-pill';
        if (appState.modifierMinFontSize === undefined) appState.modifierMinFontSize = 22;
        if (appState.modifierMaxFontSize === undefined) appState.modifierMaxFontSize = 55;
        if (appState.modifierDesiredFontSize === undefined) appState.modifierDesiredFontSize = 50;
        if (appState.animationMode === undefined) appState.animationMode = true;
        if (appState.animationSpeed === undefined) appState.animationSpeed = 5;
        if (appState.animationDuration === undefined) appState.animationDuration = 2;
        if (appState.momentumCurve === undefined) appState.momentumCurve = 5;
        syncViewModeButtons();
        syncPolarityModeButtons();
        syncOuterCenteringButton();
        syncAnimationSliders();
        renderTierControls();
        renderScaledMandala();
        renderSidebarTables();
      } else {
        alert('Invalid save file format.');
      }
    } catch (err) {
      alert('Error parsing JSON file.');
    }
  };
  reader.readAsText(file);
});

function syncViewModeButtons() {
  document.querySelectorAll('.btn-segment[data-view]').forEach(btn => {
    if (btn.getAttribute('data-view') === appState.viewMode) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  syncPolarityModeButtons();
}

function syncPolarityModeButtons() {
  document.querySelectorAll('.btn-segment[data-polarity]').forEach(btn => {
    if (btn.getAttribute('data-polarity') === appState.polarityMode) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  document.querySelectorAll('.btn-segment[data-polarity-layout]').forEach(btn => {
    if (btn.getAttribute('data-polarity-layout') === appState.polarityLayout) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  const isCurved = ['curved-axis', 'curved-text'].includes(appState.viewMode);

  // Update visibility of polarity gap offset slider
  const polarityGapContainer = document.getElementById('polarity-gap-container');
  if (polarityGapContainer) {
    const showGapOffset = isCurved && ['gap', 'flanking'].includes(appState.polarityMode);
    polarityGapContainer.style.display = showGapOffset ? '' : 'none';
  }

  const curvedControls = [
    document.getElementById('outer-centering-btn'),
    document.getElementById('outer-offset-container'),
    document.getElementById('label-offset-top-container'),
    document.getElementById('label-offset-bottom-container'),
    document.getElementById('bottom-icon-container'),
    document.getElementById('roll-size-container'),
    document.getElementById('label-sep-container'),
    document.getElementById('outer-dist-top-container'),
    document.getElementById('outer-dist-bottom-container'),
    document.getElementById('icon-sep-container'),
    document.getElementById('wrap-dist-container')
  ];
  curvedControls.forEach(el => {
    if (el) {
      el.style.display = isCurved ? '' : 'none';
    }
  });
  syncOverlayModeButtons();
}

function syncOverlayModeButtons() {
  document.querySelectorAll('.btn-segment[data-overlay]').forEach(btn => {
    // Map shortened identifiers to full state values if needed
    let val = btn.getAttribute('data-overlay');
    if (val === 'radial') val = 'radial-arc';
    if (val === 'constant') val = 'constant-column';
    if (val === 'pill') val = 'floating-pill';

    if (val === appState.overlayStyle) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  const isClassic = (appState.overlayStyle === 'classic');
  const widthContainer = document.getElementById('overlay-width-container');
  const fontContainer = document.getElementById('overlay-font-size-container');
  if (widthContainer) {
    widthContainer.style.display = isClassic ? 'none' : '';
  }
  if (fontContainer) {
    fontContainer.style.display = isClassic ? 'none' : '';
  }
}

function syncOuterCenteringButton() {
  const outerCenteringBtn = document.getElementById('outer-centering-btn');
  if (outerCenteringBtn) {
    outerCenteringBtn.textContent = appState.centerOuterText ? "Outer Ring: Centered" : "Outer Ring: Pinned";
    if (appState.centerOuterText) {
      outerCenteringBtn.classList.add('active');
    } else {
      outerCenteringBtn.classList.remove('active');
    }
  }
  syncOuterOffsetSlider();
  syncBottomSliders();
}

function syncOuterOffsetSlider() {
  const outerOffsetSlider = document.getElementById('outer-offset-slider');
  const outerOffsetVal = document.getElementById('outer-offset-val');
  const outerOffsetContainer = document.getElementById('outer-offset-container');
  if (outerOffsetSlider && outerOffsetVal) {
    outerOffsetSlider.value = appState.outerPinOffset ?? 11;
    outerOffsetVal.textContent = (appState.outerPinOffset ?? 11) + "°";

    // Dim the slider container if in centered mode since offset is disabled
    if (outerOffsetContainer) {
      if (appState.centerOuterText) {
        outerOffsetContainer.style.opacity = '0.4';
        outerOffsetContainer.style.pointerEvents = 'none';
      } else {
        outerOffsetContainer.style.opacity = '1';
        outerOffsetContainer.style.pointerEvents = 'auto';
      }
    }
  }
}

function applyClockOffsets() {
  const clockPanel = document.querySelector('.clock-panel');
  if (clockPanel) {
    if (window.innerWidth > 1350) {
      clockPanel.style.marginTop = (appState.clockYOffset ?? -1.5) + "rem";
      clockPanel.style.marginLeft = (appState.clockXOffset ?? 0) + "rem";
    } else {
      clockPanel.style.marginTop = "";
      clockPanel.style.marginLeft = "";
    }
    const pad = appState.clockPadding ?? 0;
    clockPanel.style.paddingLeft = pad + "px";
    clockPanel.style.paddingRight = pad + "px";
  }
}

function syncBottomSliders() {
  const clockYOffsetSlider = document.getElementById('clock-y-offset-slider');
  const clockYOffsetVal = document.getElementById('clock-y-offset-val');
  if (clockYOffsetSlider && clockYOffsetVal) {
    const val = appState.clockYOffset ?? -1.5;
    clockYOffsetSlider.value = val;
    clockYOffsetVal.textContent = val + "rem";
  }

  const clockXOffsetSlider = document.getElementById('clock-x-offset-slider');
  const clockXOffsetVal = document.getElementById('clock-x-offset-val');
  if (clockXOffsetSlider && clockXOffsetVal) {
    const val = appState.clockXOffset ?? 0;
    clockXOffsetSlider.value = val;
    clockXOffsetVal.textContent = val + "rem";
  }

  const clockPaddingSlider = document.getElementById('clock-padding-slider');
  const clockPaddingVal = document.getElementById('clock-padding-val');
  if (clockPaddingSlider && clockPaddingVal) {
    const val = appState.clockPadding ?? 0;
    clockPaddingSlider.value = val;
    clockPaddingVal.textContent = val + "px";
  }

  applyClockOffsets();

  const labelOffsetTopSlider = document.getElementById('label-offset-top-slider');
  const labelOffsetTopVal = document.getElementById('label-offset-top-val');
  const labelOffsetBottomSlider = document.getElementById('label-offset-bottom-slider');
  const labelOffsetBottomVal = document.getElementById('label-offset-bottom-val');
  const bottomIconSlider = document.getElementById('bottom-icon-slider');
  const bottomIconVal = document.getElementById('bottom-icon-val');
  const rollSizeSlider = document.getElementById('roll-size-slider');
  const rollSizeVal = document.getElementById('roll-size-val');
  const labelSepSlider = document.getElementById('label-sep-slider');
  const labelSepVal = document.getElementById('label-sep-val');
  const outerDistTopSlider = document.getElementById('outer-dist-top-slider');
  const outerDistTopVal = document.getElementById('outer-dist-top-val');
  const outerDistBottomSlider = document.getElementById('outer-dist-bottom-slider');
  const outerDistBottomVal = document.getElementById('outer-dist-bottom-val');

  if (labelOffsetTopSlider && labelOffsetTopVal) {
    const val = appState.labelOffsetTop ?? 0;
    labelOffsetTopSlider.value = val;
    labelOffsetTopVal.textContent = val + "px";
  }
  if (labelOffsetBottomSlider && labelOffsetBottomVal) {
    const val = appState.labelOffsetBottom ?? 65;
    labelOffsetBottomSlider.value = val;
    labelOffsetBottomVal.textContent = val + "px";
  }
  if (bottomIconSlider && bottomIconVal) {
    const val = appState.bottomIconShift ?? 0;
    bottomIconSlider.value = val;
    bottomIconVal.textContent = val + "px";
  }
  if (rollSizeSlider && rollSizeVal) {
    const val = appState.rollFontSize ?? 110;
    rollSizeSlider.value = val;
    rollSizeVal.textContent = val + "px";
  }
  if (labelSepSlider && labelSepVal) {
    const val = appState.labelSeparation ?? 100;
    labelSepSlider.value = val;
    labelSepVal.textContent = val + "px";
  }
  if (outerDistTopSlider && outerDistTopVal) {
    const val = appState.outerDistTop ?? 320;
    outerDistTopSlider.value = val;
    outerDistTopVal.textContent = val + "px";
  }
  if (outerDistBottomSlider && outerDistBottomVal) {
    const val = appState.outerDistBottom ?? 320;
    outerDistBottomSlider.value = val;
    outerDistBottomVal.textContent = val + "px";
  }

  const iconSepSlider = document.getElementById('icon-sep-slider');
  const iconSepVal = document.getElementById('icon-sep-val');
  const wrapDistSlider = document.getElementById('wrap-dist-slider');
  const wrapDistVal = document.getElementById('wrap-dist-val');
  const polarityGapSlider = document.getElementById('polarity-gap-slider');
  const polarityGapVal = document.getElementById('polarity-gap-val');

  if (iconSepSlider && iconSepVal) {
    const val = appState.iconSeparation ?? 15;
    iconSepSlider.value = val;
    iconSepVal.textContent = val + "°";
  }
  if (wrapDistSlider && wrapDistVal) {
    const val = appState.wrapDistance ?? 25;
    wrapDistSlider.value = val;
    wrapDistVal.textContent = val + "px";
  }
  if (polarityGapSlider && polarityGapVal) {
    const val = appState.polarityGap ?? 3.2;
    polarityGapSlider.value = val;
    polarityGapVal.textContent = val + "°";
  }

  const overlayWidthSlider = document.getElementById('overlay-width-slider');
  const overlayWidthVal = document.getElementById('overlay-width-val');
  const overlayFontSizeSlider = document.getElementById('overlay-font-size-slider');
  const overlayFontSizeVal = document.getElementById('overlay-font-size-val');

  if (overlayWidthSlider && overlayWidthVal) {
    const val = appState.overlayBoxWidth ?? 12;
    overlayWidthSlider.value = val;
    overlayWidthVal.textContent = val + "°";
  }
  const overlayHeightSlider = document.getElementById('overlay-height-slider');
  const overlayHeightVal = document.getElementById('overlay-height-val');
  if (overlayHeightSlider && overlayHeightVal) {
    const val = appState.overlayBoxHeight ?? 165;
    overlayHeightSlider.value = val;
    overlayHeightVal.textContent = val + "px";
  }
  if (overlayFontSizeSlider && overlayFontSizeVal) {
    const val = appState.overlayFontSize ?? 45;
    overlayFontSizeSlider.value = val;
    overlayFontSizeVal.textContent = val + "px";
  }

  const modMinSlider = document.getElementById('modifier-min-font-size-slider');
  const modMinVal = document.getElementById('modifier-min-font-size-val');
  const modMaxSlider = document.getElementById('modifier-max-font-size-slider');
  const modMaxVal = document.getElementById('modifier-max-font-size-val');
  const modDesiredSlider = document.getElementById('modifier-desired-font-size-slider');
  const modDesiredVal = document.getElementById('modifier-desired-font-size-val');

  if (modMinSlider && modMinVal) {
    const val = appState.modifierMinFontSize ?? 22;
    modMinSlider.value = val;
    modMinVal.textContent = val + "px";
  }
  if (modMaxSlider && modMaxVal) {
    const val = appState.modifierMaxFontSize ?? 55;
    modMaxSlider.value = val;
    modMaxVal.textContent = val + "px";
  }
  if (modDesiredSlider && modDesiredVal) {
    const val = appState.modifierDesiredFontSize ?? 50;
    modDesiredSlider.value = val;
    modDesiredVal.textContent = val + "px";
  }
  syncAnimationSliders();
}

function syncAnimationSliders() {
  const animToggle = document.getElementById('btn-toggle-animation');
  if (animToggle) {
    animToggle.classList.toggle('active', !!appState.animationMode);
    animToggle.textContent = appState.animationMode ? 'ON' : 'OFF';
  }

  const speedSlider = document.getElementById('animation-speed-slider');
  const speedVal = document.getElementById('animation-speed-val');
  if (speedSlider && speedVal) {
    const speed = appState.animationSpeed ?? 5;
    speedSlider.value = speed;
    speedVal.textContent = speed;
  }

  const durationSlider = document.getElementById('animation-duration-slider');
  const durationVal = document.getElementById('animation-duration-val');
  if (durationSlider && durationVal) {
    const duration = appState.animationDuration ?? 2;
    durationSlider.value = duration;
    durationVal.textContent = duration + "s";
  }

  const momentumSlider = document.getElementById('animation-momentum-slider');
  const momentumVal = document.getElementById('animation-momentum-val');
  if (momentumSlider && momentumVal) {
    const momentum = appState.momentumCurve ?? 5;
    momentumSlider.value = momentum;
    momentumVal.textContent = momentum;
  }

  const freeSpinToggle = document.getElementById('btn-toggle-free-spin');
  if (freeSpinToggle) {
    freeSpinToggle.classList.toggle('active', !!appState.freeSpinMode);
    freeSpinToggle.textContent = appState.freeSpinMode ? 'ON' : 'OFF';
  }

  const frictionSlider = document.getElementById('free-spin-friction-slider');
  const frictionVal = document.getElementById('free-spin-friction-val');
  if (frictionSlider && frictionVal) {
    const friction = appState.freeSpinFriction ?? 0.985;
    frictionSlider.value = friction;
    frictionVal.textContent = friction;
  }
}

// Spell Generator Setup
let spellState = {
  selectedClass: 'all',
  selectedTier: 'all'
};

function setupSpellPicker() {
  const classButtons = document.querySelectorAll('#spell-generator-card [data-class]');
  const tierButtons = document.querySelectorAll('#spell-generator-card [data-tier]');
  const rollBtn = document.getElementById('btn-roll-spell');
  const resultBox = document.getElementById('spell-result-box');
  const searchInput = document.getElementById('spell-search-input');
  const autocompleteList = document.getElementById('spell-autocomplete-list');

  if (!rollBtn || !resultBox || !searchInput || !autocompleteList) return;

  // Helper to re-trigger search if input has value
  function updateSuggestions() {
    if (searchInput.value.trim()) {
      searchInput.dispatchEvent(new Event('input'));
    }
  }

  // Class Selection
  classButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      classButtons.forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      spellState.selectedClass = e.currentTarget.getAttribute('data-class');
      updateSuggestions();
    });
  });

  // Tier Selection
  tierButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      tierButtons.forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      spellState.selectedTier = e.currentTarget.getAttribute('data-tier');
      updateSuggestions();
    });
  });

  // Roll Button Event
  rollBtn.addEventListener('click', () => {
    // Filter spells based on state
    let filtered = spells;
    if (spellState.selectedClass !== 'all') {
      filtered = filtered.filter(s => s.class === spellState.selectedClass);
    }
    if (spellState.selectedTier !== 'all') {
      filtered = filtered.filter(s => s.tier === parseInt(spellState.selectedTier, 10));
    }

    if (filtered.length === 0) {
      resultBox.className = 'spell-display-empty';
      resultBox.innerHTML = '<div class="spell-placeholder" style="color: #ef4444;">No spells match current filters!</div>';
      return;
    }

    // Pick a random spell
    const randomSpell = filtered[Math.floor(Math.random() * filtered.length)];
    selectSpell(randomSpell, true);
  });

  // Autocomplete search logic
  let currentFocus = -1;

  function selectSpell(spell, isRoll = false) {
    if (!isRoll) {
      searchInput.value = spell.name;
    }
    closeAllLists();

    // Sync tier with Mishap Roller
    if (typeof mishapState !== 'undefined') {
      mishapState.selectedTier = spell.tier;
      mishapState.displayedTier = spell.tier;
      const tierBtns = document.querySelectorAll('#mishap-tier-control .btn-segment');
      tierBtns.forEach(b => {
        b.classList.remove('active');
        if (parseInt(b.dataset.mishapTier, 10) === spell.tier) {
          b.classList.add('active');
        }
      });
      renderScaledMandala();
    }

    // Trigger animation
    resultBox.classList.remove('roll-pulse');
    void resultBox.offsetWidth; // Trigger reflow
    resultBox.classList.add('roll-pulse');

    // Update styling based on class
    resultBox.className = ''; // Reset classes
    if (spell.class === 'Wizard') {
      resultBox.classList.add('wizard-glow');
    } else {
      resultBox.classList.add('priest-glow');
    }

    // Render result
    resultBox.innerHTML = `
      <div class="spell-result-name">${spell.name}</div>
      <div class="spell-result-meta">
        <span class="badge ${spell.class.toLowerCase()}">${spell.class}</span>
        <span class="badge tier">Tier ${spell.tier}</span>
      </div>
    `;
  }

  searchInput.addEventListener('input', (e) => {
    const val = e.target.value.trim().toLowerCase();
    closeAllLists();
    if (!val) return;
    currentFocus = -1;

    // Filter spells by query and active filters
    const filtered = spells.filter(s => {
      if (!s.name.toLowerCase().includes(val)) return false;
      if (spellState.selectedClass !== 'all' && s.class !== spellState.selectedClass) return false;
      if (spellState.selectedTier !== 'all' && s.tier !== parseInt(spellState.selectedTier, 10)) return false;
      return true;
    });

    if (filtered.length === 0) {
      const item = document.createElement('div');
      item.className = 'autocomplete-item';
      item.style.color = '#8b949e';
      item.style.cursor = 'default';
      item.textContent = 'No matching spells found';
      autocompleteList.appendChild(item);
      autocompleteList.classList.remove('hidden');
      return;
    }

    filtered.slice(0, 10).forEach(spell => {
      const item = document.createElement('div');
      item.className = 'autocomplete-item';
      item.innerHTML = `
        <span class="autocomplete-item-name">${spell.name}</span>
        <span class="autocomplete-item-meta">
          <span class="badge ${spell.class.toLowerCase()}">${spell.class}</span>
          <span class="badge tier">T${spell.tier}</span>
        </span>
      `;
      item.addEventListener('click', () => {
        selectSpell(spell);
      });
      autocompleteList.appendChild(item);
    });

    autocompleteList.classList.remove('hidden');
  });

  searchInput.addEventListener('keydown', (e) => {
    let items = autocompleteList.getElementsByClassName('autocomplete-item');
    if (items.length === 0 || items[0].textContent === 'No matching spells found') return;

    if (e.keyCode === 40) { // Arrow Down
      e.preventDefault();
      currentFocus++;
      addActive(items);
    } else if (e.keyCode === 38) { // Arrow Up
      e.preventDefault();
      currentFocus--;
      addActive(items);
    } else if (e.keyCode === 13) { // Enter
      e.preventDefault();
      if (currentFocus > -1 && items[currentFocus]) {
        items[currentFocus].click();
      } else if (items.length > 0) {
        items[0].click();
      }
    } else if (e.keyCode === 27) { // Escape
      closeAllLists();
    }
  });

  function addActive(items) {
    if (!items) return false;
    removeActive(items);
    if (currentFocus >= items.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = items.length - 1;
    items[currentFocus].classList.add('active');
    items[currentFocus].scrollIntoView({ block: 'nearest' });
  }

  function removeActive(items) {
    for (let i = 0; i < items.length; i++) {
      items[i].classList.remove('active');
    }
  }

  function closeAllLists() {
    autocompleteList.innerHTML = '';
    autocompleteList.classList.add('hidden');
  }

  // Close lists when clicking outside
  document.addEventListener('click', (e) => {
    if (e.target !== searchInput && e.target !== autocompleteList) {
      closeAllLists();
    }
  });
}

// Init / Startup Flow
async function init() {
  const animToggle = document.getElementById('btn-toggle-animation');
  if (animToggle) {
    animToggle.addEventListener('click', () => {
      appState.animationMode = !appState.animationMode;
      syncAnimationSliders();
      renderScaledMandala();
    });
  }

  try {
    const response = await fetch('/mishap_config.md');
    if (response.ok) {
      const markdownText = await response.text();
      const tables = parseMarkdownTables(markdownText);
      const loadedState = mapTablesToState(tables);
      if (loadedState) {
        appState.magicNodes = loadedState.magicNodes;
        appState.scaledTiers = loadedState.scaledTiers;
      }
    } else {
      console.warn("Could not fetch mishap_config.md, using default config.");
    }
  } catch (err) {
    console.error("Error loading or parsing mishap_config.md:", err);
  }

  // Set up view mode segmented control
  document.querySelectorAll('.btn-segment[data-view]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      appState.viewMode = e.currentTarget.getAttribute('data-view');
      syncViewModeButtons();
      renderScaledMandala();
      renderSidebarTables();
    });
  });

  // Set up polarity style segmented control
  document.querySelectorAll('.btn-segment[data-polarity]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      appState.polarityMode = e.currentTarget.getAttribute('data-polarity');
      syncPolarityModeButtons();
      renderScaledMandala();
    });
  });

  // Set up polarity layout segmented control
  document.querySelectorAll('.btn-segment[data-polarity-layout]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      appState.polarityLayout = e.currentTarget.getAttribute('data-polarity-layout');
      syncPolarityModeButtons();
      renderScaledMandala();
    });
  });

  // Set up overlay style segmented control
  document.querySelectorAll('.btn-segment[data-overlay]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      appState.overlayStyle = e.currentTarget.getAttribute('data-overlay');
      syncOverlayModeButtons();
      renderScaledMandala();
    });
  });

  // Set up outer centering toggle
  const outerCenteringBtn = document.getElementById('outer-centering-btn');
  if (outerCenteringBtn) {
    outerCenteringBtn.addEventListener('click', () => {
      appState.centerOuterText = !appState.centerOuterText;
      syncOuterCenteringButton();
      renderScaledMandala();
      renderSidebarTables();
    });
  }

  // Set up pin offset slider listener
  const outerOffsetSlider = document.getElementById('outer-offset-slider');
  const outerOffsetVal = document.getElementById('outer-offset-val');
  if (outerOffsetSlider && outerOffsetVal) {
    outerOffsetSlider.addEventListener('input', (e) => {
      appState.outerPinOffset = parseFloat(e.target.value);
      outerOffsetVal.textContent = appState.outerPinOffset + "°";
      renderScaledMandala();
    });
  }

  // Set up Clock Y Offset slider listener
  const clockYOffsetSlider = document.getElementById('clock-y-offset-slider');
  const clockYOffsetVal = document.getElementById('clock-y-offset-val');
  if (clockYOffsetSlider && clockYOffsetVal) {
    clockYOffsetSlider.addEventListener('input', (e) => {
      appState.clockYOffset = parseFloat(e.target.value);
      clockYOffsetVal.textContent = appState.clockYOffset + "rem";
      applyClockOffsets();
    });
  }

  // Set up Clock X Offset slider listener
  const clockXOffsetSlider = document.getElementById('clock-x-offset-slider');
  const clockXOffsetVal = document.getElementById('clock-x-offset-val');
  if (clockXOffsetSlider && clockXOffsetVal) {
    clockXOffsetSlider.addEventListener('input', (e) => {
      appState.clockXOffset = parseFloat(e.target.value);
      clockXOffsetVal.textContent = appState.clockXOffset + "rem";
      applyClockOffsets();
    });
  }

  // Set up Clock Padding X slider listener
  const clockPaddingSlider = document.getElementById('clock-padding-slider');
  const clockPaddingVal = document.getElementById('clock-padding-val');
  if (clockPaddingSlider && clockPaddingVal) {
    clockPaddingSlider.addEventListener('input', (e) => {
      appState.clockPadding = parseInt(e.target.value, 10);
      clockPaddingVal.textContent = appState.clockPadding + "px";
      applyClockOffsets();
    });
  }

  // Set up top/bottom label offset sliders listeners
  const labelOffsetTopSlider = document.getElementById('label-offset-top-slider');
  const labelOffsetTopVal = document.getElementById('label-offset-top-val');
  if (labelOffsetTopSlider && labelOffsetTopVal) {
    labelOffsetTopSlider.addEventListener('input', (e) => {
      appState.labelOffsetTop = parseInt(e.target.value, 10);
      labelOffsetTopVal.textContent = appState.labelOffsetTop + "px";
      renderScaledMandala();
    });
  }

  const labelOffsetBottomSlider = document.getElementById('label-offset-bottom-slider');
  const labelOffsetBottomVal = document.getElementById('label-offset-bottom-val');
  if (labelOffsetBottomSlider && labelOffsetBottomVal) {
    labelOffsetBottomSlider.addEventListener('input', (e) => {
      appState.labelOffsetBottom = parseInt(e.target.value, 10);
      labelOffsetBottomVal.textContent = appState.labelOffsetBottom + "px";
      renderScaledMandala();
    });
  }

  const bottomIconSlider = document.getElementById('bottom-icon-slider');
  const bottomIconVal = document.getElementById('bottom-icon-val');
  if (bottomIconSlider && bottomIconVal) {
    bottomIconSlider.addEventListener('input', (e) => {
      appState.bottomIconShift = parseInt(e.target.value, 10);
      bottomIconVal.textContent = appState.bottomIconShift + "px";
      renderScaledMandala();
    });
  }

  const rollSizeSlider = document.getElementById('roll-size-slider');
  const rollSizeVal = document.getElementById('roll-size-val');
  if (rollSizeSlider && rollSizeVal) {
    rollSizeSlider.addEventListener('input', (e) => {
      appState.rollFontSize = parseInt(e.target.value, 10);
      rollSizeVal.textContent = appState.rollFontSize + "px";
      renderScaledMandala();
    });
  }

  const labelSepSlider = document.getElementById('label-sep-slider');
  const labelSepVal = document.getElementById('label-sep-val');
  if (labelSepSlider && labelSepVal) {
    labelSepSlider.addEventListener('input', (e) => {
      appState.labelSeparation = parseInt(e.target.value, 10);
      labelSepVal.textContent = appState.labelSeparation + "px";
      renderScaledMandala();
    });
  }

  const outerDistTopSlider = document.getElementById('outer-dist-top-slider');
  const outerDistTopVal = document.getElementById('outer-dist-top-val');
  if (outerDistTopSlider && outerDistTopVal) {
    outerDistTopSlider.addEventListener('input', (e) => {
      appState.outerDistTop = parseInt(e.target.value, 10);
      outerDistTopVal.textContent = appState.outerDistTop + "px";
      renderScaledMandala();
    });
  }

  const outerDistBottomSlider = document.getElementById('outer-dist-bottom-slider');
  const outerDistBottomVal = document.getElementById('outer-dist-bottom-val');
  if (outerDistBottomSlider && outerDistBottomVal) {
    outerDistBottomSlider.addEventListener('input', (e) => {
      appState.outerDistBottom = parseInt(e.target.value, 10);
      outerDistBottomVal.textContent = appState.outerDistBottom + "px";
      renderScaledMandala();
    });
  }

  const iconSepSlider = document.getElementById('icon-sep-slider');
  const iconSepVal = document.getElementById('icon-sep-val');
  if (iconSepSlider && iconSepVal) {
    iconSepSlider.addEventListener('input', (e) => {
      appState.iconSeparation = parseInt(e.target.value, 10);
      iconSepVal.textContent = appState.iconSeparation + "°";
      renderScaledMandala();
    });
  }

  const wrapDistSlider = document.getElementById('wrap-dist-slider');
  const wrapDistVal = document.getElementById('wrap-dist-val');
  if (wrapDistSlider && wrapDistVal) {
    wrapDistSlider.addEventListener('input', (e) => {
      appState.wrapDistance = parseInt(e.target.value, 10);
      wrapDistVal.textContent = appState.wrapDistance + "px";
      renderScaledMandala();
    });
  }

  const polarityGapSlider = document.getElementById('polarity-gap-slider');
  const polarityGapVal = document.getElementById('polarity-gap-val');
  if (polarityGapSlider && polarityGapVal) {
    polarityGapSlider.addEventListener('input', (e) => {
      appState.polarityGap = parseFloat(e.target.value);
      polarityGapVal.textContent = appState.polarityGap + "°";
      renderScaledMandala();
    });
  }

  const overlayWidthSlider = document.getElementById('overlay-width-slider');
  const overlayWidthVal = document.getElementById('overlay-width-val');
  if (overlayWidthSlider && overlayWidthVal) {
    overlayWidthSlider.addEventListener('input', (e) => {
      appState.overlayBoxWidth = parseFloat(e.target.value);
      overlayWidthVal.textContent = appState.overlayBoxWidth + "°";
      renderScaledMandala();
    });
  }

  const overlayHeightSlider = document.getElementById('overlay-height-slider');
  const overlayHeightVal = document.getElementById('overlay-height-val');
  if (overlayHeightSlider && overlayHeightVal) {
    overlayHeightSlider.addEventListener('input', (e) => {
      appState.overlayBoxHeight = parseFloat(e.target.value);
      overlayHeightVal.textContent = appState.overlayBoxHeight + "px";
      renderScaledMandala();
    });
  }

  const overlayFontSizeSlider = document.getElementById('overlay-font-size-slider');
  const overlayFontSizeVal = document.getElementById('overlay-font-size-val');
  if (overlayFontSizeSlider && overlayFontSizeVal) {
    overlayFontSizeSlider.addEventListener('input', (e) => {
      appState.overlayFontSize = parseInt(e.target.value, 10);
      overlayFontSizeVal.textContent = appState.overlayFontSize + "px";
      renderScaledMandala();
    });
  }

  const modMinSlider = document.getElementById('modifier-min-font-size-slider');
  const modMinVal = document.getElementById('modifier-min-font-size-val');
  if (modMinSlider && modMinVal) {
    modMinSlider.addEventListener('input', (e) => {
      appState.modifierMinFontSize = parseInt(e.target.value, 10);
      modMinVal.textContent = appState.modifierMinFontSize + "px";
      renderScaledMandala();
    });
  }

  const modMaxSlider = document.getElementById('modifier-max-font-size-slider');
  const modMaxVal = document.getElementById('modifier-max-font-size-val');
  if (modMaxSlider && modMaxVal) {
    modMaxSlider.addEventListener('input', (e) => {
      appState.modifierMaxFontSize = parseInt(e.target.value, 10);
      modMaxVal.textContent = appState.modifierMaxFontSize + "px";
      renderScaledMandala();
    });
  }

  const modDesiredSlider = document.getElementById('modifier-desired-font-size-slider');
  const modDesiredVal = document.getElementById('modifier-desired-font-size-val');
  if (modDesiredSlider && modDesiredVal) {
    modDesiredSlider.addEventListener('input', (e) => {
      appState.modifierDesiredFontSize = parseInt(e.target.value, 10);
      modDesiredVal.textContent = appState.modifierDesiredFontSize + "px";
      renderScaledMandala();
    });
  }

  const speedSlider = document.getElementById('animation-speed-slider');
  const speedVal = document.getElementById('animation-speed-val');
  if (speedSlider && speedVal) {
    speedSlider.addEventListener('input', (e) => {
      appState.animationSpeed = parseFloat(e.target.value);
      speedVal.textContent = appState.animationSpeed;
    });
  }

  const durationSlider = document.getElementById('animation-duration-slider');
  const durationVal = document.getElementById('animation-duration-val');
  if (durationSlider && durationVal) {
    durationSlider.addEventListener('input', (e) => {
      appState.animationDuration = parseFloat(e.target.value);
      durationVal.textContent = appState.animationDuration + "s";
    });
  }

  const momentumSlider = document.getElementById('animation-momentum-slider');
  const momentumVal = document.getElementById('animation-momentum-val');
  if (momentumSlider && momentumVal) {
    momentumSlider.addEventListener('input', (e) => {
      appState.momentumCurve = parseFloat(e.target.value);
      momentumVal.textContent = appState.momentumCurve;
    });
  }

  const freeSpinToggle = document.getElementById('btn-toggle-free-spin');
  if (freeSpinToggle) {
    freeSpinToggle.addEventListener('click', () => {
      appState.freeSpinMode = !appState.freeSpinMode;
      syncAnimationSliders();
    });
  }

  const frictionSlider = document.getElementById('free-spin-friction-slider');
  const frictionVal = document.getElementById('free-spin-friction-val');
  if (frictionSlider && frictionVal) {
    frictionSlider.addEventListener('input', (e) => {
      appState.freeSpinFriction = parseFloat(e.target.value);
      frictionVal.textContent = appState.freeSpinFriction;
    });
  }

  const effectWrapCharsSlider = document.getElementById('effect-wrap-chars-slider');
  const effectWrapCharsVal = document.getElementById('effect-wrap-chars-val');
  if (effectWrapCharsSlider && effectWrapCharsVal) {
    effectWrapCharsSlider.value = appState.effectWrapChars ?? 40;
    effectWrapCharsVal.textContent = appState.effectWrapChars ?? 40;
    effectWrapCharsSlider.addEventListener('input', (e) => {
      appState.effectWrapChars = parseInt(e.target.value);
      effectWrapCharsVal.textContent = appState.effectWrapChars;
      renderScaledMandala();
    });
  }

  const inlineNumSizeSlider = document.getElementById('inline-number-size-slider');
  const inlineNumSizeVal = document.getElementById('inline-number-size-val');
  if (inlineNumSizeSlider && inlineNumSizeVal) {
    inlineNumSizeSlider.value = appState.inlineNumberSize ?? 70;
    inlineNumSizeVal.textContent = (appState.inlineNumberSize ?? 70) + "px";
    inlineNumSizeSlider.addEventListener('input', (e) => {
      appState.inlineNumberSize = parseInt(e.target.value);
      inlineNumSizeVal.textContent = appState.inlineNumberSize + "px";
      renderScaledMandala();
    });
  }

  const inlineNumSpacingSlider = document.getElementById('inline-number-spacing-slider');
  const inlineNumSpacingVal = document.getElementById('inline-number-spacing-val');
  if (inlineNumSpacingSlider && inlineNumSpacingVal) {
    inlineNumSpacingSlider.value = appState.inlineNumberSpacing ?? 30;
    inlineNumSpacingVal.textContent = (appState.inlineNumberSpacing ?? 30) + "px";
    inlineNumSpacingSlider.addEventListener('input', (e) => {
      appState.inlineNumberSpacing = parseInt(e.target.value);
      inlineNumSpacingVal.textContent = appState.inlineNumberSpacing + "px";
      renderScaledMandala();
    });
  }

  const polarityCharSizeSlider = document.getElementById('polarity-char-size-slider');
  const polarityCharSizeVal = document.getElementById('polarity-char-size-val');
  if (polarityCharSizeSlider && polarityCharSizeVal) {
    polarityCharSizeSlider.value = appState.polarityCharSize ?? 110;
    polarityCharSizeVal.textContent = (appState.polarityCharSize ?? 110) + "px";
    polarityCharSizeSlider.addEventListener('input', (e) => {
      appState.polarityCharSize = parseInt(e.target.value);
      polarityCharSizeVal.textContent = appState.polarityCharSize + "px";
      renderScaledMandala();
    });
  }

  const polarityLineGapSlider = document.getElementById('polarity-line-gap-slider');
  const polarityLineGapVal = document.getElementById('polarity-line-gap-val');
  if (polarityLineGapSlider && polarityLineGapVal) {
    polarityLineGapSlider.value = appState.polarityLineGap ?? 3.5;
    polarityLineGapVal.textContent = (appState.polarityLineGap ?? 3.5) + "°";
    polarityLineGapSlider.addEventListener('input', (e) => {
      appState.polarityLineGap = parseFloat(e.target.value);
      polarityLineGapVal.textContent = appState.polarityLineGap + "°";
      renderScaledMandala();
    });
  }

  const polarityLineLengthSlider = document.getElementById('polarity-line-length-slider');
  const polarityLineLengthVal = document.getElementById('polarity-line-length-val');
  if (polarityLineLengthSlider && polarityLineLengthVal) {
    polarityLineLengthSlider.value = appState.polarityLineLength ?? 8;
    polarityLineLengthVal.textContent = (appState.polarityLineLength ?? 8) + "°";
    polarityLineLengthSlider.addEventListener('input', (e) => {
      appState.polarityLineLength = parseFloat(e.target.value);
      polarityLineLengthVal.textContent = appState.polarityLineLength + "°";
      renderScaledMandala();
    });
  }

  const polarityLineGradPosSlider = document.getElementById('polarity-line-grad-pos-slider');
  const polarityLineGradPosVal = document.getElementById('polarity-line-grad-pos-val');
  if (polarityLineGradPosSlider && polarityLineGradPosVal) {
    polarityLineGradPosSlider.value = appState.polarityLineGradPos ?? 40;
    polarityLineGradPosVal.textContent = (appState.polarityLineGradPos ?? 40) + "%";
    polarityLineGradPosSlider.addEventListener('input', (e) => {
      appState.polarityLineGradPos = parseInt(e.target.value);
      polarityLineGradPosVal.textContent = appState.polarityLineGradPos + "%";
      renderScaledMandala();
    });
  }

  const headerFontSizeSlider = document.getElementById('header-font-size-slider');
  const headerFontSizeVal = document.getElementById('header-font-size-val');

  const applyHeaderFontSize = (v) => {
    document.documentElement.style.setProperty('--header-font-size', `${v}rem`);
    document.querySelectorAll('.controls .btn, .controls span, .controls label').forEach(el => {
      if (el.style.fontSize || el.tagName.toLowerCase() === 'span' || el.tagName.toLowerCase() === 'label') {
        el.style.fontSize = `${v}rem`;
      }
    });
    document.querySelectorAll('.btn-segment').forEach(el => {
      el.style.fontSize = `${v}rem`;
    });
  };

  if (headerFontSizeSlider && headerFontSizeVal) {
    const initVal = appState.headerFontSize ?? 0.9;
    headerFontSizeSlider.value = initVal;
    headerFontSizeVal.textContent = initVal + "rem";
    // Defer the initial styling slightly to ensure elements are rendered
    setTimeout(() => applyHeaderFontSize(initVal), 10);

    headerFontSizeSlider.addEventListener('input', (e) => {
      const v = parseFloat(e.target.value);
      appState.headerFontSize = v;
      headerFontSizeVal.textContent = v + "rem";
      applyHeaderFontSize(v);
    });
  }

  const staticPillsCb = document.getElementById('toggle-static-pills');
  if (staticPillsCb) {
    staticPillsCb.checked = appState.staticPills;
    staticPillsCb.addEventListener('change', (e) => {
      appState.staticPills = e.target.checked;
      renderScaledMandala();
    });
  }

  const alignSchoolCb = document.getElementById('toggle-align-school');
  if (alignSchoolCb) {
    alignSchoolCb.checked = appState.alignSchoolToTop;
    alignSchoolCb.addEventListener('change', (e) => {
      appState.alignSchoolToTop = e.target.checked;
    });
  }

  const alignEffectCb = document.getElementById('toggle-align-effect');
  if (alignEffectCb) {
    alignEffectCb.checked = appState.alignEffectToTop;
    alignEffectCb.addEventListener('change', (e) => {
      appState.alignEffectToTop = e.target.checked;
    });
  }

  const showOuterCenterNumbersCb = document.getElementById('toggle-outer-center-numbers');
  if (showOuterCenterNumbersCb) {
    showOuterCenterNumbersCb.checked = appState.showOuterCenterNumbers;
    showOuterCenterNumbersCb.addEventListener('change', (e) => {
      appState.showOuterCenterNumbers = e.target.checked;
      renderScaledMandala();
    });
  }

  const showInlineNumbersCb = document.getElementById('toggle-inline-numbers');
  if (showInlineNumbersCb) {
    showInlineNumbersCb.checked = appState.showInlineNumbers;
    showInlineNumbersCb.addEventListener('change', (e) => {
      appState.showInlineNumbers = e.target.checked;
      if (e.target.checked && showOuterCenterNumbersCb) {
        appState.showOuterCenterNumbers = false;
        showOuterCenterNumbersCb.checked = false;
      }
      renderScaledMandala();
    });
  }

  const showInlineDiceCb = document.getElementById('toggle-inline-dice');
  if (showInlineDiceCb) {
    showInlineDiceCb.checked = appState.showInlineDice;
    showInlineDiceCb.addEventListener('change', (e) => {
      appState.showInlineDice = e.target.checked;
      renderScaledMandala();
    });
  }

  const exportPngBtn = document.getElementById('export-png-btn');
  if (exportPngBtn) {
    exportPngBtn.addEventListener('click', exportToPNG);
  }

  if (!appState.viewMode) {
    appState.viewMode = 'curved-axis';
  }
  if (!appState.polarityMode) {
    appState.polarityMode = 'gap';
  }
  if (!appState.polarityLayout) {
    appState.polarityLayout = 'visual-right';
  }
  syncViewModeButtons();
  syncPolarityModeButtons();
  syncOuterCenteringButton();
  syncAnimationSliders();

  // Update input values and render views
  const msInitEl = document.getElementById('magic-slots');
  if (msInitEl) msInitEl.value = appState.magicNodes.length;

  renderMagicMandala();
  renderTierControls();
  renderScaledMandala();
  renderSidebarTables();
  setupSpellPicker();
  setupMishapRoller();

  // Set up header visibility toggle
  const header = document.querySelector('header');
  const headerToggleBtn = document.getElementById('header-toggle-btn');
  if (header && headerToggleBtn) {
    const updateHeaderHeight = () => {
      document.documentElement.style.setProperty('--header-height', `${header.offsetHeight}px`);
      applyClockOffsets();
    };

    // Initialize height measurement
    updateHeaderHeight();

    // Listen for resize to update height variable dynamically
    window.addEventListener('resize', updateHeaderHeight);

    // Helper to sync body class with header collapse state
    const syncBodyClass = (isCollapsed) => {
      document.body.classList.toggle('header-collapsed', isCollapsed);
    };

    // Toggle button click listener
    headerToggleBtn.addEventListener('click', () => {
      const isCollapsed = header.classList.toggle('collapsed');
      syncBodyClass(isCollapsed);
      localStorage.setItem('header-collapsed', isCollapsed);
    });

    // Apply initial state from local storage on load
    const isCollapsedSaved = localStorage.getItem('header-collapsed') === 'true';
    if (isCollapsedSaved) {
      header.classList.add('no-transition');
      header.classList.add('collapsed');
      syncBodyClass(true);
      // Trigger a force reflow to ensure styles are applied without transition
      header.offsetHeight;
      header.classList.remove('no-transition');
    }
  }
}

let cachedGameIconsBase64 = null;

function arrayBufferToBase64(buffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  const chunk = 8192;
  for (let i = 0; i < len; i += chunk) {
    binary += String.fromCharCode.apply(null, bytes.subarray(i, Math.min(i + chunk, len)));
  }
  return window.btoa(binary);
}



async function getGameIconsBase64() {
  if (cachedGameIconsBase64) return cachedGameIconsBase64;
  const response = await fetch('/fonts/rpgen-gameicons.ttf');
  if (!response.ok) throw new Error(`Font fetch failed: ${response.status}`);
  const buffer = await response.arrayBuffer();
  cachedGameIconsBase64 = arrayBufferToBase64(buffer);
  return cachedGameIconsBase64;
}

async function exportToPNG() {
  const exportPngBtn = document.getElementById('export-png-btn');
  const originalText = exportPngBtn.textContent;
  exportPngBtn.textContent = "Exporting...";
  exportPngBtn.disabled = true;

  try {
    const container = document.getElementById('target-mandala');
    const svg = container ? container.querySelector('svg') : null;
    if (!svg) {
      alert("Mandala SVG not found!");
      return;
    }

    // Load and base64 inline the game icons font to avoid tainting the canvas
    const base64Font = await getGameIconsBase64();

    // Clone the SVG
    const svgClone = svg.cloneNode(true);
    svgClone.setAttribute("width", "5200");
    svgClone.setAttribute("height", "5200");

    // ---------------------------------------------------------------
    // Replace every <foreignObject> with a native SVG <text> glyph.
    // Any foreignObject in an SVG taints the canvas, blocking toDataURL.
    // ---------------------------------------------------------------
    function getIconGlyph(iconClass) {
      const probe = document.createElement('i');
      probe.className = `gi ${iconClass}`;
      probe.style.cssText = 'position:absolute;visibility:hidden;font-size:16px;';
      document.body.appendChild(probe);
      const glyph = window.getComputedStyle(probe, '::before').content;
      document.body.removeChild(probe);
      if (!glyph || glyph === 'none' || glyph === '""' || glyph === "''") return null;
      return glyph.replace(/^["']|["']$/g, '');
    }

    function replaceForeignObjects(root) {
      const originalFObjs = Array.from(document.querySelectorAll('#target-mandala foreignObject'));
      const clonedFObjs = Array.from(root.querySelectorAll('foreignObject'));

      for (let idx = 0; idx < clonedFObjs.length; idx++) {
        const fObj = clonedFObjs[idx];
        const origFObj = originalFObjs[idx];

        const x = parseFloat(fObj.getAttribute('x') || '0');
        const y = parseFloat(fObj.getAttribute('y') || '0');
        const w = parseFloat(fObj.getAttribute('width') || '0');
        const h = parseFloat(fObj.getAttribute('height') || '0');

        const iEls = Array.from(fObj.querySelectorAll('i[class]'));
        const origIEls = origFObj ? Array.from(origFObj.querySelectorAll('i[class]')) : [];

        if (iEls.length === 0) {
          fObj.parentNode.removeChild(fObj);
          continue;
        }

        const cx2 = x + w / 2;
        const cy2 = y + h / 2;

        for (let j = 0; j < iEls.length; j++) {
          const iEl = iEls[j];
          const origIEl = origIEls[j];

          // Check if it's hidden in the original DOM
          if (origIEl) {
            const comp = window.getComputedStyle(origIEl);
            if (comp.opacity === '0' || comp.visibility === 'hidden' || comp.display === 'none') {
              continue; // Skip rendering hidden icons
            }
          }

          const classes = iEl.getAttribute('class').split(/\s+/);
          const iconClass = classes.filter(c => c.startsWith('gi-') && c !== 'gi').join(' ');
          const hasFlip = classes.includes('gi-flip-horizontal');

          // Grab inline styles
          const styleStr = iEl.getAttribute('style') || '';
          const colorMatch = styleStr.match(/color:\s*([^;]+)/);
          const fontSizeMatch = styleStr.match(/font-size:\s*([\d.]+)px/);

          // Determine color based on classes if inline doesn't exist (backdrop relies on classes sometimes, though we set it inline)
          let color = colorMatch ? colorMatch[1].trim() : '#ffffff';
          if (classes.includes('selected-backdrop')) color = '#fbbf24';

          const fontSize = fontSizeMatch ? parseFloat(fontSizeMatch[1]) : (Math.min(w, h) * 0.85);

          const glyph = getIconGlyph(iconClass);
          if (!glyph) continue;

          const textEl = document.createElementNS("http://www.w3.org/2000/svg", "text");
          textEl.setAttribute("fill", color);
          textEl.setAttribute("font-size", `${fontSize}px`);
          textEl.setAttribute("text-anchor", "middle");
          textEl.setAttribute("dominant-baseline", "central");
          textEl.setAttribute("class", iEl.getAttribute('class')); // pass classes for CSS masks/filters to apply
          textEl.setAttribute("style", `font-family: rpgen-gameicons !important; pointer-events: none;`);

          if (hasFlip) {
            textEl.setAttribute("x", cx2.toString());
            textEl.setAttribute("y", cy2.toString());
            textEl.setAttribute("transform", `scale(-1,1) translate(${-(cx2 * 2)},0)`);
          } else {
            textEl.setAttribute("x", cx2.toString());
            textEl.setAttribute("y", cy2.toString());
          }

          textEl.textContent = glyph;
          fObj.parentNode.insertBefore(textEl, fObj);
        }

        fObj.parentNode.removeChild(fObj);
      }
    }

    replaceForeignObjects(svgClone);
    // ---------------------------------------------------------------

    // Build a custom style block to inject safe styles and fonts
    const styleEl = document.createElementNS("http://www.w3.org/2000/svg", "style");

    let cssContent = `
      @font-face {
        font-family: 'rpgen-gameicons';
        src: url('data:font/truetype;base64,${base64Font}') format('truetype');
        font-weight: normal;
        font-style: normal;
      }

      /* Only override fonts on labelled text, NOT all SVG text (which would break icon glyphs) */
      .scaled-text {
        font-family: 'Outfit', 'Montserrat', system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif !important;
      }
    `;

    // Grab styles from styleSheets, excluding rules that load external resources
    for (const sheet of document.styleSheets) {
      try {
        if (sheet.href && sheet.href.includes('fonts.googleapis.com')) continue;
        for (const rule of sheet.cssRules) {
          if (rule.type === CSSRule.FONT_FACE_RULE) continue;
          cssContent += rule.cssText + '\n';
        }
      } catch (e) {
        console.warn("Could not read stylesheet rule:", e);
      }
    }

    styleEl.textContent = cssContent;
    svgClone.insertBefore(styleEl, svgClone.firstChild);

    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svgClone);

    const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const img = new Image();
    img.onload = () => {
      setTimeout(() => {
        const canvas = document.createElement('canvas');
        canvas.width = 5200;
        canvas.height = 5200;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, 5200, 5200);

        try {
          const pngUrl = canvas.toDataURL('image/png');
          const a = document.createElement('a');
          a.href = pngUrl;
          a.download = 'mandala_high_res.png';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        } catch (err) {
          console.error("Failed to generate PNG:", err);
          alert("Failed to export image due to security restrictions or error.");
        } finally {
          URL.revokeObjectURL(url);
          exportPngBtn.textContent = originalText;
          exportPngBtn.disabled = false;
        }
      }, 500);
    };

    img.onerror = (err) => {
      console.error("Image loading error:", err);
      alert("Failed to load SVG into image.");
      URL.revokeObjectURL(url);
      exportPngBtn.textContent = originalText;
      exportPngBtn.disabled = false;
    };

    img.src = url;
  } catch (err) {
    console.error("Export process error:", err);
    alert("Export process failed.");
    exportPngBtn.textContent = originalText;
    exportPngBtn.disabled = false;
  }
}

// ==========================================
// Cosmic Mishap Roller Logic
// ==========================================

let mishapState = {
  selectedSchoolIdx: null,
  selectedPolarity: null,
  selectedTier: 1,
  displayedTier: 1,
  isRolling: false,
  cwAngle: 0,
  ccwAngle: 0,
  pillsAngle: 0
};

function setupMishapRoller() {
  const tierBtns = document.querySelectorAll('#mishap-tier-control .btn-segment');
  const rollBtn = document.getElementById('btn-roll-mishap');
  const toggleBtn = document.getElementById('btn-mishap-rules-toggle');
  const rulesPopover = document.getElementById('mishap-rules-popover');

  if (!rollBtn) return;

  if (toggleBtn && rulesPopover) {
    toggleBtn.addEventListener('click', () => {
      rulesPopover.classList.toggle('visible');
    });
  }

  const resetBtn = document.getElementById('btn-mishap-reset');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (mishapState.freeSpinFrameId) {
        cancelAnimationFrame(mishapState.freeSpinFrameId);
        mishapState.freeSpinFrameId = null;
      }
      clearMandalaHighlights();

      const resultsContainer = document.getElementById('mishap-results-container');
      const narrativeBox = document.getElementById('mishap-narrative');
      const gmGuideBox = document.getElementById('mishap-gm-guide');
      const detailsContent = document.getElementById('mishap-gm-details-content');
      const diceBox = document.getElementById('mishap-dice-box');

      if (resultsContainer) resultsContainer.classList.add('hidden');
      if (narrativeBox) narrativeBox.innerHTML = '';
      if (gmGuideBox) gmGuideBox.classList.add('hidden');
      if (detailsContent) detailsContent.innerHTML = '';
      if (diceBox) diceBox.innerHTML = '';

      // Reset displayed tier to original selected tier, reset rotation angles, and re-render
      mishapState.displayedTier = mishapState.selectedTier;
      mishapState.cwAngle = 0;
      mishapState.ccwAngle = 0;
      mishapState.pillsAngle = 0;
      renderScaledMandala();
    });
  }

  // Tier selection
  tierBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tierBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      mishapState.selectedTier = parseInt(btn.dataset.mishapTier, 10);
      mishapState.displayedTier = mishapState.selectedTier;
      renderScaledMandala();
    });
  });

  rollBtn.addEventListener('click', rollMishap);



  // Default selection is not applied so the user must pick a polarity
}

function selectMishapIconFromCircle(schoolIdx, polarity) {
  mishapState.selectedSchoolIdx = parseInt(schoolIdx, 10);
  mishapState.selectedPolarity = polarity;

  const selectionContainer = document.getElementById('mishap-active-selection');
  if (selectionContainer) {
    const school = appState.magicNodes[schoolIdx];
    const iconClass = polarity === 'positive' ? school.icon : school.negativeIcon;
    const symbol = polarity === 'positive' ? '+' : '−';

    selectionContainer.style.setProperty('--school-color-glow', 'rgba(255, 255, 255, 0.5)');
    selectionContainer.style.setProperty('--school-color', school.color);

    selectionContainer.innerHTML = `
      <i class="gi ${iconClass}"></i>
      <div class="selection-text">
        <span class="selection-school">${school.label} (${symbol})</span>
        <span class="selection-polarity">${polarity}</span>
      </div>
    `;
  }

  // Update selection rings on the SVG mandala
  document.querySelectorAll('.outer-icon-group').forEach(group => {
    const sIdx = parseInt(group.getAttribute('data-school-idx'), 10);
    const pol = group.getAttribute('data-polarity');
    if (sIdx === mishapState.selectedSchoolIdx && pol === mishapState.selectedPolarity) {
      group.classList.add('selected-school-polarity');
    } else {
      group.classList.remove('selected-school-polarity');
    }
  });
}

function clearMandalaHighlights() {
  document.querySelectorAll('.highlighted').forEach(el => el.classList.remove('highlighted'));
  document.querySelectorAll('.effect-result-border').forEach(el => el.classList.remove('effect-result-border'));
  document.querySelectorAll('.result-polarity-highlight').forEach(el => el.classList.remove('result-polarity-highlight'));
  const container = document.getElementById('target-mandala');
  if (container) container.classList.remove('has-results');
}

function highlightMandalaElements(schoolIdx, tierIdx, isEffect, polarity) {
  if (isEffect) {
    // Calculate which school wedge this effect is visually on top of
    const cw = mishapState.cwAngle || 0;
    const ccw = mishapState.ccwAngle || 0;
    const totalRotationOffset = (cw + ccw) / 45;
    let visualSchoolIdx = (schoolIdx + Math.round(totalRotationOffset)) % 8;
    if (visualSchoolIdx < 0) visualSchoolIdx += 8;

    // 1. Highlight the specific tier slice for the Effect (Border only, no color change)
    const slice = document.getElementById(`mandala-slice-${tierIdx}-${visualSchoolIdx}`);
    if (slice) slice.classList.add('effect-result-border');

    // 2. Highlight the Effect Label
    document.querySelectorAll(`.outer-effect-label-${schoolIdx}`).forEach(effectLabel => {
      effectLabel.classList.add('highlighted');
    });

    // 3. Keep all modifier text in this pie wedge from dulling
    document.querySelectorAll(`.effect-name-text[data-school-idx="${schoolIdx}"]`).forEach(el => {
      el.classList.add('highlighted');
    });
  } else {
    // 1. Highlight the School Label
    const schoolLabel = document.querySelector(`.outer-school-label-${schoolIdx}`);
    if (schoolLabel) schoolLabel.classList.add('highlighted');

    // 1.5 Highlight all pie slices for this school
    document.querySelectorAll(`.mandala-slice[data-school-idx="${schoolIdx}"]`).forEach(el => {
      el.classList.add('highlighted');
    });

    // 2. Highlight the outer number
    const numberText = document.querySelector(`.outer-number-${schoolIdx}`);
    if (numberText) numberText.classList.add('highlighted');

    // 3. Highlight the specific Polarity Icon(s)
    document.querySelectorAll(`.outer-icon-${schoolIdx}`).forEach(el => {
      const groupPol = el.getAttribute('data-polarity');
      if (!polarity || groupPol === polarity) {
        el.classList.add('highlighted');
        el.classList.add('result-polarity-highlight');
      }
    });
  }
}

function rollMishap() {
  if (mishapState.freeSpinFrameId) {
    cancelAnimationFrame(mishapState.freeSpinFrameId);
    mishapState.freeSpinFrameId = null;
  }

  if (mishapState.selectedSchoolIdx === null) {
    alert("Please select a Cast School Polarity from the mandala before rolling.");
    return;
  }

  if (mishapState.isRolling) return;

  mishapState.isRolling = true;

  // Default displayed tier to the casting tier
  mishapState.displayedTier = mishapState.selectedTier;

  clearMandalaHighlights();

  // Re-render the mandala to refresh the pill selection state back to the casting tier
  renderScaledMandala();

  const resultsContainer = document.getElementById('mishap-results-container');
  const narrativeBox = document.getElementById('mishap-narrative');
  const gmGuideBox = document.getElementById('mishap-gm-guide');
  const container = document.getElementById('target-mandala');

  // Hide results while rolling
  if (container) container.classList.remove('has-results');
  if (resultsContainer) resultsContainer.classList.add('hidden');
  if (narrativeBox) narrativeBox.classList.add('hidden');
  if (gmGuideBox) gmGuideBox.classList.add('hidden');

  const rollBtn = document.getElementById('btn-roll-mishap');
  const resetBtn = document.getElementById('btn-mishap-reset');

  if (appState.animationMode) {
    if (rollBtn) {
      rollBtn.disabled = true;
      rollBtn.innerHTML = `<i class="gi gi-dice-eight-faces" style="font-size: 1.1rem; line-height: 1;"></i> Rolling...`;
    }
    if (resetBtn) resetBtn.disabled = true;

    const svg = container ? container.querySelector('svg') : null;
    const spinCWGroup = svg ? svg.querySelector('.spin-cw-group') : null;
    const spinCCWGroup = svg ? svg.querySelector('.spin-ccw-group') : null;
    const spinPillsGroup = svg ? svg.querySelector('.spin-pills-group') : null;

    const d1 = Math.floor(Math.random() * 8) + 1; // Mishap School
    const d2 = Math.floor(Math.random() * 8) + 1; // Mishap Effect
    mishapState.d1 = d1;
    mishapState.d2 = d2;

    let d3 = null;
    if (d1 === d2) {
      // Pre-roll Chaos Die d3 (including resonance explosions)
      let currentTier = mishapState.selectedTier + 1;
      let effectDiceBonus = 0;
      let effectDcBonus = 0;
      d3 = Math.floor(Math.random() * 8) + 1;
      let chaosLog = `Rolled ${d3}`;

      const explodedDice = [];
      while (d3 === d1) {
        explodedDice.push(d3);
        if (currentTier < 5) {
          currentTier++;
          chaosLog += ` &rarr; 💥 Resonance! Escalated to T${currentTier}. Re-rolling`;
        } else {
          effectDiceBonus++;
          effectDcBonus += 2;
          chaosLog += ` &rarr; 💥 Overload! DC+2, Dice+1. Re-rolling`;
        }
        d3 = Math.floor(Math.random() * 8) + 1;
        chaosLog += ` [New: ${d3}]`;
      }
      mishapState.d3 = d3;
      mishapState.preExplodedDice = explodedDice;
      mishapState.preCurrentTier = currentTier;
      mishapState.preEffectDiceBonus = effectDiceBonus;
      mishapState.preEffectDcBonus = effectDcBonus;
      mishapState.preChaosLog = chaosLog;
    } else {
      mishapState.d3 = null;
      mishapState.preExplodedDice = null;
      mishapState.preCurrentTier = null;
      mishapState.preEffectDiceBonus = null;
      mishapState.preEffectDcBonus = null;
      mishapState.preChaosLog = null;
    }

    if (spinCWGroup && spinCCWGroup) {
      // Calculate target rotation based on speed, ensuring base spin is an integer multiple of 360 degrees
      const rotations = Math.max(1, Math.round(2 + ((appState.animationSpeed || 5) * 0.4)));
      let cwAdd = 360 * rotations;
      let ccwAdd = 360 * rotations;
      let pillsAdd = -360 * rotations;

      if (appState.alignSchoolToTop) {
        let alignSchoolIdx = mishapState.selectedSchoolIdx;
        if (d1 === d2) {
          alignSchoolIdx = d1 - 1;
        } else if (d1 === 2 || d1 === 3) {
          const oppLabel = appState.magicNodes[mishapState.selectedSchoolIdx].opposite;
          alignSchoolIdx = appState.magicNodes.findIndex(n => n.label === oppLabel);
        }

        const desiredCCWRemainder = (alignSchoolIdx * 45) % 360;
        const currentCCWRemainder = mishapState.ccwAngle ? mishapState.ccwAngle % 360 : 0;
        const diff = desiredCCWRemainder - currentCCWRemainder;
        ccwAdd += (diff < 0 ? diff + 360 : diff);
      }

      if (d1 === d2) {
        // Axis Fracture: Align the actual activated Chaos Effect (d3 - 1) on top of the active school (d1 - 1)
        // Formula: visualEffectAngle = visualSchoolAngle
        // => (d3 - 1) * 45 + 22.5 + cwAngle = (d1 - 1) * 45 + 22.5 - ccwAngle
        // => cwAngle = -ccwAngle + (d1 - d3) * 45 (mod 360)
        const finalCCW = (mishapState.ccwAngle || 0) + ccwAdd;
        const targetCWAngle = -finalCCW + (d1 - d3) * 45;
        const desiredCWRemainder = ((targetCWAngle % 360) + 360) % 360;
        const currentCWRemainder = mishapState.cwAngle ? mishapState.cwAngle % 360 : 0;
        const diff = desiredCWRemainder - currentCWRemainder;
        cwAdd += (diff < 0 ? diff + 360 : diff);
      } else {
        if (appState.alignEffectToTop) {
          const desiredCWRemainder = (360 - (d2 - 1) * 45) % 360;
          const currentCWRemainder = mishapState.cwAngle ? mishapState.cwAngle % 360 : 0;
          const diff = desiredCWRemainder - currentCWRemainder;
          cwAdd += (diff < 0 ? diff + 360 : diff);
        }
      }

      const duration = appState.animationDuration || 2;
      const curve = appState.momentumCurve || 5;
      const easing = `cubic-bezier(0.1, ${0.1 * curve}, 0.1, 1)`;

      // 1. Update the cwAngle, ccwAngle, and pillsAngle in mishapState to the target landing positions
      mishapState.cwAngle = (mishapState.cwAngle || 0) + cwAdd;
      mishapState.ccwAngle = (mishapState.ccwAngle || 0) + ccwAdd;
      mishapState.pillsAngle = (mishapState.pillsAngle || 0) + pillsAdd;

      // 2. Pre-align all path shapes, radii, and text flips for the target landing positions
      if (mishapState.updatePaths) {
        mishapState.updatePaths();
      }

      // 3. Force browser reflow to commit layout changes before initiating CSS transition
      void spinCWGroup.offsetHeight;
      void spinCCWGroup.offsetHeight;
      if (spinPillsGroup) void spinPillsGroup.offsetHeight;

      // 4. Configure CSS transitions for GPU-accelerated smooth rotation
      spinCWGroup.style.transition = `transform ${duration}s ${easing}`;
      spinCCWGroup.style.transition = `transform ${duration}s ${easing}`;
      if (spinPillsGroup) {
        spinPillsGroup.style.transition = `transform ${duration}s ${easing}`;
      }

      // 5. Set target rotations to trigger the GPU-accelerated transition
      spinCWGroup.style.transform = `rotate(${mishapState.cwAngle}deg)`;
      spinCCWGroup.style.transform = `rotate(${-mishapState.ccwAngle}deg)`;
      if (spinPillsGroup) {
        spinPillsGroup.style.transform = `rotate(${mishapState.pillsAngle}deg)`;
      }

      // 6. Complete the roll after the transition finishes
      setTimeout(() => {
        mishapState.isRolling = false;
        const rollBtn = document.getElementById('btn-roll-mishap');
        const resetBtn = document.getElementById('btn-mishap-reset');
        if (rollBtn) {
          rollBtn.disabled = false;
          rollBtn.innerHTML = `<i class="gi gi-dice-eight-faces" style="font-size: 1.1rem; line-height: 1;"></i> Roll Mishap (2d8)`;
        }
        if (resetBtn) resetBtn.disabled = false;

        executeMishapRoll();
      }, duration * 1000);
    }
  } else {
    mishapState.isRolling = false;
    executeMishapRoll();
  }
}

function executeMishapRoll() {
  const resultsContainer = document.getElementById('mishap-results-container');
  const narrativeBox = document.getElementById('mishap-narrative');
  const gmGuideBox = document.getElementById('mishap-gm-guide');
  const detailsContent = document.getElementById('mishap-gm-details-content');
  const container = document.getElementById('target-mandala');
  if (container) container.classList.add('has-results');

  if (resultsContainer) resultsContainer.classList.remove('hidden');
  if (narrativeBox) narrativeBox.classList.remove('hidden');
  if (gmGuideBox) {
    gmGuideBox.classList.remove('hidden');
    gmGuideBox.removeAttribute('open'); // start collapsed by default
  }

  const d1 = mishapState.d1 || (Math.floor(Math.random() * 8) + 1); // Mishap School
  const d2 = mishapState.d2 || (Math.floor(Math.random() * 8) + 1); // Mishap Effect

  // Clear for next roll without animation
  mishapState.d1 = null;
  mishapState.d2 = null;

  const initialTier = mishapState.selectedTier;
  const castSchoolIdx = mishapState.selectedSchoolIdx;
  const castPolarity = mishapState.selectedPolarity;

  const getOppositeSchoolIdx = (idx) => {
    const oppLabel = appState.magicNodes[idx].opposite;
    return appState.magicNodes.findIndex(n => n.label === oppLabel);
  };

  const getInvertedPolarity = (pol) => pol === 'positive' ? 'negative' : 'positive';

  const formatSchool = (idx, pol) => {
    const node = appState.magicNodes[idx];
    const signText = pol === 'positive' ? '+' : '−';
    return `<span style="color: ${node.color}; font-weight: bold;">${node.label} (${signText})</span>`;
  };

  const getSchoolFlavor = (idx, pol) => {
    if (idx === 0) { // Thermal
      return pol === 'positive' ? 'kinetic ignition and flash-fire heat' : 'kinetic absolute zero and freezing cold';
    } else if (idx === 1) { // Aero
      return pol === 'positive' ? 'gale-force wind shockwaves' : 'suffocating vacuums';
    } else if (idx === 2) { // Electromagnetic
      return pol === 'positive' ? 'crackling lightning arcs' : 'current grounding and magic dead zones';
    } else if (idx === 3) { // Neural
      return pol === 'positive' ? 'cognitive logic pressure' : 'screaming sensory psychosis';
    } else if (idx === 4) { // Hydro
      return pol === 'positive' ? 'torrential flooding water pressure' : 'parched desiccation and rapid drying';
    } else if (idx === 5) { // Geo
      return pol === 'positive' ? 'heavy crushing bedrock accretion' : 'rust, dust decay, and structural collapse';
    } else if (idx === 6) { // Dimensional
      return pol === 'positive' ? 'chrono-acceleration aging' : 'chrono-stasis momentum freezing';
    } else if (idx === 7) { // Vital
      return pol === 'positive' ? 'uncontrolled cellular hyper-regeneration' : 'immediate necrosis and tissue decay';
    }
    return appState.magicNodes[idx].label;
  };

  const getEffectFlavor = (idx) => {
    const types = [
      'chaos + reroll manifestation',
      'an essence fracture redirection',
      'a spatial tear striking multiple targets',
      'a vector drift close-range shockwave',
      'a temporal rupture/magical interference',
      'materia snap environmental warping',
      'a cosmic debt lingering hazard field',
      'flesh corruption upon the caster'
    ];
    return types[idx] || 'mishap manifestation';
  };

  const getSuggestedSave = (idx) => {
    const saves = [
      'Constitution (vs. extreme temperature)',
      'Dexterity (vs. gale winds or void pull)',
      'Dexterity or Constitution (vs. shock/paralysis)',
      'Wisdom (vs. mental overload/psychic shock)',
      'Strength or Constitution (vs. pressure/dehydration)',
      'Dexterity or Strength (vs. stone shards/decay)',
      'Wisdom or Constitution (vs. temporal shift/rapid aging)',
      'Constitution (vs. cellular necrosis/mutation)'
    ];
    return saves[idx] || 'Constitution';
  };

  const getDamageType = (idx, pol) => {
    const types = [
      pol === 'positive' ? 'Fire/Heat' : 'Cold',
      pol === 'positive' ? 'Bludgeoning Wind' : 'Suffocating/Force',
      pol === 'positive' ? 'Lightning/Electric' : 'Mana Grounding',
      pol === 'positive' ? 'Psychic' : 'Psychic (Madness)',
      pol === 'positive' ? 'Water/Pressure' : 'Desiccation/Dehydration',
      pol === 'positive' ? 'Crushing Earth' : 'Erosion/Decay',
      pol === 'positive' ? 'Chrono-Decay/Force' : 'Temporal Stasis',
      pol === 'positive' ? 'Growth Mutation' : 'Necrotic'
    ];
    return types[idx] || 'Magical';
  };

  const getEffectRuling = (idx, tierIdx, modifier) => {
    const tierClamped = Math.max(0, Math.min(appState.scaledTiers.length - 1, tierIdx));
    const tier = appState.scaledTiers[tierClamped];
    if (tier && tier.nodes && tier.nodes[idx] && tier.nodes[idx].ruling) {
      return tier.nodes[idx].ruling;
    }
    return `<li><strong>Catastrophic Complication:</strong> Apply the custom effect <em>${modifier}</em> to the scene.</li>`;
  };

  const diceList = [];
  if (d1 === d2) {
    diceList.push({ label: 'Axis', value: d1, exploded: false });
    diceList.push({ label: 'Axis', value: d2, exploded: false });
  } else {
    diceList.push({ label: 'School', value: d1, exploded: false });
    diceList.push({ label: 'Effect', value: d2, exploded: false });
  }

  let narrativeHtml = ``;
  let gmGuideHtml = '';

  if (d1 === d2) {
    // AXIS FRACTURE (Doubles)
    if (gmGuideBox) gmGuideBox.className = 'mishap-gm-details axis-fracture';
    narrativeHtml += `<div class="axis-fracture-badge" style="margin-bottom: 0.5rem;">⚠️ AXIS FRACTURE ⚠️</div>`;

    let currentTier = initialTier + 1;
    const rolledSliceIdx = d1 - 1;
    const rolledSliceOppIdx = getOppositeSchoolIdx(rolledSliceIdx);

    narrativeHtml += `<p>School: ${formatSchool(rolledSliceIdx, 'positive')} + ${formatSchool(rolledSliceOppIdx, 'negative')}</p>`;
    narrativeHtml += `<p><em>(Roll ${d1}): Axis Fracture (Doubles)</em></p>`;

    let d3;
    let effectDiceBonus = 0;
    let effectDcBonus = 0;
    let chaosLog = '';

    if (mishapState.d3 !== undefined && mishapState.d3 !== null) {
      d3 = mishapState.d3;
      effectDiceBonus = mishapState.preEffectDiceBonus || 0;
      effectDcBonus = mishapState.preEffectDcBonus || 0;
      chaosLog = mishapState.preChaosLog || `Rolled ${d3}`;
      currentTier = mishapState.preCurrentTier || currentTier;

      if (mishapState.preExplodedDice) {
        mishapState.preExplodedDice.forEach(val => {
          diceList.push({ label: 'Resonance', value: val, exploded: true });
        });
      }

      mishapState.d3 = null;
      mishapState.preExplodedDice = null;
      mishapState.preCurrentTier = null;
      mishapState.preEffectDiceBonus = null;
      mishapState.preEffectDcBonus = null;
      mishapState.preChaosLog = null;
    } else {
      d3 = Math.floor(Math.random() * 8) + 1;
      chaosLog = `Rolled ${d3}`;
      while (d3 === d1) {
        diceList.push({ label: 'Resonance', value: d3, exploded: true });
        if (currentTier < 5) {
          currentTier++;
          chaosLog += ` &rarr; 💥 Resonance! Escalated to T${currentTier}. Re-rolling`;
        } else {
          effectDiceBonus++;
          effectDcBonus += 2;
          chaosLog += ` &rarr; 💥 Overload! DC+2, Dice+1. Re-rolling`;
        }
        d3 = Math.floor(Math.random() * 8) + 1;
        chaosLog += ` [New: ${d3}]`;
      }
    }

    // Settled Chaos Die
    diceList.push({ label: 'Chaos Effect', value: d3, exploded: false });

    const finalSliceIdx = d3 - 1;
    const finalOppSliceIdx = getOppositeSchoolIdx(finalSliceIdx);
    const finalTierClamp = Math.min(currentTier, 5);

    const nodeA = appState.scaledTiers[finalTierClamp].nodes[finalSliceIdx];
    const nodeB = appState.scaledTiers[finalTierClamp].nodes[finalOppSliceIdx];
    const baseNode = appState.scaledTiers[finalTierClamp].nodes[0];
    const baseDc = (baseNode.dc || 'DC11').replace(/\s+/g, '');
    const baseDice = baseNode.dice || '1d6';

    narrativeHtml += `<p style="margin-top: 0.6rem;">Effect: <strong>${nodeA.type}: ${nodeA.modifier}</strong> + <strong>${nodeB.type}: ${nodeB.modifier}</strong></p>`;
    narrativeHtml += `<p><em>(Roll ${d3}): Chaos Die (${chaosLog.replace(/&rarr;/g, '→')})</em></p>`;

    let baseDcVal = 9 + finalTierClamp * 2;
    if (baseDc.startsWith("DC")) {
      baseDcVal = parseInt(baseDc.replace("DC", ""), 10);
    }
    const finalDcVal = baseDcVal + effectDcBonus;
    const finalDcStr = `DC${finalDcVal}`;

    let finalDiceStr = baseDice;
    if (effectDiceBonus > 0) {
      finalDiceStr = `${baseDice} + ${effectDiceBonus} instance(s)`;
    }
    narrativeHtml += `<p style="margin-top: 0.6rem; font-size: 0.95rem; font-weight: bold; color: #ef4444;">Escalated: T${currentTier} (${finalDcStr} • ${finalDiceStr})</p>`;

    // Sync mishapState displayed tier with the new escalated tier (do not affect selected casting tier)
    mishapState.displayedTier = finalTierClamp;

    // Re-render the mandala so the correct overlay pill is selected
    renderScaledMandala();

    // Re-add has-results to the container (since renderScaledMandala replaces innerHTML)
    const container = document.getElementById('target-mandala');
    if (container) container.classList.add('has-results');

    // Highlight schools and effects at the final tier
    highlightMandalaElements(rolledSliceIdx, finalTierClamp, false, 'positive');
    highlightMandalaElements(rolledSliceOppIdx, finalTierClamp, false, 'negative');
    highlightMandalaElements(finalSliceIdx, finalTierClamp, true);
    highlightMandalaElements(finalOppSliceIdx, finalTierClamp, true);

    // OSR Guide Output
    const schoolFlavorA = getSchoolFlavor(rolledSliceIdx, 'positive');
    const schoolFlavorB = getSchoolFlavor(rolledSliceOppIdx, 'negative');

    gmGuideHtml = `
      <div class="gm-guide-section">
        <span class="gm-guide-title">Fiction</span>
        <div class="gm-guide-content gm-fiction-prompt">
          "The cosmic circuit shatters under a catastrophic collision of opposing forces! Eruptions of <strong>${schoolFlavorA}</strong> and <strong>${schoolFlavorB}</strong> clash violently, tearing reality with both <strong>${getEffectFlavor(finalSliceIdx)}</strong> and <strong>${getEffectFlavor(finalOppSliceIdx)}</strong>."
        </div>
      </div>

      <div class="gm-guide-section">
        <span class="gm-guide-title">Mechanics</span>
        <div class="gm-guide-content">
          <ul>
            <li><strong>Saves:</strong> Target makes a <strong>${getSuggestedSave(rolledSliceIdx)} Save</strong> OR a <strong>${getSuggestedSave(rolledSliceOppIdx)} Save</strong> at <strong>${finalDcStr}</strong>.</li>
            <li><strong>Damage:</strong> Inflict <strong>${finalDiceStr} ${getDamageType(rolledSliceIdx, 'positive')} damage</strong> AND <strong>${finalDiceStr} ${getDamageType(rolledSliceOppIdx, 'negative')} damage</strong>.</li>
            <li><strong>Shape A — ${nodeA.type} (${nodeA.modifier}):</strong>
              <ul>
                ${getEffectRuling(finalSliceIdx, finalTierClamp, nodeA.modifier)}
              </ul>
            </li>
            <li><strong>Shape B — ${nodeB.type} (${nodeB.modifier}):</strong>
              <ul>
                ${getEffectRuling(finalOppSliceIdx, finalTierClamp, nodeB.modifier)}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    `;

  } else {
    // STANDARD ROLL
    if (gmGuideBox) gmGuideBox.className = 'mishap-gm-details';
    let resultSchoolIdx = castSchoolIdx;
    let resultPolarity = castPolarity;
    let secondarySchoolIdx = null;
    let secondaryPolarity = null;
    let rollTypeStr = "";

    if (d1 >= 6) {
      rollTypeStr = "Cast school (same polarity)";
      resultSchoolIdx = castSchoolIdx;
      resultPolarity = castPolarity;
    } else if (d1 >= 4) {
      rollTypeStr = "Cast school (inverted polarity)";
      resultSchoolIdx = castSchoolIdx;
      resultPolarity = getInvertedPolarity(castPolarity);
    } else if (d1 === 3) {
      rollTypeStr = "Circle-opposite School (positive)";
      resultSchoolIdx = getOppositeSchoolIdx(castSchoolIdx);
      resultPolarity = 'positive';
    } else if (d1 === 2) {
      rollTypeStr = "Circle-opposite School (negative)";
      resultSchoolIdx = getOppositeSchoolIdx(castSchoolIdx);
      resultPolarity = 'negative';
    } else if (d1 === 1) {
      rollTypeStr = "Cast school (same) + Random school (inverted)";
      resultSchoolIdx = castSchoolIdx;
      resultPolarity = castPolarity;

      secondarySchoolIdx = Math.floor(Math.random() * 8);
      secondaryPolarity = getInvertedPolarity(castPolarity);

      // Roll random secondary school die and push to diceList
      diceList.push({ label: 'Random', value: secondarySchoolIdx + 1, exploded: false });
    }

    if (secondarySchoolIdx !== null) {
      narrativeHtml += `<p>School: ${formatSchool(resultSchoolIdx, resultPolarity)} + ${formatSchool(secondarySchoolIdx, secondaryPolarity)}</p>`;
    } else {
      narrativeHtml += `<p>School: ${formatSchool(resultSchoolIdx, resultPolarity)}</p>`;
    }
    narrativeHtml += `<p><em>(Roll ${d1}): ${rollTypeStr}</em></p>`;
    highlightMandalaElements(resultSchoolIdx, initialTier, false, resultPolarity);
    if (secondarySchoolIdx !== null) {
      highlightMandalaElements(secondarySchoolIdx, initialTier, false, secondaryPolarity);
    }

    const effectSliceIdx = d2 - 1;
    const effectNode = appState.scaledTiers[initialTier].nodes[effectSliceIdx];
    const modifier = effectNode.modifier;
    const effectType = effectNode.type;
    const baseNode = appState.scaledTiers[initialTier].nodes[0];
    const dcStr = (baseNode.dc || `DC${9 + initialTier * 2}`).replace(/\s+/g, '');
    const diceStr = baseNode.dice || `1d${4 + initialTier * 2}`;

    narrativeHtml += `<p style="margin-top: 0.6rem;">Effect: <strong>${effectType}: ${modifier}</strong></p>`;
    narrativeHtml += `<p><em>(Roll ${d2}): T${initialTier} Slice ${d2} (${dcStr} • ${diceStr})</em></p>`;
    highlightMandalaElements(effectSliceIdx, initialTier, true);

    // OSR Guide Output
    const schoolFlavorA = getSchoolFlavor(resultSchoolIdx, resultPolarity);
    const effectFlavor = getEffectFlavor(effectSliceIdx);

    let fictionText = `The local magical field buckles as a surge of <strong>${schoolFlavorA}</strong> manifests as <strong>${effectFlavor}</strong>.`;
    if (secondarySchoolIdx !== null) {
      const schoolFlavorB = getSchoolFlavor(secondarySchoolIdx, secondaryPolarity);
      fictionText = `The local magical field splits as a dual surge of <strong>${schoolFlavorA}</strong> and <strong>${schoolFlavorB}</strong> manifests as <strong>${effectFlavor}</strong>.`;
    }

    let mechanicsHtml = `
      <ul>
        <li><strong>Save:</strong> Target makes a <strong>${getSuggestedSave(resultSchoolIdx)} Save</strong> (${dcStr}).</li>
    `;
    if (secondarySchoolIdx !== null) {
      mechanicsHtml += `
        <li><strong>Secondary Save:</strong> Targets also make a <strong>${getSuggestedSave(secondarySchoolIdx)} Save</strong> (${dcStr}).</li>
      `;
    }

    if (diceStr !== '—') {
      let dmgTypes = getDamageType(resultSchoolIdx, resultPolarity);
      if (secondarySchoolIdx !== null) {
        dmgTypes += ` and ${getDamageType(secondarySchoolIdx, secondaryPolarity)}`;
      }
      mechanicsHtml += `
        <li><strong>Damage:</strong> Inflict <strong>${diceStr} ${dmgTypes} damage</strong> (half on success).</li>
      `;
    }

    mechanicsHtml += `
        <li><strong>Complication — ${effectType} (${modifier}):</strong>
          <ul>
            ${getEffectRuling(effectSliceIdx, initialTier, modifier)}
          </ul>
        </li>
      </ul>
    `;

    gmGuideHtml = `
      <div class="gm-guide-section">
        <span class="gm-guide-title">Fiction</span>
        <div class="gm-guide-content gm-fiction-prompt">
          "${fictionText}"
        </div>
      </div>

      <div class="gm-guide-section">
        <span class="gm-guide-title">Mechanics</span>
        <div class="gm-guide-content">
          ${mechanicsHtml}
        </div>
      </div>
    `;
  }

  narrativeBox.innerHTML = narrativeHtml;
  if (detailsContent) detailsContent.innerHTML = gmGuideHtml;

  // Dynamically render the dice box
  const diceBox = document.getElementById('mishap-dice-box');
  if (diceBox) {
    diceBox.innerHTML = '';
    diceList.forEach(die => {
      const container = document.createElement('div');
      container.className = 'mishap-die-container die-rolled';

      const label = document.createElement('span');
      label.className = 'die-label';
      label.textContent = die.label;
      container.appendChild(label);

      const dieEl = document.createElement('div');
      dieEl.className = 'mishap-die' + (die.exploded ? ' exploded' : '');

      const val = document.createElement('span');
      val.className = 'die-val';
      val.textContent = die.value;

      dieEl.appendChild(val);
      container.appendChild(dieEl);
      diceBox.appendChild(container);

      // Trigger reflow to play animation on insertion
      void dieEl.offsetWidth;
    });
  }
}

init();
