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

// Render Magic Mandala (12 slices, 5 rings)
function renderMagicMandala() {
  const container = document.getElementById('magic-mandala');
  container.innerHTML = '';
  
  const size = 500;
  const cx = size / 2;
  const cy = size / 2;
  const outerRadius = 240;
  
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", `0 0 ${size} ${size}`);
  
  const angleStep = 360 / 12;

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

function renderTargetMandala() {
  const container = document.getElementById('target-mandala');
  container.innerHTML = '';
  
  const size = 500;
  const cx = size / 2;
  const cy = size / 2;
  const outerRadius = 240;
  
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", `0 0 ${size} ${size}`);
  
  const angleStep = 360 / 12;

  appState.targetNodes.forEach((node, i) => {
    const startAngle = i * angleStep;
    const endAngle = (i + 1) * angleStep;
    
    const shiftedStart = startAngle - angleStep / 2;
    const shiftedEnd = endAngle - angleStep / 2;

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", describeArc(cx, cy, outerRadius, shiftedStart, shiftedEnd));
    path.setAttribute("fill", node.color);
    path.setAttribute("class", "node-path segment-line");
    path.style.color = node.color;
    
    path.addEventListener('click', () => openModal(node, 'target'));
    
    svg.appendChild(path);
    
    const textAngle = startAngle;
    const textPos = polarToCartesian(cx, cy, outerRadius * 0.70, textAngle);
    
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", textPos.x);
    text.setAttribute("y", textPos.y);
    text.setAttribute("class", "node-text");
    
    let rot = textAngle;
    if (rot > 90 && rot < 270) {
      rot += 180;
    }
    text.setAttribute("transform", `rotate(${rot}, ${textPos.x}, ${textPos.y})`);
    
    // Multi-line for labels like "Self @ Close"
    const parts = node.label.split(' @ ');
    if (parts.length === 2) {
      const tspan1 = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
      tspan1.setAttribute("x", textPos.x);
      tspan1.setAttribute("dy", "-0.6em");
      tspan1.textContent = parts[0];
      
      const tspan2 = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
      tspan2.setAttribute("x", textPos.x);
      tspan2.setAttribute("dy", "1.2em");
      tspan2.textContent = "@ " + parts[1];
      
      text.appendChild(tspan1);
      text.appendChild(tspan2);
    } else {
      text.textContent = node.label;
    }
    
    svg.appendChild(text);
  });
  
  // Just a single inner ring for decoration
  const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  circle.setAttribute("cx", cx);
  circle.setAttribute("cy", cy);
  circle.setAttribute("r", outerRadius * 0.4);
  circle.setAttribute("class", "tier-line");
  svg.appendChild(circle);

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
      renderTargetMandala();
    }
  }
  
  closeModal();
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
        renderMagicMandala();
        renderTargetMandala();
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
renderMagicMandala();
renderTargetMandala();
