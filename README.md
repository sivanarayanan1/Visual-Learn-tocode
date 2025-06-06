# Code Maze Game

A simple visual programming game where you control a car on a 5x5 board using drag-and-drop code blocks. Guide the car to the green goal square by assembling a sequence of commands!

## Features

- Drag-and-drop code blocks to build your program.
- Blocks include: move forward, turn, conditionals (if-blue, if-green), and loops (repeat 2 times, repeat forever).
- Visual feedback: see the car move and rotate on the board.
- Score system: earn points for reaching the goal, lose points for running or resetting.
- Colorful, interactive UI.

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Edge, Safari, etc.)

### Running the Game

1. Clone or download this repository.
2. Open `index.html` in your web browser.

No build step or server is required.

## Project Structure

- [`index.html`](index.html): Main HTML file, contains the game layout and UI.
- [`style.css`](style.css): Styles for the board, blocks, and buttons.
- [`main.js`](main.js): Entry point, initializes the game.
- [`program.js`](program.js): Handles the drag-and-drop programming interface, program execution, and score.
- [`commands.js`](commands.js): Executes the parsed program commands, including control flow and delays.
- [`car.js`](car.js): Defines the `Car` class, movement logic, and cell type detection.
- [`board.js`](board.js): Renders the game board and car visually.
- [`LICENSE`](LICENSE): GNU GPL v3 license.

## How to Play

1. Drag code blocks from the sidebar into the "Your Program" area.
2. Arrange and nest blocks to create your desired sequence.
3. Click **Run** to execute your program and watch the car move.
4. Reach the green square to win points!
5. Click **Reset** to clear your program and reset the board.

## Example Blocks

- **Move forward 🚗**: Move the car one square forward.
- **Turn right ↻ / Turn left ↺**: Rotate the car.
- **If square is blue 🔵 / If square is green 🟢**: Run nested blocks only if the car is on a blue/green square.
- **Repeat forever ♾️ / Repeat 2 times 🔁**: Loop nested blocks.

## License

This project is licensed under the GNU General Public License v3.0. See [`LICENSE`](LICENSE) for details.

---

Enjoy coding and solving the maze!
