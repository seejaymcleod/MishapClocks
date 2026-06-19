// State
let appState = {
  viewMode: 'full',
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
      const textRadius = innerR + ringWidth * 0.5;
      const modText = tIndex === 0 ? '' : (node.modifier || node.dc || '—');
      const textPos = polarToCartesian(cx, cy, textRadius, centerAngle);

      const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text.setAttribute("x", textPos.x);
      text.setAttribute("y", textPos.y);
      text.setAttribute("class", "scaled-text");
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
    });
    
    // Tier Label
    const firstNode = tierData.nodes[0] || {};
    const diceText = firstNode.dice || '—';
    const dcText = firstNode.dc || '—';

    let R_label;
    let labelText;
    const showDiceDc = appState.viewMode === 'full' || appState.viewMode === 'bottom-dice';

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

  const centerIconSize = holeRadius * 1.3;
  const centerIconFObj = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
  centerIconFObj.setAttribute("x", cx - centerIconSize / 2);
  centerIconFObj.setAttribute("y", cy - centerIconSize / 2);
  centerIconFObj.setAttribute("width", centerIconSize);
  centerIconFObj.setAttribute("height", centerIconSize);
  centerIconFObj.innerHTML = `<i class="gi gi-hourglass" style="font-size: ${centerIconSize * 0.8}px; color: #fbbf24; display: flex; justify-content: center; align-items: center; width: 100%; height: 100%;"></i>`;
  svg.appendChild(centerIconFObj);

  // Outer Ring Section
  appState.magicNodes.forEach((school, i) => {
    const angle = i * angleStep;
    const effectName = appState.scaledTiers[0].nodes[i]?.type || `Effect ${i+1}`;
    
    const textRadius = outerRadius + 180;
    const textPos = polarToCartesian(cx, cy, textRadius, angle);
    
    const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    
    let rot = angle;
    if (rot > 90 && rot < 270) {
      rot += 180;
    }
    group.setAttribute("transform", `rotate(${rot}, ${textPos.x}, ${textPos.y})`);

    // Number in the middle
    const numberText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    numberText.setAttribute("x", textPos.x);
    numberText.setAttribute("y", textPos.y);
    numberText.setAttribute("text-anchor", "middle");
    numberText.setAttribute("dominant-baseline", "middle");
    numberText.setAttribute("fill", "#fbbf24");
    numberText.setAttribute("font-size", "110px");
    numberText.setAttribute("font-weight", "bold");
    numberText.textContent = (i + 1).toString();
    group.appendChild(numberText);
    
    // Left of center: Name and Icon
    const leftX = textPos.x - 90;
    
    const schoolText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    schoolText.setAttribute("x", leftX);
    schoolText.setAttribute("y", textPos.y);
    schoolText.setAttribute("text-anchor", "end");
    schoolText.setAttribute("dominant-baseline", "middle");
    schoolText.setAttribute("fill", school.color);
    schoolText.setAttribute("font-size", "70px");
    schoolText.setAttribute("font-weight", "bold");
    schoolText.textContent = school.label;
    group.appendChild(schoolText);

    if (school.icon) {
      const iconSize = 90;
      const iconX = leftX - (school.label.length * 40) - iconSize - 25; 
      
      const fObj = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
      fObj.setAttribute("x", iconX);
      fObj.setAttribute("y", textPos.y - iconSize / 2);
      fObj.setAttribute("width", iconSize);
      fObj.setAttribute("height", iconSize);
      fObj.innerHTML = `<i class="gi ${school.icon}" style="font-size: ${iconSize}px; color: ${school.color}; display: flex; justify-content: center; align-items: center; width: 100%; height: 100%;"></i>`;
      group.appendChild(fObj);
    }

    // Right of center: Scale Type
    const rightX = textPos.x + 90;
    const effectText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    effectText.setAttribute("x", rightX);
    effectText.setAttribute("y", textPos.y);
    effectText.setAttribute("text-anchor", "start");
    effectText.setAttribute("dominant-baseline", "middle");
    effectText.setAttribute("fill", "#e2e8f0");
    effectText.setAttribute("font-size", "70px");
    effectText.setAttribute("font-weight", "normal");
    effectText.textContent = effectName;
    group.appendChild(effectText);

    svg.appendChild(group);
    
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
          appState.viewMode = appState.hideDiceDc ? 'clean-top' : 'full';
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
    appState.viewMode = appState.hideDiceDc ? 'clean-top' : 'full';
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
