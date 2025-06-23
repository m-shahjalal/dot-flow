import { createTempArrowPath } from "../utils.js";
import { createArrow } from "./manage.js";

let connectionState = {
  isConnecting: false,
  startElement: null,
  startType: null,
};

const startConnection = (element, type, point) => {
  connectionState.isConnecting = true;
  connectionState.startElement = element;
  connectionState.startType = type;

  point.style.boxShadow = "0 0 10px #3b82f6";
  document.body.style.cursor = "crosshair";
  createTempArrowPath(element);
};

const completeConnection = (endElement) => {
  console.log("end element", endElement);
  const arrow = createArrow(connectionState.startElement, endElement);
  console.log("Arrow created:", arrow);

  cancelConnection();
};

const cancelConnection = () => {
  document.body.style.cursor = "default";

  connectionState.isConnecting = false;
  connectionState.startElement = null;
  connectionState.startType = null;
  document.getElementById("temp").remove();
};

const handleConnectionClick = (e) => {
  e.stopPropagation();

  const isAvailable = e.target.classList.contains("connection-point");
  if (!isAvailable && connectionState.isConnecting) {
    return cancelConnection();
  }

  const clickedDataType = e.target.getAttribute("data-type");
  const clickedElement = e.target.closest(".draggable");

  const shouldStart =
    !connectionState.isConnecting && clickedDataType === "output";

  const shouldComplete =
    connectionState.isConnecting &&
    clickedDataType === "input" &&
    clickedElement !== connectionState.startElement;

  if (shouldStart) {
    startConnection(clickedElement, clickedDataType, e.target);
  } else if (shouldComplete) {
    completeConnection(clickedElement);
  } else if (connectionState.isConnecting) {
    cancelConnection();
  }
};

const createMarkerItem = () => {
  const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");

  const marker = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "marker"
  );
  marker.setAttribute("id", "arrowhead");
  marker.setAttribute("markerWidth", "6");
  marker.setAttribute("markerHeight", "7");
  marker.setAttribute("refX", "9");
  marker.setAttribute("refY", "3.5");
  marker.setAttribute("orient", "auto");
  marker.setAttribute("markerUnits", "strokeWidth");

  const polygon = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "polygon"
  );
  polygon.setAttribute("points", "0 0, 10 3.5, 0 7");
  polygon.setAttribute("fill", "#3b82f6");

  marker.appendChild(polygon);
  defs.appendChild(marker);

  return defs;
};

document.getElementById("arrow-container").appendChild(createMarkerItem());
document.addEventListener("click", handleConnectionClick);
