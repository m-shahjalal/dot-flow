function setupArrowhead() {
  const svg = document.getElementById("arrow-container");

  // Create defs element for definitions
  const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");

  // Create marker element
  const marker = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "marker"
  );
  marker.setAttribute("id", "arrowhead");
  marker.setAttribute("markerWidth", "10");
  marker.setAttribute("markerHeight", "7");
  marker.setAttribute("refX", "9");
  marker.setAttribute("refY", "3.5");
  marker.setAttribute("orient", "auto");
  marker.setAttribute("markerUnits", "strokeWidth");

  // Create the arrow shape
  const polygon = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "polygon"
  );
  polygon.setAttribute("points", "0 0, 10 3.5, 0 7");
  polygon.setAttribute("fill", "#3b82f6");

  marker.appendChild(polygon);
  defs.appendChild(marker);
  svg.appendChild(defs);

  console.log("Arrowhead marker added to SVG");
}

setupArrowhead();

// Make it globally accessible for testing
window.setupArrowhead = setupArrowhead;
