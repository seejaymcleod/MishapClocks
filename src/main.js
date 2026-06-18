// State
let appState = {
  magicNodes: [
    { id: 'm0', label: 'Fire', color: '#ff4500' },
    { id: 'm1', label: 'Space', color: '#8a2be2' },
    { id: 'm2', label: 'Life', color: '#32cd32' },
    { id: 'm3', label: 'Electricity', color: '#ffd700' },
    { id: 'm4', label: 'Air', color: '#87ceeb' },
    { id: 'm5', label: 'Mind', color: '#ff69b4' },
    { id: 'm6', label: 'Cold', color: '#00ffff' },
    { id: 'm7', label: 'Time', color: '#4682b4' },
    { id: 'm8', label: 'Death', color: '#2f4f4f' },
    { id: 'm9', label: 'Water', color: '#1e90ff' },
    { id: 'm10', label: 'Earth', color: '#8b4513' },
    { id: 'm11', label: 'Void', color: '#483d8b' },
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
  ]
};

const scaledMandalaData = [
  [ // Tier 0
    { type: 'Self-Harm', dc: 'DC 9', dice: 'd4' },
    { type: 'Retarget', dc: 'DC 9', dice: '—' }
  ],
  [ // Tier 1
    { type: 'Self-Harm', dc: 'DC 11', dice: 'd6' },
    { type: 'Retarget', dc: 'DC 11', dice: '—' },
    { type: 'Multi-Target', dc: 'DC 11', dice: 'd4' },
    { type: 'Close Range', dc: 'DC 11', dice: 'd6' }
  ],
  [ // Tier 2
    { type: 'Self-Harm', dc: 'DC 13', dice: 'd8' },
    { type: 'Retarget', dc: 'DC 13', dice: '—' },
    { type: 'Multi-Target', dc: 'DC 13', dice: 'd6' },
    { type: 'Close Range', dc: 'DC 13', dice: 'd8' },
    { type: 'Anti-School', dc: 'DC 13', dice: '—' },
    { type: 'Alter Environment', dc: 'DC 13', dice: 'd4' }
  ],
  [ // Tier 3
    { type: 'Self-Harm', dc: 'DC 15', dice: 'd10' },
    { type: 'Retarget', dc: 'DC 15', dice: 'd4' },
    { type: 'Multi-Target', dc: 'DC 15', dice: 'd8' },
    { type: 'Close Range', dc: 'DC 15', dice: 'd10' },
    { type: 'Anti-School', dc: 'DC 15', dice: 'd6' },
    { type: 'Alter Environment', dc: 'DC 15', dice: 'd6' },
    { type: 'Zone', dc: 'DC 15', dice: 'd4' },
    { type: 'Permanent Self-Harm', dc: 'DC 15', dice: 'd3' }
  ],
  [ // Tier 4
    { type: 'Self-Harm', dc: 'DC 17', dice: 'd12' },
    { type: 'Retarget', dc: 'DC 17', dice: '—' },
    { type: 'Multi-Target', dc: 'DC 17', dice: 'd10' },
    { type: 'Close Range', dc: 'DC 17', dice: 'd12' },
    { type: 'Anti-School', dc: 'DC 17', dice: '—' },
    { type: 'Alter Environment', dc: 'DC 17', dice: 'd8' },
    { type: 'Zone', dc: 'DC 17', dice: 'd6' },
    { type: 'Permanent Self-Harm', dc: 'DC 17', dice: 'd6' },
    { type: 'Materia Leak', dc: 'DC 17', dice: 'd4' },
    { type: 'Permanent Zone', dc: 'DC 17', dice: '—' }
  ],
  [ // Tier 5
    { type: 'Self-Harm', dc: 'DC 19', dice: 'd20' },
    { type: 'Retarget', dc: 'DC 19', dice: '—' },
    { type: 'Multi-Target', dc: 'DC 19', dice: 'd12' },
    { type: 'Close Range', dc: 'DC 19', dice: 'd20' },
    { type: 'Anti-School', dc: 'DC 19', dice: '—' },
    { type: 'Alter Environment', dc: 'DC 19', dice: 'd10' },
    { type: 'Zone', dc: 'DC 19', dice: 'd8' },
    { type: 'Permanent Self-Harm', dc: 'DC 19', dice: '—' },
    { type: 'Materia Leak', dc: 'DC 19', dice: 'd8' },
    { type: 'Permanent Zone', dc: 'DC 19', dice: '—' },
    { type: 'Personal Systemic Lockout', dc: 'DC 19', dice: '—' },
    { type: 'Hex', dc: 'DC 19', dice: '—' }
  ]
];

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
  
  const size = 500;
  const cx = size / 2;
  const cy = size / 2;
  const outerRadius = 240;
  
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
    path.style.color = node.color; // for currentcolor in hover
    
    path.addEventListener('click', () => openModal(node, 'magic'));
    
    svg.appendChild(path);
    
    // Add text label
    const textAngle = startAngle;
    // Place text at 80% radius
    const textPos = polarToCartesian(cx, cy, outerRadius * 0.82, textAngle);
    
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", textPos.x);
    text.setAttribute("y", textPos.y);
    text.setAttribute("class", "node-text");
    
    // Rotate text to face outwards
    let rot = textAngle;
    if (rot > 90 && rot < 270) {
      rot += 180;
    }
    // If only 1 node, no rotation needed
    if (numNodes === 1) rot = 0;

    text.setAttribute("transform", `rotate(${rot}, ${textPos.x}, ${textPos.y})`);
    
    text.textContent = node.label;
    svg.appendChild(text);
  });
  
  // Draw 5 rings (Shadowdark tiers)
  for (let r = 1; r <= 5; r++) {
    const rRadius = (outerRadius / 5) * r;
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", cx);
    circle.setAttribute("cy", cy);
    circle.setAttribute("r", rRadius);
    circle.setAttribute("class", "tier-line");
    svg.appendChild(circle);
  }
  
  container.appendChild(svg);
}

