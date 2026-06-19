// State
let appState = {
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
      { type: 'Self-Harm', dc: 'DC 9', dice: 'd4' },
      { type: 'Mistarget', dc: 'DC 9', dice: '—' },
      { type: 'Multi-Target', dc: 'DC 9', dice: '—' },
      { type: 'Close Range', dc: 'DC 9', dice: 'd4' },
      { type: 'Anti-School', dc: 'DC 9', dice: '—' },
      { type: 'Alter Environment', dc: 'DC 9', dice: '—' },
      { type: 'Zone', dc: 'DC 9', dice: '—' },
      { type: 'Materia Leak', dc: 'DC 9', dice: '—' }
    ]},
    { offset: 0, nodes: [
      { type: 'Self-Harm', dc: 'DC 11', dice: 'd6' },
      { type: 'Mistarget', dc: 'DC 11', dice: '—' },
      { type: 'Multi-Target', dc: 'DC 11', dice: 'd4' },
      { type: 'Close Range', dc: 'DC 11', dice: 'd6' },
      { type: 'Anti-School', dc: 'DC 11', dice: '—' },
      { type: 'Alter Environment', dc: 'DC 11', dice: '—' },
      { type: 'Zone', dc: 'DC 11', dice: '—' },
      { type: 'Materia Leak', dc: 'DC 11', dice: '—' }
    ]},
    { offset: 0, nodes: [
      { type: 'Self-Harm', dc: 'DC 13', dice: 'd8' },
      { type: 'Mistarget', dc: 'DC 13', dice: '—' },
      { type: 'Multi-Target', dc: 'DC 13', dice: 'd6' },
      { type: 'Close Range', dc: 'DC 13', dice: 'd8' },
      { type: 'Anti-School', dc: 'DC 13', dice: '—' },
      { type: 'Alter Environment', dc: 'DC 13', dice: 'd4' },
      { type: 'Zone', dc: 'DC 13', dice: '—' },
      { type: 'Materia Leak', dc: 'DC 13', dice: '—' }
    ]},
    { offset: 0, nodes: [
      { type: 'Self-Harm', dc: 'DC 15', dice: 'd10' },
      { type: 'Mistarget', dc: 'DC 15', dice: 'd4' },
      { type: 'Multi-Target', dc: 'DC 15', dice: 'd8' },
      { type: 'Close Range', dc: 'DC 15', dice: 'd10' },
      { type: 'Anti-School', dc: 'DC 15', dice: 'd6' },
      { type: 'Alter Environment', dc: 'DC 15', dice: 'd6' },
      { type: 'Zone', dc: 'DC 15', dice: '—' },
      { type: 'Materia Leak', dc: 'DC 15', dice: '—' }
    ]},
    { offset: 0, nodes: [
      { type: 'Self-Harm', dc: 'DC 17', dice: 'd12' },
      { type: 'Mistarget', dc: 'DC 17', dice: '—' },
      { type: 'Multi-Target', dc: 'DC 17', dice: 'd10' },
      { type: 'Close Range', dc: 'DC 17', dice: 'd12' },
      { type: 'Anti-School', dc: 'DC 17', dice: '—' },
      { type: 'Alter Environment', dc: 'DC 17', dice: 'd8' },
      { type: 'Zone', dc: 'DC 17', dice: 'd4' },
      { type: 'Materia Leak', dc: 'DC 17', dice: 'd4' }
    ]},
    { offset: 0, nodes: [
      { type: 'Self-Harm', dc: 'DC 19', dice: 'd20' },
      { type: 'Mistarget', dc: 'DC 19', dice: '—' },
      { type: 'Multi-Target', dc: 'DC 19', dice: 'd12' },
      { type: 'Close Range', dc: 'DC 19', dice: 'd20' },
      { type: 'Anti-School', dc: 'DC 19', dice: '—' },
      { type: 'Alter Environment', dc: 'DC 19', dice: 'd10' },
      { type: 'Zone', dc: 'DC 19', dice: 'd6' },
      { type: 'Materia Leak', dc: 'DC 19', dice: 'd8' }
    ]}
  ]
};

let activeNodeId = null;

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

