// program.js
import { Car } from "./car.js";
import { drawBoard } from "./board.js";
import { executeCommands } from "./commands.js";

const programArea = document.getElementById("program");
const scoreDisplay = document.getElementById("score");
const runBtn = document.getElementById("runBtn");
const resetBtn = document.getElementById("resetBtn");

let score = 200;
const car = new Car();

let running = false;
let stopRequested = false;

export function initProgram() {
  document.querySelectorAll(".sidebar .block").forEach(block => {
    block.addEventListener("dragstart", dragStart);
  });

  runBtn.addEventListener("click", runProgram);
  resetBtn.addEventListener("click", resetGame);

  programArea.addEventListener("dragover", e => e.preventDefault());
  programArea.addEventListener("drop", addBlock);

  // Support nested drop inside blocks
  programArea.addEventListener("dragover", e => e.preventDefault());

  updateScore();
  drawBoard(car.position);
}

function dragStart(e) {
  e.dataTransfer.setData("text", e.target.getAttribute("data-command"));
  e.dataTransfer.setData("textLabel", e.target.textContent);
  e.dataTransfer.setData("isNested", e.target.hasAttribute("data-nested"));
}

export function addBlock(event) {
  event.preventDefault();
  const command = event.dataTransfer.getData("text");
  const label = event.dataTransfer.getData("textLabel");
  const isNested = event.dataTransfer.getData("isNested") === "true";

  const target = event.target.closest(".block, #program");

  // Create block container (div) with draggable
  const block = createBlockElement(command, label, isNested);

  if (target === programArea || !target) {
    programArea.appendChild(block);
  } else if (target.classList.contains("block")) {
    // If the block can have nested blocks
    if (target.hasAttribute("data-nested")) {
      let nestedContainer = target.querySelector(".nested-container");
      if (!nestedContainer) {
        nestedContainer = document.createElement("div");
        nestedContainer.classList.add("nested-container");
        nestedContainer.style.marginLeft = "20px";
        target.appendChild(nestedContainer);
      }
      nestedContainer.appendChild(block);
    } else {
      // Insert block after target
      target.after(block);
    }
  } else {
    programArea.appendChild(block);
  }
}

function createBlockElement(command, label, isNested) {
  const block = document.createElement("div");
  block.className = "block";
  block.textContent = label;
  block.setAttribute("data-command", command);
  if (isNested) block.setAttribute("data-nested", "true");
  block.draggable = true;
  block.addEventListener("dragstart", dragStart);

  // Allow drop inside for nested blocks that support nested commands
  if (isNested) {
    block.addEventListener("dragover", e => e.preventDefault());
    block.addEventListener("drop", addBlock);
  }
  return block;
}

function updateScore() {
  scoreDisplay.textContent = score;
}

async function runProgram() {
  if (running) return; // prevent double run
  running = true;
  stopRequested = false;

  score = Math.max(score - 5, 0);
  updateScore();

  car.reset();
  drawBoard(car.position);

  try {
    await executeCommands(getProgramCommands(programArea), car, () => stopRequested);
    alert("🎉 You reached the goal! +100 points");
    score += 100;
    updateScore();
  } catch (e) {
    if (e.message === "STOP") {
      alert("⏹️ Program stopped by user.");
    } else {
      alert("❌ Program error: " + e.message);
    }
  } finally {
    running = false;
  }
}

export function resetGame() {
  stopRequested = true;
  running = false;
  score = 200;
  updateScore();
  car.reset();
  drawBoard(car.position);
  // Clear program
  programArea.innerHTML = "";
}

export function getProgramCommands(container) {
  // Recursively parse blocks into structured command objects with children
  const cmds = [];
  for (const block of container.children) {
    if (!block.classList.contains("block")) continue;
    const command = block.getAttribute("data-command");
    const nested = block.querySelector(".nested-container");
    if (nested) {
      cmds.push({
        command,
        children: getProgramCommands(nested)
      });
    } else {
      cmds.push({ command });
    }
  }
  return cmds;
}
