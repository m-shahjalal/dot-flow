import {
  deleteAllConnectionsForNode,
  updateConnectedArrows,
} from "../arrows/manage.js";
import {
  createDrawerItemContent,
  createPlaygroundItemContent,
  drawerElements,
} from "../utils.js";

// create individual item
const makeDrawerItem = (element) => {
  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  element.addEventListener("mousedown", (e) => {
    e.preventDefault();
    const list = ["item-delete", "connection-point"];
    if (list.some((i) => e.target.classList.contains(i))) return;

    isDragging = true;
    offsetX = e.clientX - element.offsetLeft;
    offsetY = e.clientY - element.offsetTop;
    element.style.cursor = "grabbing";
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    element.style.left = e.clientX - offsetX + "px";
    element.style.top = e.clientY - offsetY + "px";

    // make dynamic position draw
    updateConnectedArrows(element);
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
    element.style.cursor = "grab";
  });

  document.getElementById("playground").appendChild(element);
};

// generate drawer item
drawerElements.map(({ src, head, sub, id }) => {
  const elm = document.createElement("div");
  elm.onclick = (e) => {
    const draggable = document.createElement("div");
    const nodeId = `node-${Date.now()}-${id}`;

    draggable.classList.add("draggable");
    draggable.style.position = "absolute";
    draggable.style.top = "200px";
    draggable.style.left = "0px";
    draggable.style.cursor = "grab";
    draggable.innerHTML = createPlaygroundItemContent({
      src,
      head,
      sub,
      nodeId,
    });

    const deleteBtn = draggable.querySelector(".item-delete");
    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      deleteAllConnectionsForNode(draggable);
      draggable.remove();
    });

    makeDrawerItem(draggable);
  };
  elm.innerHTML = createDrawerItemContent({ src, head, sub });
  document.getElementById("drawer").appendChild(elm);
});

// close the drawer
document.getElementById("close-drawer").addEventListener("click", (e) => {
  document.getElementById("drawer").style.right = "-100%";
});
