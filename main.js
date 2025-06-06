// main.js
import { initProgram } from "./program.js";

window.onload = () => {
  initProgram();
};

import { drawBoard } from "./board.js";

const car = {
  position: { x: 0, y: 0 },
  direction: 0 // 0=up, 1=right, 2=down, 3=left
};

document.addEventListener("DOMContentLoaded", () => {
  drawBoard(car);
});