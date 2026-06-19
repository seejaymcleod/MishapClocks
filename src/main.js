// State
let appState = {
  viewMode: 'curved-text',
  magicNodes: [
    { id: 'm0', label: 'Thermal', icon: 'gi-fire', color: '#ff4500', opposite: 'Hydro', slider: 'Injecting kinetic heat (ignition) ↔ siphoning it (absolute zero).' },
    { id: 'm1', label: 'Aero', icon: 'gi-tornado', color: '#87ceeb', opposite: 'Geo', slider: 'High pressure and gales ↔ suffocating vacuums.' },
    { id: 'm2', label: 'Electro', icon: 'gi-lightning-trio', color: '#ffd700', opposite: 'Dimensional', slider: 'Spiking electrical/magnetic currents ↔ grounding them into dead zones.' },
    { id: 'm3', label: 'Neural', icon: 'gi-brain', color: '#ff69b4', opposite: 'Vital', slider: 'Structuring logic and perception ↔ shattering the psyche into madness.' },
    { id: 'm4', label: 'Hydro', icon: 'gi-water-drop', color: '#1e90ff', opposite: 'Thermal', slider: 'Flooding and fluidity ↔ severe desiccation and drought.' },
    { id: 'm5', label: 'Geo', icon: 'gi-stone-block', color: '#8b4513', opposite: 'Aero', slider: 'Density, metal, and bedrock ↔ rust, erosion, and dust.' },
    { id: 'm6', label: 'Dimensional', icon: 'gi-portal', color: '#8a2be2', opposite: 'Electro', slider: 'Accelerating chronological flow ↔ halting momentum into stasis.' },
    { id: 'm7', label: 'Vital', icon: 'gi-health-normal', color: '#32cd32', opposite: 'Neural', slider: 'Rapid cellular growth and healing ↔ necrosis, atrophy, and decay.' },
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
    { offset: 0, nodes: [
      { type: 'Self-Harm', modifier: 'Singe', dc: 'DC 9', dice: '1d4' },
      { type: 'Mistarget', modifier: 'Glancing Veer' },
      { type: 'Multi-Target', modifier: 'Dual Fork' },
      { type: 'Close Range', modifier: 'Proximal Buzz' },
      { type: 'Anti-School', modifier: 'Minor Damp' },
      { type: 'Alter Environment', modifier: 'Surface Tilt' },
      { type: 'Zone', modifier: 'Minor Ripple' },
      { type: 'Materia Leak', modifier: 'Ether Drip' }
    ]},
    { offset: 0, nodes: [
      { type: 'Self-Harm', modifier: 'Blister', dc: 'DC 11', dice: '1d6' },
      { type: 'Mistarget', modifier: 'Wide Yaw' },
      { type: 'Multi-Target', modifier: 'Triple Cleave' },
      { type: 'Close Range', modifier: 'Aura Cling' },
      { type: 'Anti-School', modifier: 'Ward Tear' },
      { type: 'Alter Environment', modifier: 'Ground Shake' },
      { type: 'Zone', modifier: 'Static Field' },
      { type: 'Materia Leak', modifier: 'Mana Bleed' }
    ]},
    { offset: 0, nodes: [
      { type: 'Self-Harm', modifier: 'Searing Flash', dc: 'DC 13', dice: '2d6' },
      { type: 'Mistarget', modifier: 'Stray Vector' },
      { type: 'Multi-Target', modifier: 'Quad Splinter' },
      { type: 'Close Range', modifier: 'Tactile Shock' },
      { type: 'Anti-School', modifier: 'Spell Dissolve' },
      { type: 'Alter Environment', modifier: 'Terrain Warp' },
      { type: 'Zone', modifier: 'Vortex Pull' },
      { type: 'Materia Leak', modifier: 'Essence Drain' }
    ]},
    { offset: 0, nodes: [
      { type: 'Self-Harm', modifier: 'Searing Wave', dc: 'DC 15', dice: '3d6' },
      { type: 'Mistarget', modifier: 'Inverse Arc' },
      { type: 'Multi-Target', modifier: 'Chain Cascade' },
      { type: 'Close Range', modifier: 'Melee Bind' },
      { type: 'Anti-School', modifier: 'Inverse Surge' },
      { type: 'Alter Environment', modifier: 'Flora Spasm' },
      { type: 'Zone', modifier: 'Gravity Well' },
      { type: 'Materia Leak', modifier: 'Spell Fracture' }
    ]},
    { offset: 0, nodes: [
      { type: 'Self-Harm', modifier: 'Meltdown', dc: 'DC 17', dice: '4d8' },
      { type: 'Mistarget', modifier: 'Mirror Target' },
      { type: 'Multi-Target', modifier: 'Omnipresence' },
      { type: 'Close Range', modifier: 'Point-Blank' },
      { type: 'Anti-School', modifier: 'School Nullify' },
      { type: 'Alter Environment', modifier: 'Weather Flare' },
      { type: 'Zone', modifier: 'Time Warp' },
      { type: 'Materia Leak', modifier: 'Conduit Rupture' }
    ]},
    { offset: 0, nodes: [
      { type: 'Self-Harm', modifier: 'Inferno Rupture', dc: 'DC 19', dice: '5d8' },
      { type: 'Mistarget', modifier: 'Chaos Drift' },
      { type: 'Multi-Target', modifier: 'Cataclysmic Split' },
      { type: 'Close Range', modifier: 'Absolute Proximity' },
      { type: 'Anti-School', modifier: 'Antimagic Collapse' },
      { type: 'Alter Environment', modifier: 'Planar Rupture' },
      { type: 'Zone', modifier: 'Singularity' },
      { type: 'Materia Leak', modifier: 'Void Siphon' }
    ]}
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
      opposite: row[3] || '',
      slider: row[4] || ''
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
  
  const size = 4300;
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
      const hideModText = isThermalSlice && ['stacked-pill', 'curved-text'].includes(appState.viewMode);
      const modText = (tIndex === 0 || hideModText) ? '' : (node.modifier || node.dc || '—');
      const textRadius = innerR + ringWidth * 0.5;

      if (modText) {
        if (appState.viewMode === 'curved-text') {
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
      } else if (appState.viewMode === 'curved-text') {
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
          // Row 3: TX (size: calculated, drop shadow, Montserrat/Small-Caps)
          createCurvedLine(`curved-path-${tIndex}-r3`, rRow3, `T${tIndex}`, "rgba(255, 255, 255, 0.7)", calculatedFontSize, "scaled-text tier-label-text");
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
    const effectName = appState.scaledTiers[0].nodes[i]?.type || `Effect ${i+1}`;
    
    if (appState.viewMode === 'curved-text') {
      const outerTextRadius = outerRadius + 180;
      const isBottomHalf = (angle > 90 && angle < 270);

      // 1. Center Big Number (Upright / Radial, like in normal view)
      const textPos = polarToCartesian(cx, cy, outerTextRadius, angle);
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
      numberText.setAttribute("font-size", "110px");
      numberText.setAttribute("font-weight", "bold");
      numberText.setAttribute("filter", "url(#text-shadow-filter)");
      numberText.setAttribute("transform", `rotate(${rot}, ${textPos.x}, ${textPos.y})`);
      numberText.textContent = (i + 1).toString();
      svg.appendChild(numberText);

      // 2. School Name (Curved Left Path) - Extended to 26 degrees to prevent clipping
      let schoolPathData;
      let schoolTextAnchor;
      let schoolStartOffset;
      const schoolPathId = `outer-school-path-${i}`;
      const pathSpan = 26; // Expanded path span to prevent text clipping for long labels

      if (isBottomHalf) {
        // Left is angle + pathSpan, goes counter-clockwise to angle + 2.5
        const pathStart = polarToCartesian(cx, cy, outerTextRadius, angle + pathSpan);
        const pathEnd = polarToCartesian(cx, cy, outerTextRadius, angle + 2.5);
        schoolPathData = [
          "M", pathStart.x, pathStart.y,
          "A", outerTextRadius, outerTextRadius, 0, 0, 0, pathEnd.x, pathEnd.y
        ].join(" ");
        schoolTextAnchor = "end";
        schoolStartOffset = "100%";
      } else {
        // Left is angle - pathSpan, goes clockwise to angle - 2.5
        const pathStart = polarToCartesian(cx, cy, outerTextRadius, angle - pathSpan);
        const pathEnd = polarToCartesian(cx, cy, outerTextRadius, angle - 2.5);
        schoolPathData = [
          "M", pathStart.x, pathStart.y,
          "A", outerTextRadius, outerTextRadius, 0, 0, 1, pathEnd.x, pathEnd.y
        ].join(" ");
        schoolTextAnchor = "end";
        schoolStartOffset = "100%";
      }

      const schoolDefsPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
      schoolDefsPath.setAttribute("id", schoolPathId);
      schoolDefsPath.setAttribute("d", schoolPathData);
      schoolDefsPath.setAttribute("fill", "none");
      svg.appendChild(schoolDefsPath);

      const schoolTextEl = document.createElementNS("http://www.w3.org/2000/svg", "text");
      schoolTextEl.setAttribute("class", "scaled-text outer-ring-text");
      schoolTextEl.setAttribute("font-size", "70px");
      schoolTextEl.setAttribute("font-weight", "bold");
      schoolTextEl.setAttribute("filter", "url(#text-shadow-filter)");
      schoolTextEl.style.pointerEvents = "none";

      const schoolTextPath = document.createElementNS("http://www.w3.org/2000/svg", "textPath");
      schoolTextPath.setAttribute("href", `#${schoolPathId}`);
      schoolTextPath.setAttribute("startOffset", schoolStartOffset);
      schoolTextPath.setAttribute("text-anchor", schoolTextAnchor);
      schoolTextPath.setAttribute("fill", school.color);
      schoolTextPath.textContent = school.label;

      schoolTextEl.appendChild(schoolTextPath);
      svg.appendChild(schoolTextEl);

      // 3. School Icon (on the left of School Name) - Resized to 180px, precisely positioned & vertically aligned
      if (school.icon) {
        // Calculate label angle span using Montserrat character span (1.4 degrees per character)
        const labelAngleSpan = school.label.length * 1.4;
        const halfIconAngleSpan = 2.6; // half of 180px icon angular width at radius 1980
        const padding = 3.5;
        let iconAngle;
        if (isBottomHalf) {
          iconAngle = angle + 2.5 + labelAngleSpan + padding + halfIconAngleSpan;
        } else {
          iconAngle = angle - 2.5 - labelAngleSpan - padding - halfIconAngleSpan;
        }

        // Align icon vertically by matching the text shift direction (inwards in bottom, outwards in top)
        const iconRadius = isBottomHalf ? (outerTextRadius - 40) : (outerTextRadius + 40);
        const iconPos = polarToCartesian(cx, cy, iconRadius, iconAngle);
        let iconRot = iconAngle;
        if (isBottomHalf) {
          iconRot += 180;
        }

        const iconGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
        iconGroup.setAttribute("transform", `rotate(${iconRot}, ${iconPos.x}, ${iconPos.y})`);

        const iconSize = 180; // Resized to 2x bigger (previously 90px)
        const containerSize = iconSize * 2; // 360px container to support larger icon without clipping
        const fObj = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
        fObj.setAttribute("x", iconPos.x - containerSize / 2);
        fObj.setAttribute("y", iconPos.y - containerSize / 2);
        fObj.setAttribute("width", containerSize);
        fObj.setAttribute("height", containerSize);
        fObj.innerHTML = `<i class="gi ${school.icon}" style="font-size: ${iconSize}px; color: ${school.color}; display: flex; justify-content: center; align-items: center; width: 100%; height: 100%;"></i>`;
        iconGroup.appendChild(fObj);
        svg.appendChild(iconGroup);
      }

      // 4. Effect Name (Curved Right Path) - Extended to 26 degrees to prevent clipping
      let effectPathData;
      let effectTextAnchor;
      let effectStartOffset;
      const effectPathId = `outer-effect-path-${i}`;

      if (isBottomHalf) {
        // Right is angle - 2.5, goes counter-clockwise to angle - pathSpan
        const pathStart = polarToCartesian(cx, cy, outerTextRadius, angle - 2.5);
        const pathEnd = polarToCartesian(cx, cy, outerTextRadius, angle - pathSpan);
        effectPathData = [
          "M", pathStart.x, pathStart.y,
          "A", outerTextRadius, outerTextRadius, 0, 0, 0, pathEnd.x, pathEnd.y
        ].join(" ");
        effectTextAnchor = "start";
        effectStartOffset = "0%";
      } else {
        // Right is angle + 2.5, goes clockwise to angle + pathSpan
        const pathStart = polarToCartesian(cx, cy, outerTextRadius, angle + 2.5);
        const pathEnd = polarToCartesian(cx, cy, outerTextRadius, angle + pathSpan);
        effectPathData = [
          "M", pathStart.x, pathStart.y,
          "A", outerTextRadius, outerTextRadius, 0, 0, 1, pathEnd.x, pathEnd.y
        ].join(" ");
        effectTextAnchor = "start";
        effectStartOffset = "0%";
      }

      const effectDefsPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
      effectDefsPath.setAttribute("id", effectPathId);
      effectDefsPath.setAttribute("d", effectPathData);
      effectDefsPath.setAttribute("fill", "none");
      svg.appendChild(effectDefsPath);

      const effectTextEl = document.createElementNS("http://www.w3.org/2000/svg", "text");
      effectTextEl.setAttribute("class", "scaled-text outer-ring-text");
      effectTextEl.setAttribute("font-size", "70px"); // Put back to match school name size (70px)
      effectTextEl.setAttribute("font-weight", "normal");
      effectTextEl.setAttribute("filter", "url(#text-shadow-filter)");
      effectTextEl.style.pointerEvents = "none";

      const effectTextPath = document.createElementNS("http://www.w3.org/2000/svg", "textPath");
      effectTextPath.setAttribute("href", `#${effectPathId}`);
      effectTextPath.setAttribute("startOffset", effectStartOffset);
      effectTextPath.setAttribute("text-anchor", effectTextAnchor);
      effectTextPath.setAttribute("fill", "#e2e8f0");
      effectTextPath.textContent = effectName;

      effectTextEl.appendChild(effectTextPath);
      svg.appendChild(effectTextEl);
    } else {
      const textRadius = outerRadius + 180;
      const textPos = polarToCartesian(cx, cy, textRadius, angle);
      
      const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
      
      let rot = angle;
      if (rot > 90 && rot < 270) {
        rot += 180;
      }
      group.setAttribute("transform", `rotate(${rot}, ${textPos.x}, ${textPos.y})`);

      // Number in the middle (Montserrat Bold, drop shadow)
      const numberText = document.createElementNS("http://www.w3.org/2000/svg", "text");
      numberText.setAttribute("class", "scaled-text outer-ring-text");
      numberText.setAttribute("x", textPos.x);
      numberText.setAttribute("y", textPos.y);
      numberText.setAttribute("text-anchor", "middle");
      numberText.setAttribute("dominant-baseline", "middle");
      numberText.setAttribute("fill", "#fbbf24");
      numberText.setAttribute("font-size", "110px");
      numberText.setAttribute("font-weight", "bold");
      numberText.setAttribute("filter", "url(#text-shadow-filter)");
      numberText.textContent = (i + 1).toString();
      group.appendChild(numberText);
      
      // Left of center: Name and Icon (Montserrat Bold, uppercase)
      const leftX = textPos.x - 90;
      
      const schoolText = document.createElementNS("http://www.w3.org/2000/svg", "text");
      schoolText.setAttribute("class", "scaled-text outer-ring-text");
      schoolText.setAttribute("x", leftX);
      schoolText.setAttribute("y", textPos.y);
      schoolText.setAttribute("text-anchor", "end");
      schoolText.setAttribute("dominant-baseline", "middle");
      schoolText.setAttribute("fill", school.color);
      schoolText.setAttribute("font-size", "70px");
      schoolText.setAttribute("font-weight", "bold");
      schoolText.setAttribute("filter", "url(#text-shadow-filter)");
      schoolText.textContent = school.label;
      group.appendChild(schoolText);

      // Icon in standard view - Resized to 180px (2x bigger) and precisely shifted left based on character length
      if (school.icon) {
        const iconSize = 180; // Resized to 2x bigger (previously 90px)
        const containerSize = iconSize * 2; // 360px container
        const iconX = leftX - (school.label.length * 50) - iconSize - 35; 
        
        const fObj = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
        fObj.setAttribute("x", (iconX + iconSize / 2) - containerSize / 2);
        fObj.setAttribute("y", textPos.y - containerSize / 2);
        fObj.setAttribute("width", containerSize);
        fObj.setAttribute("height", containerSize);
        fObj.innerHTML = `<i class="gi ${school.icon}" style="font-size: ${iconSize}px; color: ${school.color}; display: flex; justify-content: center; align-items: center; width: 100%; height: 100%;"></i>`;
        group.appendChild(fObj);
      }

      // Right of center: Scale Type (Montserrat Normal, uppercase, drop shadow)
      const rightX = textPos.x + 90;
      const effectText = document.createElementNS("http://www.w3.org/2000/svg", "text");
      effectText.setAttribute("class", "scaled-text outer-ring-text");
      effectText.setAttribute("x", rightX);
      effectText.setAttribute("y", textPos.y);
      effectText.setAttribute("text-anchor", "start");
      effectText.setAttribute("dominant-baseline", "middle");
      effectText.setAttribute("fill", "#e2e8f0");
      effectText.setAttribute("font-size", "70px");
      effectText.setAttribute("font-weight", "normal");
      effectText.setAttribute("filter", "url(#text-shadow-filter)");
      effectText.textContent = effectName;
      group.appendChild(effectText);

      svg.appendChild(group);
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
          appState.viewMode = 'curved-text';
        }
        syncViewModeButtons();
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

  if (!appState.viewMode) {
    appState.viewMode = 'curved-text';
  }
  syncViewModeButtons();

  // Update input values and render views
  const msInitEl = document.getElementById('magic-slots');
  if (msInitEl) msInitEl.value = appState.magicNodes.length;
  
  renderMagicMandala();
  renderTierControls();
  renderScaledMandala();
  renderSidebarTables();
}

init();