// Render Magic Mandala
function renderMagicMandala() {
  const container = document.getElementById('magic-mandala');
  container.innerHTML = '';
  
  const size = 4000;
  const cx = size / 2;
  const cy = size / 2;
  const outerRadius = 1800;
  
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", `0 0 ${size} ${size}`);
  
  const numNodes = appState.magicNodes.length;
  if (numNodes === 0) return;
  const angleStep = 360 / numNodes;

  // Draw slices
  appState.magicNodes.forEach((node, i) => {
    const startAngle = i * angleStep;
    const endAngle = (i + 1) * angleStep;
    
    // We want the slices to be centered on the angle, so we shift by -angleStep/2
    const shiftedStart = startAngle - angleStep / 2;
    const shiftedEnd = endAngle - angleStep / 2;

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", describeArc(cx, cy, outerRadius, shiftedStart, shiftedEnd));
    path.setAttribute("fill", node.color);
    path.setAttribute("class", "node-path segment-line");
    path.setAttribute("stroke", "var(--bg-color)");
    path.setAttribute("stroke-width", "24");
    path.style.color = node.color; // for currentcolor in hover
    
    path.addEventListener('click', () => openModal(node, 'magic'));
    
    svg.appendChild(path);
    
    // Add text label
    const textAngle = startAngle;
    // Place text outside the circle, further out
    const textPos = polarToCartesian(cx, cy, outerRadius + 140, textAngle);
    
    let rot = textAngle;
    if (rot > 90 && rot < 270) {
      rot += 180;
    }
    // If only 1 node, no rotation needed
    if (numNodes === 1) rot = 0;

    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.setAttribute("transform", `rotate(${rot}, ${textPos.x}, ${textPos.y})`);
    g.style.pointerEvents = "none"; // let clicks pass through to the slice

    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", textPos.x);
    text.setAttribute("y", textPos.y + (node.icon ? 80 : 0));
    text.setAttribute("class", "node-text");
    text.setAttribute("font-size", "70px");
    text.textContent = node.label;
    g.appendChild(text);

    if (node.icon) {
      const fObj = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
      fObj.setAttribute("x", textPos.x - 85);
      fObj.setAttribute("y", textPos.y - 120);
      fObj.setAttribute("width", 170);
      fObj.setAttribute("height", 170);
      fObj.innerHTML = `<i class="gi ${node.icon}" style="font-size: 130px; color: var(--text-color); display: flex; justify-content: center; align-items: center; width: 100%; height: 100%;"></i>`;
      g.appendChild(fObj);
    }
    
    svg.appendChild(g);
  });
  
  // Draw 5 rings (Shadowdark tiers)
  for (let r = 1; r <= 5; r++) {
    const rRadius = (outerRadius / 5) * r;
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", cx);
    circle.setAttribute("cy", cy);
    circle.setAttribute("r", rRadius);
    circle.setAttribute("class", "tier-line");
    circle.setAttribute("stroke-width", "8");
    svg.appendChild(circle);
  }
  
  container.appendChild(svg);
}

