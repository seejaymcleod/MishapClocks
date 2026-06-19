// State
let appState = {
  viewMode: 'curved-axis',
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
  magicNodes: [
    { id: 'm0', label: 'Thermal', icon: 'gi-fire', negativeIcon: 'gi-snowflake-1', color: '#ff4500', opposite: 'Hydro', slider: 'Injecting kinetic heat (ignition) ↔ siphoning it (absolute zero).' },
    { id: 'm1', label: 'Aero', icon: 'gi-tornado', negativeIcon: 'gi-sound-off', color: '#87ceeb', opposite: 'Geo', slider: 'High pressure and gales ↔ suffocating vacuums.' },
    { id: 'm2', label: 'Electro', icon: 'gi-lightning-trio', negativeIcon: 'gi-eclipse', color: '#ffd700', opposite: 'Dimensional', slider: 'Spiking electrical/magnetic currents ↔ grounding them into dead zones.' },
    { id: 'm3', label: 'Neural', icon: 'gi-brain', negativeIcon: 'gi-screaming', color: '#ff69b4', opposite: 'Vital', slider: 'Structuring logic and perception ↔ shattering the psyche into madness.' },
    { id: 'm4', label: 'Hydro', icon: 'gi-water-drop', negativeIcon: 'gi-desert', color: '#1e90ff', opposite: 'Thermal', slider: 'Flooding and fluidity ↔ severe desiccation and drought.' },
    { id: 'm5', label: 'Geo', icon: 'gi-stone-block', negativeIcon: 'gi-broken-wall', color: '#8b4513', opposite: 'Aero', slider: 'Density, metal, and bedrock ↔ rust, erosion, and dust.' },
    { id: 'm6', label: 'Dimensional', icon: 'gi-portal', negativeIcon: 'gi-hourglass', color: '#8a2be2', opposite: 'Electro', slider: 'Accelerating chronological flow ↔ halting momentum into stasis.' },
    { id: 'm7', label: 'Vital', icon: 'gi-health-normal', negativeIcon: 'gi-poison', color: '#32cd32', opposite: 'Neural', slider: 'Rapid cellular growth and healing ↔ necrosis, atrophy, and decay.' },
  ],
  targetNodes: [
    { id: 't0', label: 'Self @ Close', color: '#e2e8f0' },
    { id: 't1', label: 'Self @ Near', color: '#cbd5e1' },
    { id: 't2', label: 'Self @ Far', color: '#94a3b8' },
    { id: 't3', label: 'Ally @ Close', color: '#86efac' },
    { id: 't4', label: 'Ally @ Near', color: '#4ade80' },
    { id: 't5', label: 'Ally @ Far', color: '#22c55e' },
    { id: 't6', label: 'Enemy @ Close', color: '#fca5a5' },
    { id: 't7', label: 'Enemy @ Near', color: '#f87171' },
    { id: 't8', label: 'Enemy @ Far', color: '#ef4444' },
    { id: 't9', label: 'All @ Close', color: '#fde047' },
    { id: 't10', label: 'All @ Near', color: '#facc15' },
    { id: 't11', label: 'All @ Far', color: '#eab308' },
  ],
  scaledTiers: [
    {
      offset: 0, nodes: [
        { type: 'Self-Harm', modifier: 'Singe', dc: 'DC 9', dice: '1d4' },
        { type: 'Mistarget', modifier: 'Glancing Veer' },
        { type: 'Multi-Target', modifier: 'Dual Fork' },
        { type: 'Close Range', modifier: 'Proximal Buzz' },
        { type: 'Anti-School', modifier: 'Minor Damp' },
        { type: 'Alter Environment', modifier: 'Surface Tilt' },
        { type: 'Zone', modifier: 'Minor Ripple' },
        { type: 'Materia Leak', modifier: 'Ether Drip' }
      ]
    },
    {
      offset: 0, nodes: [
        { type: 'Self-Harm', modifier: 'Blister', dc: 'DC 11', dice: '1d6' },
        { type: 'Mistarget', modifier: 'Wide Yaw' },
        { type: 'Multi-Target', modifier: 'Triple Cleave' },
        { type: 'Close Range', modifier: 'Aura Cling' },
        { type: 'Anti-School', modifier: 'Ward Tear' },
        { type: 'Alter Environment', modifier: 'Ground Shake' },
        { type: 'Zone', modifier: 'Static Field' },
        { type: 'Materia Leak', modifier: 'Mana Bleed' }
      ]
    },
    {
      offset: 0, nodes: [
        { type: 'Self-Harm', modifier: 'Searing Flash', dc: 'DC 13', dice: '2d6' },
        { type: 'Mistarget', modifier: 'Stray Vector' },
        { type: 'Multi-Target', modifier: 'Quad Splinter' },
        { type: 'Close Range', modifier: 'Tactile Shock' },
        { type: 'Anti-School', modifier: 'Spell Dissolve' },
        { type: 'Alter Environment', modifier: 'Terrain Warp' },
        { type: 'Zone', modifier: 'Vortex Pull' },
        { type: 'Materia Leak', modifier: 'Essence Drain' }
      ]
    },
    {
      offset: 0, nodes: [
        { type: 'Self-Harm', modifier: 'Searing Wave', dc: 'DC 15', dice: '3d6' },
        { type: 'Mistarget', modifier: 'Inverse Arc' },
        { type: 'Multi-Target', modifier: 'Chain Cascade' },
        { type: 'Close Range', modifier: 'Melee Bind' },
        { type: 'Anti-School', modifier: 'Inverse Surge' },
        { type: 'Alter Environment', modifier: 'Flora Spasm' },
        { type: 'Zone', modifier: 'Gravity Well' },
        { type: 'Materia Leak', modifier: 'Spell Fracture' }
      ]
    },
    {
      offset: 0, nodes: [
        { type: 'Self-Harm', modifier: 'Meltdown', dc: 'DC 17', dice: '4d8' },
        { type: 'Mistarget', modifier: 'Mirror Target' },
        { type: 'Multi-Target', modifier: 'Omnipresence' },
        { type: 'Close Range', modifier: 'Point-Blank' },
        { type: 'Anti-School', modifier: 'School Nullify' },
        { type: 'Alter Environment', modifier: 'Weather Flare' },
        { type: 'Zone', modifier: 'Time Warp' },
        { type: 'Materia Leak', modifier: 'Conduit Rupture' }
      ]
    },
    {
      offset: 0, nodes: [
        { type: 'Self-Harm', modifier: 'Inferno Rupture', dc: 'DC 19', dice: '5d8' },
        { type: 'Mistarget', modifier: 'Chaos Drift' },
        { type: 'Multi-Target', modifier: 'Cataclysmic Split' },
        { type: 'Close Range', modifier: 'Absolute Proximity' },
        { type: 'Anti-School', modifier: 'Antimagic Collapse' },
        { type: 'Alter Environment', modifier: 'Planar Rupture' },
        { type: 'Zone', modifier: 'Singularity' },
        { type: 'Materia Leak', modifier: 'Void Siphon' }
      ]
    }
  ]
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

function renderSidebarTables() {
  const tbody = document.getElementById('tier-parameters-tbody');
  if (!tbody) return;
  tbody.innerHTML = '';

  appState.scaledTiers.forEach((tier, tIdx) => {
    const firstNode = tier.nodes[0] || {};
    const dc = firstNode.dc || '—';
    const dice = firstNode.dice || '—';

    const labelText = (appState.viewMode === 'clean-bottom' || appState.viewMode === 'bottom-dice') ? `T${tIdx}` : `Tier${tIdx}`;
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${labelText}</strong></td>
      <td>${dc}</td>
      <td>${dice}</td>
    `;
    tbody.appendChild(tr);
  });
}

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
      const centerAngle = i * angleStep;
      const startAngle = centerAngle - angleStep / 2;
      const endAngle = centerAngle + angleStep / 2;
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

      path.addEventListener('click', () => openModal(school, 'magic'));

      svg.appendChild(path);

      // Add text label
      const isThermalSlice = (i === 0);
      const hideModText = isThermalSlice;
      const modText = (tIndex === 0 || hideModText) ? '' : (node.modifier || node.dc || '—');
      const textRadius = innerR + ringWidth * 0.5;

      if (modText) {
        if (['curved-axis', 'horizontal-hud', 'radial-vector', 'minimal-rune', 'curved-text'].includes(appState.viewMode)) {
          // Render curved text for school i, tier tIndex
          let pathData;
          const isBottomHalf = (centerAngle > 90 && centerAngle < 270);
          if (isBottomHalf) {
            const pathStart = polarToCartesian(cx, cy, textRadius, endAngle);
            const pathEnd = polarToCartesian(cx, cy, textRadius, startAngle);
            pathData = [
              "M", pathStart.x, pathStart.y,
              "A", textRadius, textRadius, 0, 0, 0, pathEnd.x, pathEnd.y
            ].join(" ");
          } else {
            const pathStart = polarToCartesian(cx, cy, textRadius, startAngle);
            const pathEnd = polarToCartesian(cx, cy, textRadius, endAngle);
            pathData = [
              "M", pathStart.x, pathStart.y,
              "A", textRadius, textRadius, 0, 0, 1, pathEnd.x, pathEnd.y
            ].join(" ");
          }

          const pathId = `curved-path-${tIndex}-${i}`;
          const defsPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
          defsPath.setAttribute("id", pathId);
          defsPath.setAttribute("d", pathData);
          defsPath.setAttribute("fill", "none");
          svg.appendChild(defsPath);

          const textEl = document.createElementNS("http://www.w3.org/2000/svg", "text");
          textEl.setAttribute("class", "scaled-text effect-name-text");
          textEl.setAttribute("fill", "#ffffff");

          const arcLength = textRadius * (angleStep * Math.PI / 180);
          const maxChars = modText.length || 1;
          const targetWidth = arcLength * 0.85;
          const fontSize = Math.min(75, targetWidth / (maxChars * 0.50)); // Increased limit and font scaling

          textEl.setAttribute("font-size", `${fontSize}px`);
          textEl.setAttribute("font-weight", "bold");
          textEl.style.pointerEvents = "none";

          const textPath = document.createElementNS("http://www.w3.org/2000/svg", "textPath");
          textPath.setAttribute("href", `#${pathId}`);
          textPath.setAttribute("startOffset", "50%");
          textPath.setAttribute("text-anchor", "middle");
          textPath.textContent = modText;

          textEl.appendChild(textPath);
          svg.appendChild(textEl);
        } else {
          // Draw standard straight text (original code)
          const textPos = polarToCartesian(cx, cy, textRadius, centerAngle);
          const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
          text.setAttribute("x", textPos.x);
          text.setAttribute("y", textPos.y);
          text.setAttribute("class", "scaled-text effect-name-text");
          text.style.pointerEvents = "none";

          let rot = centerAngle;
          if (rot > 90 && rot < 270) {
            rot += 180;
          }
          text.setAttribute("transform", `rotate(${rot}, ${textPos.x}, ${textPos.y})`);
          text.setAttribute("fill", "#ffffff");
          text.setAttribute("text-anchor", "middle");
          text.setAttribute("dominant-baseline", "middle");

          // Dynamic Font Size to prevent boundary overlap in inner tiers
          const arcLength = textRadius * (angleStep * Math.PI / 180);
          const maxChars = modText.length || 1;
          const targetWidth = arcLength * 0.85; // 85% safety margin
          const fontSize = Math.min(56, targetWidth / (maxChars * 0.55));

          text.setAttribute("font-size", `${fontSize}px`);
          text.setAttribute("font-weight", "600");
          text.textContent = modText;
          svg.appendChild(text);
        }
      }
    });

    // Tier Label
    const firstNode = tierData.nodes[0] || {};
    const diceText = firstNode.dice || '—';
    const dcText = firstNode.dc || '—';

    let R_label;
    let labelText;
    const showDiceDc = appState.viewMode === 'full' || appState.viewMode === 'bottom-dice';
    const hasStandardLabel = ['full', 'clean-top', 'clean-bottom', 'bottom-dice'].includes(appState.viewMode);

    if (hasStandardLabel) {
      if (appState.viewMode === 'clean-bottom' || appState.viewMode === 'bottom-dice') {
        R_label = innerR + 45;
        labelText = "T" + tIndex;
      } else if (appState.viewMode === 'clean-top') {
        R_label = outerR - 45;
        labelText = "Tier" + tIndex;
      } else {
        // Default / Full View
        R_label = tIndex === 0 ? (innerR + ringWidth * 0.5) : (outerR - 45);
        labelText = "Tier" + tIndex;
      }

      // R_dice_dc is always at the top line of the ring (outerR - 45) for all tiers, including T0
      const R_dice_dc = outerR - 45;

      const paddingPixels = 80;
      const anglePadding = (paddingPixels / R_dice_dc) * (180 / Math.PI);
      const angleOffset = Math.max(10, 22.5 - anglePadding);

      // Center TX label
      const posC = polarToCartesian(cx, cy, R_label, 0);
      const tierText = document.createElementNS("http://www.w3.org/2000/svg", "text");
      tierText.setAttribute("x", posC.x);
      tierText.setAttribute("y", posC.y);
      tierText.textContent = labelText;
      tierText.setAttribute("fill", "#ffffff");
      tierText.setAttribute("opacity", "0.5");
      tierText.setAttribute("font-size", "50px");
      tierText.setAttribute("font-weight", "bold");
      tierText.setAttribute("text-anchor", "middle");
      tierText.style.pointerEvents = "none";
      svg.appendChild(tierText);

      if (showDiceDc) {
        // Dice (xdy) on the left side of the pie (rotated to curve along the circle)
        const posL = polarToCartesian(cx, cy, R_dice_dc, -angleOffset);
        const diceTextEl = document.createElementNS("http://www.w3.org/2000/svg", "text");
        diceTextEl.setAttribute("x", posL.x);
        diceTextEl.setAttribute("y", posL.y);
        diceTextEl.textContent = diceText;
        diceTextEl.setAttribute("fill", "#ffffff");
        diceTextEl.setAttribute("opacity", "0.5");
        diceTextEl.setAttribute("font-size", "45px");
        diceTextEl.setAttribute("font-weight", "bold");
        diceTextEl.setAttribute("text-anchor", "middle");
        diceTextEl.setAttribute("transform", `rotate(${-angleOffset}, ${posL.x}, ${posL.y})`);
        diceTextEl.style.pointerEvents = "none";
        svg.appendChild(diceTextEl);

        // DC on the right side of the pie (rotated to curve along the circle)
        const posR = polarToCartesian(cx, cy, R_dice_dc, angleOffset);
        const dcTextEl = document.createElementNS("http://www.w3.org/2000/svg", "text");
        dcTextEl.setAttribute("x", posR.x);
        dcTextEl.setAttribute("y", posR.y);
        dcTextEl.textContent = dcText;
        dcTextEl.setAttribute("fill", "#ffffff");
        dcTextEl.setAttribute("opacity", "0.5");
        dcTextEl.setAttribute("font-size", "45px");
        dcTextEl.setAttribute("font-weight", "bold");
        dcTextEl.setAttribute("text-anchor", "middle");
        dcTextEl.setAttribute("transform", `rotate(${angleOffset}, ${posR.x}, ${posR.y})`);
        dcTextEl.style.pointerEvents = "none";
        svg.appendChild(dcTextEl);
      }
    } else {
      // Rendering logic for the 3 experimental print-friendly modes:
      if (appState.viewMode === 'radial-axis') {
        const axisAngle = -22.5;

        // Draw divider line at -22.5 degrees as the gauge axis
        const axisStart = polarToCartesian(cx, cy, innerR, axisAngle);
        const axisEnd = polarToCartesian(cx, cy, outerR, axisAngle);

        const axisLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
        axisLine.setAttribute("x1", axisStart.x);
        axisLine.setAttribute("y1", axisStart.y);
        axisLine.setAttribute("x2", axisEnd.x);
        axisLine.setAttribute("y2", axisEnd.y);
        axisLine.setAttribute("stroke", "rgba(255, 255, 255, 0.4)");
        axisLine.setAttribute("stroke-width", "6");
        svg.appendChild(axisLine);

        // Perpendicular tick line at outerR
        const tickStart = polarToCartesian(cx, cy, outerR, axisAngle - 2.5);
        const tickEnd = polarToCartesian(cx, cy, outerR, axisAngle + 2.5);
        const tickLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
        tickLine.setAttribute("x1", tickStart.x);
        tickLine.setAttribute("y1", tickStart.y);
        tickLine.setAttribute("x2", tickEnd.x);
        tickLine.setAttribute("y2", tickEnd.y);
        tickLine.setAttribute("stroke", "rgba(255, 255, 255, 0.6)");
        tickLine.setAttribute("stroke-width", "6");
        svg.appendChild(tickLine);

        if (tIndex === 0) {
          const innerTickStart = polarToCartesian(cx, cy, innerR, axisAngle - 2.5);
          const innerTickEnd = polarToCartesian(cx, cy, innerR, axisAngle + 2.5);
          const innerTickLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
          innerTickLine.setAttribute("x1", innerTickStart.x);
          innerTickLine.setAttribute("y1", innerTickStart.y);
          innerTickLine.setAttribute("x2", innerTickEnd.x);
          innerTickLine.setAttribute("y2", innerTickEnd.y);
          innerTickLine.setAttribute("stroke", "rgba(255, 255, 255, 0.6)");
          innerTickLine.setAttribute("stroke-width", "6");
          svg.appendChild(innerTickLine);
        }

        // Text label placed along the axis (slightly offset to the right of the divider line)
        const textAngle = axisAngle + 3.5;
        const textR = innerR + ringWidth * 0.5;
        const textPos = polarToCartesian(cx, cy, textR, textAngle);

        const textEl = document.createElementNS("http://www.w3.org/2000/svg", "text");
        textEl.setAttribute("x", textPos.x);
        textEl.setAttribute("y", textPos.y);
        textEl.textContent = `T${tIndex} [${dcText} • ${diceText}]`;
        textEl.setAttribute("fill", "#fbbf24");
        textEl.setAttribute("font-size", "45px");
        textEl.setAttribute("font-weight", "bold");
        textEl.setAttribute("text-anchor", "start");
        textEl.setAttribute("dominant-baseline", "middle");

        let rot = textAngle;
        if (rot > 90 && rot < 270) {
          rot += 180;
        }
        textEl.setAttribute("transform", `rotate(${rot}, ${textPos.x}, ${textPos.y})`);
        textEl.style.pointerEvents = "none";
        svg.appendChild(textEl);

      } else if (appState.viewMode === 'stacked-pill') {
        const textR = innerR + ringWidth * 0.5;
        const posC = polarToCartesian(cx, cy, textR, 0);
        const modifierText = firstNode.modifier || '—';

        // Pill rect
        const w = 480;
        const h = 150;
        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("x", posC.x - w / 2);
        rect.setAttribute("y", posC.y - h / 2);
        rect.setAttribute("width", w);
        rect.setAttribute("height", h);
        rect.setAttribute("rx", "25");
        rect.setAttribute("ry", "25");
        rect.setAttribute("fill", "rgba(17, 24, 39, 0.9)");
        rect.setAttribute("stroke", "rgba(251, 191, 36, 0.5)");
        rect.setAttribute("stroke-width", "5");
        rect.style.pointerEvents = "none";
        svg.appendChild(rect);

        // Top text: T0: Singe / T1: Blister
        const textTop = document.createElementNS("http://www.w3.org/2000/svg", "text");
        textTop.setAttribute("x", posC.x);
        textTop.setAttribute("y", posC.y - 18);
        textTop.textContent = `T${tIndex}: ${modifierText}`;
        textTop.setAttribute("fill", "#ffffff");
        textTop.setAttribute("font-size", "42px");
        textTop.setAttribute("font-weight", "bold");
        textTop.setAttribute("text-anchor", "middle");
        textTop.style.pointerEvents = "none";
        svg.appendChild(textTop);

        // Bottom text: DC X • YdZ
        const textBottom = document.createElementNS("http://www.w3.org/2000/svg", "text");
        textBottom.setAttribute("x", posC.x);
        textBottom.setAttribute("y", posC.y + 35);
        textBottom.textContent = `${dcText} • ${diceText}`;
        textBottom.setAttribute("fill", "#fbbf24");
        textBottom.setAttribute("font-size", "34px");
        textBottom.setAttribute("font-weight", "bold");
        textBottom.setAttribute("text-anchor", "middle");
        textBottom.style.pointerEvents = "none";
      } else if (['curved-axis', 'horizontal-hud', 'radial-vector', 'minimal-rune', 'curved-text'].includes(appState.viewMode)) {
        const getDynamicFontSize = (text, radius) => {
          const arcLength = radius * (angleStep * Math.PI / 180);
          const maxChars = text.length || 1;
          const targetWidth = arcLength * 0.85;
          return Math.min(75, targetWidth / (maxChars * 0.50)); // Increased limit and font scaling
        };

        const pathRadius = innerR + ringWidth * 0.5;
        const modifierText = firstNode.modifier || '—';

        const createCurvedLine = (id, radius, textContent, color, fontSize, customClass = "scaled-text") => {
          const pathStart = polarToCartesian(cx, cy, radius, -22.5);
          const pathEnd = polarToCartesian(cx, cy, radius, 22.5);
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
          // T0: Curved stacked text with 2 rows (Singe effect name removed)
          const rRow1 = pathRadius + 35;
          const rRow2 = pathRadius - 35;

          // Row 1: dice   DC (standard size 45px, 3 spaces, drop shadow)
          createCurvedLine(`curved-path-${tIndex}-r1`, rRow1, `${diceText}   ${dcText}`, "#fbbf24", 45, "scaled-text");

          // Row 2: T0 (has the same size as T1-T5 tier labels, i.e., 56px)
          createCurvedLine(`curved-path-${tIndex}-r2`, rRow2, "T0", "rgba(255, 255, 255, 0.7)", 56, "scaled-text tier-label-text");
        } else {
          // T1-T5: Curved stacked text (3 separate rows/radii)
          // Radii for the three lines (spaced by 70px and 70px)
          const rRow1 = pathRadius + 65;
          const rRow2 = pathRadius - 10;
          const rRow3 = pathRadius - 85;

          const calculatedFontSize = getDynamicFontSize(modifierText, rRow1);

          // Row 1: Effect Name (Montserrat/Small-Caps, size: calculated + 2)
          createCurvedLine(`curved-path-${tIndex}-r1`, rRow1, modifierText, "#ffffff", calculatedFontSize + 2, "scaled-text effect-name-text");
          // Row 2: dice   DC (standard size 45px, 3 spaces, drop shadow)
          createCurvedLine(`curved-path-${tIndex}-r2`, rRow2, `${diceText}   ${dcText}`, "#fbbf24", 45, "scaled-text");
          // Row 3: TX (size: 56px, drop shadow, Montserrat/Small-Caps)
          createCurvedLine(`curved-path-${tIndex}-r3`, rRow3, `T${tIndex}`, "rgba(255, 255, 255, 0.7)", 56, "scaled-text tier-label-text");
        }
      }
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
    const angle = i * angleStep;
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
      const textPos = polarToCartesian(cx, cy, centerRadius, angle);
      let rot = angle;
      if (isBottomHalf) {
        rot += 180;
      }

      const numberText = document.createElementNS("http://www.w3.org/2000/svg", "text");
      numberText.setAttribute("class", "scaled-text");
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
      const drawSingleLineText = (text, radius, centerAngle, pathId, isSchool) => {
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
        defsPath.setAttribute("d", pathData);
        defsPath.setAttribute("fill", "none");
        svg.appendChild(defsPath);

        const textEl = document.createElementNS("http://www.w3.org/2000/svg", "text");
        textEl.setAttribute("class", "scaled-text outer-ring-text");
        textEl.setAttribute("font-size", "70px");
        textEl.setAttribute("font-weight", isSchool ? "bold" : "normal");
        textEl.setAttribute("dominant-baseline", "middle");
        textEl.setAttribute("filter", "url(#text-shadow-filter)");
        textEl.style.pointerEvents = "none";

        const textPath = document.createElementNS("http://www.w3.org/2000/svg", "textPath");
        textPath.setAttribute("href", `#${pathId}`);
        textPath.setAttribute("startOffset", "50%");
        textPath.setAttribute("text-anchor", "middle");
        textPath.setAttribute("fill", isSchool ? school.color : "#e2e8f0");
        textPath.textContent = text;

        textEl.appendChild(textPath);
        svg.appendChild(textEl);
      };

      const drawCenteredText = (text, radius, centerAngle, pathId, isSchool) => {
        // Wrap effect names if they contain a space or hyphen and are long enough
        const shouldWrap = !isSchool && (text.includes(" ") || text.includes("-")) && text.length > 8;
        if (shouldWrap) {
          let parts = [];
          if (text.includes(" ")) {
            parts = text.split(" ");
          } else {
            const idx = text.indexOf("-");
            parts = [text.substring(0, idx), text.substring(idx + 1)];
          }
          const wrapDist = Number(appState.wrapDistance ?? 25);
          const radius1 = isBottomHalf ? (radius - wrapDist) : (radius + wrapDist);
          const radius2 = isBottomHalf ? (radius + wrapDist) : (radius - wrapDist);
          drawSingleLineText(parts[0], radius1, centerAngle, `${pathId}-line1`, isSchool);
          drawSingleLineText(parts[1], radius2, centerAngle, `${pathId}-line2`, isSchool);
        } else {
          drawSingleLineText(text, radius, centerAngle, pathId, isSchool);
        }
      };

      // 2. School Name above the number (curved)
      const schoolPathId = `outer-school-path-${i}`;
      // Add bottom/top label offset directly for perfect symmetry and adjustment
      const schoolRadius = isBottomHalf ? (centerRadius - labelSep + labelOffsetBottom) : (centerRadius + labelSep + labelOffsetTop);
      drawCenteredText(school.label, schoolRadius, angle, schoolPathId, true);

      // 3. Effect Name below the number (curved)
      const effectPathId = `outer-effect-path-${i}`;
      // Add bottom/top label offset directly for perfect symmetry and adjustment
      const effectRadius = isBottomHalf ? (centerRadius + labelSep + labelOffsetBottom) : (centerRadius - labelSep + labelOffsetTop);
      drawCenteredText(effectName, effectRadius, angle, effectPathId, false);

      // 4. Positive and Negative Icons (aligned horizontally along the same arc, swapped positions)
      const iconRadius = centerRadius + (isBottomHalf ? bottomIconShift : 0);
      const iconSize = 180;
      const containerSize = iconSize * 2;

      const renderIcon = (iconClass, targetAngle, targetColor) => {
        const iconPos = polarToCartesian(cx, cy, iconRadius, targetAngle);
        let iconRot = targetAngle;
        if (isBottomHalf) {
          iconRot += 180;
        }

        const iconGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
        iconGroup.setAttribute("transform", `rotate(${iconRot}, ${iconPos.x}, ${iconPos.y})`);

        const fObj = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
        fObj.setAttribute("x", iconPos.x - containerSize / 2);
        fObj.setAttribute("y", iconPos.y - containerSize / 2);
        fObj.setAttribute("width", containerSize);
        fObj.setAttribute("height", containerSize);
        fObj.innerHTML = `<i class="gi ${iconClass}" style="font-size: ${iconSize}px; color: ${targetColor}; display: flex; justify-content: center; align-items: center; width: 100%; height: 100%;"></i>`;
        iconGroup.appendChild(fObj);
        svg.appendChild(iconGroup);
      };

      // Swapped: Negative on left, Positive on right
      if (school.negativeIcon) {
        renderIcon(school.negativeIcon, leftCenterAngle, school.color);
      }
      if (school.icon) {
        renderIcon(school.icon, rightCenterAngle, school.color);
      }

      // 5. Draw Minimalistic Translucent Curved Line Arrows pointing OUTWARDS (no arrowheads)
      const arrowRadius = iconRadius;

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
        const startLeft = polarToCartesian(cx, cy, arrowRadius, angle - 3.5);
        const endLeft = polarToCartesian(cx, cy, arrowRadius, angle - 11.5);
        leftGrad.setAttribute("x1", startLeft.x);
        leftGrad.setAttribute("y1", startLeft.y);
        leftGrad.setAttribute("x2", endLeft.x);
        leftGrad.setAttribute("y2", endLeft.y);
        leftGrad.innerHTML = `
          <stop offset="0%" stop-color="${school.color}" stop-opacity="1.0" />
          <stop offset="40%" stop-color="${school.color}" stop-opacity="0.2" />
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
        const startRight = polarToCartesian(cx, cy, arrowRadius, angle + 3.5);
        const endRight = polarToCartesian(cx, cy, arrowRadius, angle + 11.5);
        rightGrad.setAttribute("x1", startRight.x);
        rightGrad.setAttribute("y1", startRight.y);
        rightGrad.setAttribute("x2", endRight.x);
        rightGrad.setAttribute("y2", endRight.y);
        rightGrad.innerHTML = `
          <stop offset="0%" stop-color="${school.color}" stop-opacity="1.0" />
          <stop offset="40%" stop-color="${school.color}" stop-opacity="0.2" />
          <stop offset="100%" stop-color="${school.color}" stop-opacity="0.0" />
        `;
      }

      // Draw Left Arrow Line
      const startLeft = polarToCartesian(cx, cy, arrowRadius, angle - 3.5);
      const endLeft = polarToCartesian(cx, cy, arrowRadius, angle - 11.5);

      const leftArrowLine = document.createElementNS("http://www.w3.org/2000/svg", "path");
      leftArrowLine.setAttribute("d", `M ${startLeft.x} ${startLeft.y} A ${arrowRadius} ${arrowRadius} 0 0 0 ${endLeft.x} ${endLeft.y}`);
      leftArrowLine.setAttribute("fill", "none");
      leftArrowLine.setAttribute("stroke", `url(#arrow-grad-left-${i})`);
      leftArrowLine.setAttribute("stroke-width", "8");
      leftArrowLine.setAttribute("stroke-linecap", "round");
      svg.appendChild(leftArrowLine);

      // Draw Right Arrow Line
      const startRight = polarToCartesian(cx, cy, arrowRadius, angle + 3.5);
      const endRight = polarToCartesian(cx, cy, arrowRadius, angle + 11.5);

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
      effectText.textContent = effectName;
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
      schoolText.textContent = school.label;
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

      const drawRadialRayText = (text, textAngle, isLeft) => {
        const baseDist = isBottomHalf ? outerDistBottom : outerDistTop;
        const textStartRadius = outerRadius + baseDist - 210;
        const pos = polarToCartesian(cx, cy, textStartRadius, textAngle);
        let actualRot = textAngle + 90;
        if (textAngle > 90 && textAngle < 270) {
          actualRot += 180;
        }

        const textEl = document.createElementNS("http://www.w3.org/2000/svg", "text");
        textEl.setAttribute("class", "scaled-text");
        textEl.setAttribute("x", pos.x);
        textEl.setAttribute("y", pos.y);
        textEl.setAttribute("font-size", "65px");
        textEl.setAttribute("font-weight", isLeft ? "bold" : "normal");
        textEl.setAttribute("fill", isLeft ? school.color : "#e2e8f0");
        textEl.setAttribute("text-anchor", (textAngle > 90 && textAngle < 270) ? "end" : "start");
        textEl.setAttribute("dominant-baseline", "middle");
        textEl.setAttribute("transform", `rotate(${actualRot}, ${pos.x}, ${pos.y})`);
        textEl.setAttribute("filter", "url(#text-shadow-filter)");
        textEl.textContent = text;
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

  container.appendChild(svg);
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
  } else {
    node = appState.targetNodes.find(n => n.id === activeNodeId);
    if (node) {
      node.label = newLabel;
      node.color = newColor;
      // Scaled mandala is static, no re-render needed for its edits because we disabled them.
      // But we should just keep this block for safety.
    }
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
      if (loadedState.magicNodes && loadedState.targetNodes) {
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
        if (appState.labelOffsetTop === undefined) appState.labelOffsetTop = appState.labelOffsetTop !== undefined ? appState.labelOffsetTop : 0;
        if (appState.labelOffsetBottom === undefined) appState.labelOffsetBottom = appState.bottomShift !== undefined ? appState.bottomShift : 65;
        if (appState.bottomIconShift === undefined) appState.bottomIconShift = 0;
        if (appState.rollFontSize === undefined) appState.rollFontSize = 110;
        if (appState.labelSeparation === undefined) appState.labelSeparation = 100;
        if (appState.outerDistTop === undefined) appState.outerDistTop = appState.outerDistance !== undefined ? appState.outerDistance : 320;
        if (appState.outerDistBottom === undefined) appState.outerDistBottom = (appState.outerDistance !== undefined && appState.bottomOuterShift !== undefined) ? (appState.outerDistance + appState.bottomOuterShift) : 320;
        if (appState.iconSeparation === undefined) appState.iconSeparation = appState.outerPinOffset !== undefined ? appState.outerPinOffset : 15;
        if (appState.wrapDistance === undefined) appState.wrapDistance = 25;
        syncViewModeButtons();
        syncOuterCenteringButton();
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
  document.querySelectorAll('.btn-segment').forEach(btn => {
    if (btn.getAttribute('data-view') === appState.viewMode) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  const isCurved = ['curved-axis', 'curved-text'].includes(appState.viewMode);
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

function syncBottomSliders() {
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
}

// Init / Startup Flow
async function init() {
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
  document.querySelectorAll('.btn-segment').forEach(btn => {
    btn.addEventListener('click', (e) => {
      appState.viewMode = e.currentTarget.getAttribute('data-view');
      syncViewModeButtons();
      renderScaledMandala();
      renderSidebarTables();
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

  const exportPngBtn = document.getElementById('export-png-btn');
  if (exportPngBtn) {
    exportPngBtn.addEventListener('click', exportToPNG);
  }

  if (!appState.viewMode) {
    appState.viewMode = 'curved-axis';
  }
  syncViewModeButtons();
  syncOuterCenteringButton();

  // Update input values and render views
  const msInitEl = document.getElementById('magic-slots');
  if (msInitEl) msInitEl.value = appState.magicNodes.length;

  renderMagicMandala();
  renderTierControls();
  renderScaledMandala();
  renderSidebarTables();

  // Set up header visibility toggle
  const header = document.querySelector('header');
  const headerToggleBtn = document.getElementById('header-toggle-btn');
  if (header && headerToggleBtn) {
    const updateHeaderHeight = () => {
      document.documentElement.style.setProperty('--header-height', `${header.offsetHeight}px`);
    };

    // Initialize height measurement
    updateHeaderHeight();

    // Listen for resize to update height variable dynamically
    window.addEventListener('resize', updateHeaderHeight);

    // Toggle button click listener
    headerToggleBtn.addEventListener('click', () => {
      const isCollapsed = header.classList.toggle('collapsed');
      localStorage.setItem('header-collapsed', isCollapsed);
    });

    // Apply initial state from local storage on load
    const isCollapsedSaved = localStorage.getItem('header-collapsed') === 'true';
    if (isCollapsedSaved) {
      header.classList.add('no-transition');
      header.classList.add('collapsed');
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
      const fObjs = Array.from(root.querySelectorAll('foreignObject'));
      for (const fObj of fObjs) {
        const x = parseFloat(fObj.getAttribute('x') || '0');
        const y = parseFloat(fObj.getAttribute('y') || '0');
        const w = parseFloat(fObj.getAttribute('width') || '0');
        const h = parseFloat(fObj.getAttribute('height') || '0');

        const iEl = fObj.querySelector('i[class]');
        if (!iEl) { fObj.parentNode.removeChild(fObj); continue; }

        const classes = iEl.getAttribute('class').split(/\s+/);
        const iconClass = classes.filter(c => c.startsWith('gi-') && c !== 'gi').join(' ');
        const hasFlip = classes.includes('gi-flip-horizontal');

        const styleStr = iEl.getAttribute('style') || '';
        const colorMatch = styleStr.match(/color:\s*([^;]+)/);
        const fontSizeMatch = styleStr.match(/font-size:\s*([\d.]+)px/);
        const color = colorMatch ? colorMatch[1].trim() : '#ffffff';
        const fontSize = fontSizeMatch ? parseFloat(fontSizeMatch[1]) : (Math.min(w, h) * 0.85);

        const glyph = getIconGlyph(iconClass);
        if (!glyph) { fObj.parentNode.removeChild(fObj); continue; }

        const cx2 = x + w / 2;
        const cy2 = y + h / 2;

        const textEl = document.createElementNS("http://www.w3.org/2000/svg", "text");
        textEl.setAttribute("fill", color);
        textEl.setAttribute("font-size", `${fontSize}px`);
        textEl.setAttribute("text-anchor", "middle");
        textEl.setAttribute("dominant-baseline", "central");
        // Use inline style with !important so the broad .scaled-text/text CSS rule can't override
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
        fObj.parentNode.replaceChild(textEl, fObj);
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

init();
