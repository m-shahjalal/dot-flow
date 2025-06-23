const toggleLibrary = () => {
  const drawer = document.getElementById("drawer");

  if (drawer.style.right === "" || drawer.style.right === "0px") {
    drawer.style.right = "-100%";
  } else {
    drawer.style.right = "0px";
  }
};

const handleToggleClick = () => {
  if (!document.fullscreenElement) {
    document.getElementById("expand")?.classList.add("hidden");
    document.getElementById("minimize")?.classList.remove("hidden");
    document.documentElement.requestFullscreen();
  } else {
    document.getElementById("minimize")?.classList.add("hidden");
    document.getElementById("expand")?.classList.remove("hidden");
    document.exitFullscreen?.();
  }
};

const handleReset = () => {
  if (confirm("Are you sure to rest things?")) window.location.reload();
};

const header = document.querySelector("header");
const zoomController = document.createElement("div");
zoomController.innerHTML = `
<div
    id="zoom"
    class="mr-1 p-1 pr-2 flex items-center gap-2 border-r border-r-gray-200"
>
    <button class="zoom-control" title="Zoom out">−</button>
    <div class="text-xs text-gray-600 w-fit text-center zoom-level">
    50%
    </div>
    <button class="zoom-control" title="Zoom in">+</button>
</div>
`;

const tools = [
  { id: "expand", icon: "/public/expand.png", onclick: handleToggleClick },
  { id: "minimize", icon: "/public/minimize.png", onclick: handleToggleClick },
  { id: "reset", icon: "/public/reset.png", onclick: handleReset },
  { id: "library", icon: "/public/dashboard.png", onclick: toggleLibrary },
];

header.appendChild(zoomController);
tools.forEach(({ title, id, cursor, icon, onclick }) => {
  const item = document.createElement("button");

  item.classList.add(
    "border",
    "border-gray-200",
    "rounded",
    "p-1",
    "bg-white",
    "text-gray-800",
    "cursor-pointer"
  );
  if (id === "minimize") item.classList.add("hidden");
  item.innerHTML = `<img src=${icon} style="width:20px;height:20px" />`;
  item.id = id;
  item.setAttribute("title", title);
  item.setAttribute("data-tool", id);
  item.setAttribute("data-cursor", cursor);

  item.onclick = onclick;
  header.appendChild(item);
});
