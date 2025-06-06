// car.js

const DIRECTIONS = [
  { x: 0, y: -1 },  // up
  { x: 1, y: 0 },   // right
  { x: 0, y: 1 },   // down
  { x: -1, y: 0 }   // left
];

export class Car {
  constructor() {
    this.reset();
  }

  reset() {
    this.position = { x: 0, y: 0 };
    this.direction = 0; // Facing up initially
  }

  moveForward() {
    const move = DIRECTIONS[this.direction];
    const newX = this.position.x + move.x;
    const newY = this.position.y + move.y;
    
    if (newX < 0 || newX >= 5 || newY < 0 || newY >= 5) {
      return;
    }
    this.position = { x: newX, y: newY };
  }

  turnRight() {
    this.direction = (this.direction + 1) % 4;
  }

  turnLeft() {
    this.direction = (this.direction + 3) % 4;
  }

  getCurrentCellType() {
    if (this.position.x === 2 && this.position.y === 2) return "blue";
    if (this.position.x === 4 && this.position.y === 4) return "green";
    return "normal";
  }
}
