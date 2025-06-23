import { createArrow } from "./manage-arrow.js";

let connectionState = {
  isConnecting: false,
  startElement: null,
  startType: null,
};

function initializeConnectionSystem() {
  document.addEventListener("click", handleConnectionClick);
}

function handleConnectionClick(e) {
  if (!e.target.classList.contains("connection-point")) {
    // If clicking elsewhere, cancel connection mode
    if (connectionState.isConnecting) {
      cancelConnection();
    }
    return;
  }

  e.stopPropagation();
  const clickedPoint = e.target;
  const clickedType = clickedPoint.getAttribute("data-type");
  const clickedNodeId = clickedPoint.getAttribute("data-node-id");
  const clickedElement = clickedPoint.closest(".draggable");

  if (!connectionState.isConnecting) {
    // Start connection - only allow starting from output points
    if (clickedType === "output") {
      startConnection(clickedElement, clickedType, clickedPoint);
    }
  } else {
    // Complete connection - only allow ending at input points
    if (
      clickedType === "input" &&
      clickedElement !== connectionState.startElement
    ) {
      completeConnection(clickedElement);
    } else {
      cancelConnection();
    }
  }
}

function startConnection(element, type, point) {
  connectionState.isConnecting = true;
  connectionState.startElement = element;
  connectionState.startType = type;

  // Visual feedback
  point.style.transform = "translate(-50%, -50%) scale(1.3)";
  point.style.boxShadow = "0 0 10px #3b82f6";
  document.body.style.cursor = "crosshair";

  console.log("Connection started from:", element);
}

function completeConnection(endElement) {
  // Create the arrow
  const arrow = createArrow(connectionState.startElement, endElement);
  console.log("Arrow created:", arrow);

  cancelConnection();
}

function cancelConnection() {
  // Reset visual feedback
  document.querySelectorAll(".connection-point").forEach((point) => {
    point.style.transform = "translate(-50%, -50%) scale(1)";
    point.style.boxShadow = "none";
  });
  document.body.style.cursor = "default";

  // Reset state
  connectionState.isConnecting = false;
  connectionState.startElement = null;
  connectionState.startType = null;
}

// Initialize the system
initializeConnectionSystem();