function renderScaledMandala() {
  const container = document.getElementById('target-mandala');
  container.innerHTML = '';
  
  const size = 4000;
  const cx = size / 2;
  const cy = size / 2;
  
  const holeRadius = 300;
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

  // Draw 6 Tiers
  
  const outerNumbers = 8;
  const outerAngleStep = 360 / Math.max(outerNumbers, 1);
  const baseOffset = outerAngleStep / 2;

  appState.scaledTiers.forEach((tierData, tIndex) => {
    const tier = tierData.nodes;
    const innerR = holeRadius + tIndex * ringWidth;
    const outerR = innerR + ringWidth;
    
    const numNodes = tier.length;
    const anglePerUnit = 360 / Math.max(numNodes, 1);
    
    // Start at baseOffset degrees + the tier's custom rotation offset
    let currentAngle = baseOffset + (tierData.offset || 0);
    
    // Draw slices
    tier.forEach((node, i) => {
      const startAngle = currentAngle;
      const endAngle = currentAngle + anglePerUnit;
      const sliceAngle = anglePerUnit;
      
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      
      // Calculate arc with inner and outer radius
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
      
      const tierColors = [
        ['#1e1b4b', '#17153b'], // T0
        ['#281b4f', '#1f1440'], // T1
        ['#341b52', '#281541'], // T2
        ['#411b54', '#321442'], // T3
        ['#4f1a56', '#3e1344'], // T4
        ['#5e1957', '#4a1244'], // T5
      ];
      
      path.setAttribute("d", d);
      const brightness = tierColors[tIndex][i % 2];
      path.setAttribute("fill", brightness);
      path.setAttribute("stroke", "#ffffff");
      path.setAttribute("stroke-opacity", "0.1");
      path.setAttribute("stroke-width", "4");
      
      svg.appendChild(path);
      
      // Add text label
      const textAngle = currentAngle + (sliceAngle / 2);
      const textRadius = innerR + ringWidth * 0.5;
      const textPos = polarToCartesian(cx, cy, textRadius, textAngle);
      
      const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text.setAttribute("x", textPos.x);
      text.setAttribute("y", textPos.y);
      text.setAttribute("class", "scaled-text");
      
      let rot = textAngle;
      if (rot > 90 && rot < 270) {
        rot += 180;
      }

      text.setAttribute("transform", `rotate(${rot}, ${textPos.x}, ${textPos.y})`);
      text.setAttribute("fill", "#ffffff");
      text.setAttribute("text-anchor", "middle");
      text.setAttribute("dominant-baseline", "middle");
      text.setAttribute("font-size", "52px");
      text.setAttribute("font-weight", "700");

      const diceSpan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
      diceSpan.setAttribute("x", textPos.x);
      diceSpan.setAttribute("dy", "-0.2em");
      diceSpan.textContent = node.dice !== '—' ? node.dice : '';
      diceSpan.setAttribute("fill", "#ff9800"); // highlight dice
      
      const dcSpan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
      dcSpan.setAttribute("x", textPos.x);
      dcSpan.setAttribute("dy", node.dice !== '—' ? "1.2em" : "0.4em");
      dcSpan.textContent = node.dc;
      dcSpan.setAttribute("fill", "#a78bfa");
      
      text.appendChild(diceSpan);
      text.appendChild(dcSpan);
      
      svg.appendChild(text);
      
      currentAngle = endAngle;
    });
    
    // Tier Label
    const tierText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    tierText.setAttribute("x", cx);
    tierText.setAttribute("y", cy - innerR - 20);
    tierText.textContent = "T" + tIndex;
    tierText.setAttribute("fill", "#ffffff");
    tierText.setAttribute("opacity", "0.5");
    tierText.setAttribute("font-size", "40px");
    tierText.setAttribute("font-weight", "bold");
    tierText.setAttribute("text-anchor", "middle");
    svg.appendChild(tierText);
  });

  // Clock numbers centered evenly
  for (let i = 0; i < outerNumbers; i++) {
    const angle = (i + 1) * outerAngleStep; // Center of the slice
    const effectName = appState.scaledTiers[0].nodes[i]?.type || `Effect ${i+1}`;
    
    const textPos = polarToCartesian(cx, cy, outerRadius + 140, angle);
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", textPos.x);
    text.setAttribute("y", textPos.y);

    let rot = angle;
    if (rot > 90 && rot < 270) {
      rot += 180;
    }
    text.setAttribute("transform", `rotate(${rot}, ${textPos.x}, ${textPos.y})`);

    text.setAttribute("text-anchor", "middle");
    text.setAttribute("dominant-baseline", "middle");

    const numberSpan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
    numberSpan.setAttribute("x", textPos.x);
    numberSpan.setAttribute("dy", "-0.3em");
    numberSpan.textContent = (i + 1).toString();
    numberSpan.setAttribute("fill", "#fbbf24");
    numberSpan.setAttribute("font-size", "100px");
    numberSpan.setAttribute("font-weight", "bold");

    const nameSpan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
    nameSpan.setAttribute("x", textPos.x);
    nameSpan.setAttribute("dy", "1.5em");
    nameSpan.textContent = effectName;
    nameSpan.setAttribute("fill", "#e2e8f0");
    nameSpan.setAttribute("font-size", "50px");
    nameSpan.setAttribute("font-weight", "normal");
    
    text.appendChild(numberSpan);
    text.appendChild(nameSpan);
    
    svg.appendChild(text);
    
    // tick mark
    const tickAngle = angle - baseOffset; // boundary
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
  }
  
  // Center Label
  const centerText = document.createElementNS("http://www.w3.org/2000/svg", "text");
  centerText.setAttribute("x", cx);
  centerText.setAttribute("y", cy);
  centerText.textContent = "SCALED";
  centerText.setAttribute("fill", "#ffffff");
  centerText.setAttribute("opacity", "0.8");
  centerText.setAttribute("font-size", "70px");
  centerText.setAttribute("font-weight", "bold");
  centerText.setAttribute("text-anchor", "middle");
  centerText.setAttribute("dominant-baseline", "middle");
  centerText.setAttribute("letter-spacing", "4px");
  svg.appendChild(centerText);

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

document.getElementById('magic-slots').addEventListener('change', (e) => {
  const newSize = parseInt(e.target.value, 10);
  if (newSize > 0) {
    resizeNodes(appState.magicNodes, newSize, 'm');
    renderMagicMandala();
  }
});

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
    label.textContent = `T${tIndex}`;
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
        document.getElementById('magic-slots').value = appState.magicNodes.length;
        renderMagicMandala();
        
        // Ensure old saves have scaledTiers
        if (!appState.scaledTiers) {
           appState.scaledTiers = [];
        }
        renderTierControls();
        renderScaledMandala();
      } else {
        alert('Invalid save file format.');
      }
    } catch (err) {
      alert('Error parsing JSON file.');
    }
  };
  reader.readAsText(file);
});

// Init
document.getElementById('magic-slots').value = appState.magicNodes.length;
renderMagicMandala();
renderTierControls();
renderScaledMandala();
