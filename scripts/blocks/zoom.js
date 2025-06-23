let zoomLevel = 50;
let isDragging = false;
let isSpacePressed = false;
let isMetaPress = false;
let lastMouseX = 0;
let lastMouseY = 0;
let currentX = 0;
let currentY = 0;

const zoomDisplay = document.querySelector("#zoom div");
const zoomContainer = document.querySelector("#playground");

document.querySelectorAll("#zoom button").forEach((btn) => {
  btn.addEventListener("click", function () {
    if (this.textContent === "+") {
      zoomLevel = Math.min(200, zoomLevel + 10);
    } else if (this.textContent === "−") {
      zoomLevel = Math.max(10, zoomLevel - 10);
    }
    zoomDisplay.textContent = zoomLevel + "%";
    zoomContainer.style.transform = `scale(${(zoomLevel * 2) / 100})`;
    zoomContainer.style.transformOrigin = "center center";
  });
});

document.addEventListener("keydown", (e) => {
  if (e.code === "Space" && !isSpacePressed) {
    isSpacePressed = true;
    zoomContainer.style.cursor = "grab";
    e.preventDefault();
  }

  if (e.metaKey || e.ctrlKey) {
    isMetaPress = true;
    e.preventDefault();
  }
});

document.addEventListener("keyup", (e) => {
  if (e.code === "Space") {
    isSpacePressed = false;
    isDragging = false;
    zoomContainer.style.cursor = "default";
    isMetaPress = false;
  }
});

zoomContainer.addEventListener("mousedown", (e) => {
  if (isSpacePressed) {
    isDragging = true;
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
    zoomContainer.style.cursor = "grabbing";
  }
});

document.addEventListener("mousemove", (e) => {
  if (isDragging && isSpacePressed) {
    const deltaX = e.clientX - lastMouseX;
    const deltaY = e.clientY - lastMouseY;

    currentX += deltaX;
    currentY += deltaY;

    zoomContainer.style.transform = `translate(${currentX}px, ${currentY}px) scale(${
      (zoomLevel * 2) / 100
    })`;

    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
  }
});

document.addEventListener("mouseup", () => {
  if (isDragging) {
    isDragging = false;
    zoomContainer.style.cursor = isSpacePressed ? "grab" : "default";
  }
});

document.addEventListener("wheel", (event) => {
  if (!isMetaPress) return;
  event.preventDefault();
  if (event.deltaY < 0) {
    zoomLevel = Math.min(200, zoomLevel + 10);
    zoomDisplay.textContent = zoomLevel + "%";
    zoomContainer.style.transform = `scale(${(zoomLevel * 2) / 100})`;
    zoomContainer.style.transformOrigin = "center center";
  }
  if (event.deltaY > 0) {
    zoomLevel = Math.max(10, zoomLevel - 10);

    zoomDisplay.textContent = zoomLevel + "%";
    zoomContainer.style.transform = `scale(${(zoomLevel * 2) / 100})`;
    zoomContainer.style.transformOrigin = "center center";
  }
});