function renderScaledMandala() {
  const container = document.getElementById('target-mandala');
  container.innerHTML = '';
  
  const size = 2000;
  const cx = size / 2;
  const cy = size / 2;
  
  const holeRadius = 150;
  const outerRadius = 900;
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
  scaledMandalaData.forEach((tier, tIndex) => {
    const numNodes = tier.length;
    const angleStep = 360 / numNodes;
    const innerR = holeRadius + tIndex * ringWidth;
    const outerR = innerR + ringWidth;
    
    // Draw slices
    tier.forEach((node, i) => {
      const startAngle = i * angleStep;
      const endAngle = (i + 1) * angleStep;
      
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      
      // Calculate arc with inner and outer radius
      const startOuter = polarToCartesian(cx, cy, outerR, endAngle);
      const endOuter = polarToCartesian(cx, cy, outerR, startAngle);
      const startInner = polarToCartesian(cx, cy, innerR, startAngle);
      const endInner = polarToCartesian(cx, cy, innerR, endAngle);
      const largeArcFlag = angleStep <= 180 ? "0" : "1";
      
      const d = [
        "M", startOuter.x, startOuter.y, 
        "A", outerR, outerR, 0, largeArcFlag, 0, endOuter.x, endOuter.y,
        "L", startInner.x, startInner.y,
        "A", innerR, innerR, 0, largeArcFlag, 1, endInner.x, endInner.y,
        "Z"
      ].join(" ");
      
      path.setAttribute("d", d);
      // Alternate colors slightly for visual distinction
      const brightness = (tIndex % 2 === 0) ? (i % 2 === 0 ? '#2d2d2d' : '#333333') : (i % 2 === 0 ? '#383838' : '#2d2d2d');
      path.setAttribute("fill", brightness);
      path.setAttribute("stroke", "#555555");
      path.setAttribute("stroke-width", "2");
      
      svg.appendChild(path);
      
      // Add text label
      const textAngle = startAngle + angleStep / 2;
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
      text.setAttribute("font-size", "14px");
      text.setAttribute("font-weight", "600");

      // Multiple lines
      const typeSpan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
      typeSpan.setAttribute("x", textPos.x);
      typeSpan.setAttribute("dy", "-1em");
      typeSpan.textContent = node.type;
      
      const diceSpan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
      diceSpan.setAttribute("x", textPos.x);
      diceSpan.setAttribute("dy", "1.2em");
      diceSpan.textContent = node.dice !== '—' ? node.dice : '';
      diceSpan.setAttribute("fill", "#ff9800"); // highlight dice
      
      const dcSpan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
      dcSpan.setAttribute("x", textPos.x);
      dcSpan.setAttribute("dy", "1.2em");
      dcSpan.textContent = node.dc;
      dcSpan.setAttribute("fill", "#9e9e9e");
      
      text.appendChild(typeSpan);
      text.appendChild(diceSpan);
      text.appendChild(dcSpan);
      
      svg.appendChild(text);
    });
    
    // Tier Label
    const tierText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    tierText.setAttribute("x", cx);
    tierText.setAttribute("y", cy - innerR - 10);
    tierText.textContent = "T" + tIndex;
    tierText.setAttribute("fill", "#ffffff");
    tierText.setAttribute("font-size", "18px");
    tierText.setAttribute("font-weight", "bold");
    tierText.setAttribute("text-anchor", "middle");
    svg.appendChild(tierText);
  });

  // Clock numbers 1-12 with a 10-degree offset to avoid hitting any tier boundary lines
  for (let i = 1; i <= 12; i++) {
    const angle = (i * 30) - 20; // 12 * 30 - 20 = 340 (10 degree offset since top is usually 0 but here 0 is top). Wait, my formula for clock was: `(i * 30) - 15` without offset, `(i*30) - 5` with 10 degree offset.
    // Let's use exactly what we derived: angle = (i * 30) - 20.
    // 1 -> 10, 2 -> 40, ..., 12 -> 340.
    
    const textPos = polarToCartesian(cx, cy, outerRadius + 40, angle);
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", textPos.x);
    text.setAttribute("y", textPos.y);
    text.textContent = i.toString();
    text.setAttribute("fill", "#ffeb3b");
    text.setAttribute("font-size", "36px");
    text.setAttribute("font-weight", "bold");
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("dominant-baseline", "middle");
    svg.appendChild(text);
    
    // Optional tick mark
    const tickStart = polarToCartesian(cx, cy, outerRadius, angle);
    const tickEnd = polarToCartesian(cx, cy, outerRadius + 15, angle);
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", tickStart.x);
    line.setAttribute("y1", tickStart.y);
    line.setAttribute("x2", tickEnd.x);
    line.setAttribute("y2", tickEnd.y);
    line.setAttribute("stroke", "#ffeb3b");
    line.setAttribute("stroke-width", "3");
    svg.appendChild(line);
  }
  
  // Center Label
  const centerText = document.createElementNS("http://www.w3.org/2000/svg", "text");
  centerText.setAttribute("x", cx);
  centerText.setAttribute("y", cy);
  centerText.textContent = "SCALED";
  centerText.setAttribute("fill", "#ffffff");
  centerText.setAttribute("font-size", "24px");
  centerText.setAttribute("font-weight", "bold");
  centerText.setAttribute("text-anchor", "middle");
  centerText.setAttribute("dominant-baseline", "middle");
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

document.getElementById('target-slots').addEventListener('change', (e) => {
  // Disabled
});

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
        // Target slots no longer change Scaled Mandala
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
renderScaledMandala();
