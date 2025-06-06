// board.js

const boardSize = 5;
const gameBoard = document.getElementById("gameBoard");

// Replace with your own car image URL or relative path
const carImageSrc = "https://cdn-icons-png.flaticon.com/512/743/743922.png";

const cellColors = [
  ["normal","normal","normal","normal","normal"],
  ["normal","normal","normal","normal","normal"],
  ["normal","normal","blue","normal","normal"],
  ["normal","normal","normal","normal","normal"],
  ["normal","normal","normal","normal","green"]
];

export function drawBoard(car) {
  if (!gameBoard) return;
  gameBoard.innerHTML = ""; // Clear board

  for (let y = 0; y < boardSize; y++) {
    for (let x = 0; x < boardSize; x++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.style.width = "60px";
      cell.style.height = "60px";
      cell.style.border = "1px solid #ccc";
      cell.style.display = "inline-block";
      cell.style.boxSizing = "border-box";
      cell.style.position = "relative";
      cell.style.backgroundColor = getColor(cellColors[y][x]);

      if (car.position.x === x && car.position.y === y) {
        const carImg = document.createElement("img");
        carImg.src = carImageSrc;
        carImg.style.width = "40px";
        carImg.style.height = "40px";
        carImg.style.position = "absolute";
        carImg.style.top = "10px";
        carImg.style.left = "10px";
        carImg.style.transition = "transform 0.3s ease";
        carImg.style.transformOrigin = "center center";

        // Rotate car image based on direction (degrees)
        // 0 = up (0deg), 1 = right (90deg), 2 = down (180deg), 3 = left (270deg)
        const rotationDegrees = car.direction * 90;
        carImg.style.transform = `rotate(${rotationDegrees}deg)`;

        cell.appendChild(carImg);
      }

      gameBoard.appendChild(cell);
    }
    const br = document.createElement("br");
    gameBoard.appendChild(br);
  }
}

function getColor(type) {
  switch(type) {
    case "blue": return "#add8e6";   // light blue
    case "green": return "#90ee90";  // light green
    case "normal": return "#f9f9f9";
    default: return "#f9f9f9";
  }
}
