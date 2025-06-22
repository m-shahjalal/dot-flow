function makeDraggable(element) {
  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  element.addEventListener("mousedown", (e) => {
    e.preventDefault();
    isDragging = true;

    offsetX = e.clientX - element.offsetLeft;
    offsetY = e.clientY - element.offsetTop;

    element.style.cursor = "grabbing";
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    element.style.left = e.clientX - offsetX + "px";
    element.style.top = e.clientY - offsetY + "px";
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
    element.style.cursor = "grab";
  });
}

const elements = [
  { id: 1, src: "/public/bot.png", head: "AI Agent" },
  { id: 2, src: "/public/edit.png", head: "Edit the flow" },
  { id: 3, src: "/public/mail.png", head: "Trigger mail" },
  { id: 4, src: "/public/database.png", head: "Save to database" },
];

const item = ({ src, head, sub }) => `
<div class="flex flex-col items-center mb-8 cursor-pointer">
  <div class="bg-gray-800 border-2 border-gray-600 rounded-lg p-6 w-64 relative">
    <div class="flex items-center mb-2">
      <div class="bg-gray-700 p-2 rounded mr-3 h-16 w-16">
        <img src=${src} alt=${head} srcset="" />
      </div>
      <div>
        <h3 class="text-white font-semibold text-lg">${head}</h3>
        <p class="text-gray-400 text-sm">${sub}</p>
      </div>
    </div>
  </div>
</div>
`;

const druggableItem = ({ src, head, sub }) => `
<div class="bg-gray-800 border-2 border-gray-600 rounded-lg p-6 w-64 relative">
  <div class="flex items-center mb-2">
    <div class="bg-gray-700 p-2 rounded mr-3 h-16 w-16">
      <img src=${src} alt=${head} srcset="" />
    </div>
    <div>
      <h3 class="text-white font-semibold text-lg">${head}</h3>
      <p class="text-gray-400 text-sm">${sub}</p>
    </div>
  </div>
</div>
`;

elements.map(({ src, head, id, sub }) => {
  const elm = document.createElement("div");

  elm.onclick = (e) => {
    const draggable = document.createElement("div");
    draggable.classList.add("draggable");

    draggable.style.position = "absolute";
    draggable.style.top = "200px";
    draggable.style.left = "0px";
    draggable.style.cursor = "grab";

    draggable.innerHTML = druggableItem({ src, head, sub });

    makeDraggable(draggable);

    document.getElementById("playground").appendChild(draggable);
  };

  elm.innerHTML = item({ src, head, sub });
  document.getElementById("drawer").appendChild(elm);
});

document.getElementById("close-drawer").addEventListener("click", (e) => {
  document.getElementById("drawer").style.right = "-100%";
});
