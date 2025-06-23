export const drawerElements = [
  { id: 1, src: "/public/bot.png", head: "AI Agent" },
  { id: 2, src: "/public/edit.png", head: "Edit the flow" },
  { id: 3, src: "/public/mail.png", head: "Trigger mail" },
  { id: 4, src: "/public/database.png", head: "Save to database" },
];

export const createPlaygroundItemContent = ({ src, head, sub, nodeId }) => `
<div class="druggable-inner relative bg-gray-800 border-2 border-gray-600 rounded-lg p-6 w-64">
    <div class="connection-point output" data-type="output" data-node-id="${nodeId}"></div>
    <div class="connection-point input" data-type="input" data-node-id="${nodeId}"></div>
    
    <div class="flex items-center mb-2">
        <div class="bg-gray-700 p-2 rounded mr-3 h-16 w-16">
            <img src=${src} alt=${head} srcset="" />
        </div>
        <div>
            <h3 class="text-white font-semibold text-lg">${head}</h3>
            <p class="text-gray-400 text-sm">${sub || ""}</p>
        </div>
    </div>
    
    <div class="item-delete absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-red-600 text-xs z-10">×</div>
</div>
`;

export const createDrawerItemContent = ({ src, head, sub }) => `
<div class="flex flex-col items-center mb-8 cursor-pointer">
  <div class="bg-gray-800 border-2 border-gray-600 rounded-lg p-6 w-64 relative">
    <div class="flex items-center mb-2">
      <div class="bg-gray-700 p-2 rounded mr-3 h-16 w-16">
        <img src=${src} alt=${head} srcset="" />
      </div>
      <div>
        <h3 class="text-white font-semibold text-lg">${head}</h3>
        <p class="text-gray-400 text-sm">${sub || ""}</p>
      </div>
    </div>
  </div>
</div>
`;

export const drawArrow = (arrow) => {
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("stroke", "#3b82f6");
  path.setAttribute("stroke-width", "2");
  path.setAttribute("fill", "none");
  path.setAttribute("marker-end", "url(#arrowhead)");
  path.id = arrow.id;

  arrow.pathElement = path;
  document.getElementById("arrow-container").appendChild(path);

  updateArrowPath(arrow);
};

export const updateArrowPath = (arrow) => {
  const fromPos = getConnectionPointPosition(
    arrow.from.getBoundingClientRect(),
    "output"
  );
  const toPos = getConnectionPointPosition(
    arrow.to.getBoundingClientRect(),
    "input"
  );
  const pathData = createCurvePath(fromPos.x, fromPos.y, toPos.x, toPos.y);

  arrow.pathElement.setAttribute("d", pathData);
};

export const createTempArrowPath = (startElement) => {
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("stroke", "#3b82f6");
  path.setAttribute("stroke-width", "2");
  path.setAttribute("fill", "none");
  path.setAttribute("marker-end", "url(#arrowhead)");
  path.id = "temp";
  document.getElementById("arrow-container").appendChild(path);

  document.getElementById("playground").addEventListener("mousemove", (e) => {
    console.log("e", e.clientX, startElement);
    const fromPos = getConnectionPointPosition(
      startElement.getBoundingClientRect(),
      "output"
    );
    const pathData = createCurvePath(
      fromPos.x,
      fromPos.y,
      e.clientX,
      e.clientY
    );
    path.setAttribute("d", pathData);
  });
};

const getConnectionPointPosition = ({ left, right, top, height }, type) => {
  const doc = document.getElementById("playground").getBoundingClientRect();

  return {
    x: (type === "input" ? left : right) - doc.left,
    y: top + height / 2 - doc.top,
  };
};

const createCurvePath = (startX, startY, endX, endY) => {
  const controlPointOffset = Math.abs(endX - startX) * 0.5;
  const controlX1 = startX + controlPointOffset;
  const controlX2 = endX - controlPointOffset;
  return `M ${startX} ${startY} C ${controlX1} ${startY}, ${controlX2} ${endY}, ${endX} ${endY}`;
};
