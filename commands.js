// commands.js

export async function executeCommands(commands, car, stopRequested) {
  for (let i = 0; i < commands.length; i++) {
    if (stopRequested()) throw new Error("STOP");

    const cmd = commands[i];

    switch (cmd.command) {
      case "forward":
        car.moveForward();
        break;

      case "right":
        car.turnRight();
        break;

      case "left":
        car.turnLeft();
        break;

      case "if-blue":
        if (car.getCurrentCellType() === "blue" && cmd.children) {
          await executeCommands(cmd.children, car, stopRequested);
        }
        break;

      case "if-green":
        if (car.getCurrentCellType() === "green" && cmd.children) {
          await executeCommands(cmd.children, car, stopRequested);
        }
        break;

      case "repeat-2":
        if (cmd.children) {
          for (let r = 0; r < 2; r++) {
            await executeCommands(cmd.children, car, stopRequested);
          }
        }
        break;

      case "repeat-forever":
        if (cmd.children) {
          while (true) {
            if (stopRequested()) throw new Error("STOP");
            await executeCommands(cmd.children, car, stopRequested);
          }
        }
        break;

      default:
        console.warn("Unknown command:", cmd.command);
    }

    await delay(400);
  }
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}