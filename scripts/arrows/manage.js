import { drawArrow, updateArrowPath } from "../utils.js";

let arrows = [];
let arrowCounter = 0;

export const createArrow = (fromElement, toElement) => {
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
};

export const deleteAllConnectionsForNode = (element) => {
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
};

export const updateConnectedArrows = (element) => {
  arrows.forEach((ar) => {
    if (ar.from === element || ar.to === element) updateArrowPath(ar);
  });
};
