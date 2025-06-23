let arrows = [];
let arrowCounter = 0;
let svgContainer = null;

export const updateDraggableItem = ({ src, head, sub, nodeId }) => `
<div class="druggable-inner relative bg-gray-800 border-2 border-gray-600 rounded-lg p-6 w-64">
    <!-- Connection points with proper data attributes -->
    <div class="connection-point output absolute -right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full cursor-pointer opacity-75 hover:opacity-100 transition-all duration-200 z-10" 
         data-type="output" 
         data-node-id="${nodeId}"></div>
    
    <div class="connection-point input absolute -left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-green-500 rounded-full cursor-pointer opacity-75 hover:opacity-100 transition-all duration-200 z-10" 
         data-type="input" 
         data-node-id="${nodeId}"></div>
    
    <!-- Your existing content -->
    <div class="flex items-center mb-2">
        <div class="bg-gray-700 p-2 rounded mr-3 h-16 w-16">
            <img src=${src} alt=${head} srcset="" />
        </div>
        <div>
            <h3 class="text-white font-semibold text-lg">${head}</h3>
            <p class="text-gray-400 text-sm">${sub || ""}</p>
        </div>
    </div>
    
    <!-- Delete button -->
    <div class="item-delete absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-red-600 text-xs z-10">×</div>
</div>
`;

export function createCurvePath(startX, startY, endX, endY) {
  const controlPointOffset = Math.abs(endX - startX) * 0.5;
  const controlX1 = startX + controlPointOffset;
  const controlX2 = endX - controlPointOffset;

  return `M ${startX} ${startY} C ${controlX1} ${startY}, ${controlX2} ${endY}, ${endX} ${endY}`;
}

function getConnectionPointPosition(element, type) {
  const rect = element.getBoundingClientRect();
  const playgroundRect = document
    .getElementById("playground")
    .getBoundingClientRect();

  if (type === "output") {
    // Right side of the node
    return {
      x: rect.right - playgroundRect.left,
      y: rect.top + rect.height / 2 - playgroundRect.top,
    };
  } else {
    // Left side of the node
    return {
      x: rect.left - playgroundRect.left,
      y: rect.top + rect.height / 2 - playgroundRect.top,
    };
  }
}

export function createArrow(fromElement, toElement) {
  const arrowId = `arrow-${arrowCounter++}`;
  const arrow = {
    id: arrowId,
    from: fromElement,
    to: toElement,
    pathElement: null,
  };

  arrows.push(arrow);
  drawArrow(arrow);
  return arrow;
}

function drawArrow(arrow) {
  const svg = document.getElementById("arrow-container");

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("stroke", "#3b82f6");
  path.setAttribute("stroke-width", "2");
  path.setAttribute("fill", "none");
  path.setAttribute("marker-end", "url(#arrowhead)");
  path.id = arrow.id;

  arrow.pathElement = path;
  svg.appendChild(path);

  updateArrowPath(arrow);
}

function updateArrowPath(arrow) {
  const fromPos = getConnectionPointPosition(arrow.from, "output");
  const toPos = getConnectionPointPosition(arrow.to, "input");

  const pathData = createCurvePath(fromPos.x, fromPos.y, toPos.x, toPos.y);
  arrow.pathElement.setAttribute("d", pathData);
}

export function updateConnectedArrows(element) {
  arrows.forEach((arrow) => {
    if (arrow.from === element || arrow.to === element) {
      updateArrowPath(arrow);
    }
  });
}

export function deleteAllConnectionsForNode(element) {
  const connectedArrows = arrows.filter(
    (arrow) => arrow.from === element || arrow.to === element
  );

  const deleteConnection = (arrow) => {
    if (arrow.pathElement) arrow.pathElement.remove();

    const index = arrows.indexOf(arrow);
    if (index > -1) arrows.splice(index, 1);

    console.log("Arrow deleted:", arrow.id);
  };

  connectedArrows.forEach((arrow) => deleteConnection(arrow));
}
