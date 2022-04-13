import "./styles/index.css";
const psInstaller = require("./scripts/placementSystem.js");

const main = document.querySelector("main");

const gameboard = createGameGrid();
const controls = createBoardControls();

let startPage;
let passToPlayerPage;
let selectedShip = null;
const targetingSystem = {
  targetElement: null,
  targetMarker: "x",
  hitMarker: "",
};

main.appendChild(gameboard);
main.appendChild(controls);

const boardEl = document.querySelector(".gameboard");
const boardCells = [...boardEl.querySelectorAll(".play-cells")];
const placementSystem = psInstaller(document, boardEl, boardCells);
boardEl.addEventListener("wheel", placementSystem.rotatePlacement);

// Update UI
// Start Page
// Single Player
// Enter Player Name
// Multiplayer
// Player 1 Name
// Player 2 Name
// Deployment Page
// Gameplay Page
// Change Player Page
// Change board view

// Gameboard/Grid creation
function createGameGrid() {
  const rowHeaders = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const columnHeaders = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
  const grid = document.createElement("div");
  grid.className = "gameboard";

  for (let rowCounter = 0; rowCounter < rowHeaders.length + 1; rowCounter++) {
    const row = document.createElement("div");
    row.id = "row-" + rowCounter;
    row.className = "gameboard-rows";
    for (
      let cellCounter = 0;
      cellCounter < columnHeaders.length + 1;
      cellCounter++
    ) {
      const cell = document.createElement("div");
      if (rowCounter === 0 && cellCounter === 0) {
        cell.textContent = " ";
      } else if (rowCounter === 0 && cellCounter !== 0) {
        cell.textContent = columnHeaders[cellCounter - 1].toUpperCase();
        cell.class = `header-cells`;
      } else if (rowCounter !== 0 && cellCounter === 0) {
        cell.textContent = rowHeaders[rowCounter - 1];
        cell.class = `header-cells`;
      } else {
        cell.textContent = "";
        cell.id = `${columnHeaders[cellCounter - 1]}${
          rowHeaders[rowCounter - 1]
        }`;
        cell.addEventListener("click", targetCell);
        // cell.addEventListener("mouseover", placementSystem.placeModeIn);
        // cell.addEventListener("mouseout", placementSystem.placeModeOut);
        cell.classList.add("play-cells");
      }
      cell.classList.add("gameboard-cells");
      row.appendChild(cell);
    }
    grid.appendChild(row);
  }

  return grid;
}

function switchPage(pageNum) {
  if (pageNum === 0) {
    //Start Page
  } else if (pageNum === 1) {
  } else {
  }
}

// No header cells version
function createGameGrid1() {
  const rowHeaders = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const columnHeaders = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
  const grid = document.createElement("div");
  grid.className = "gameboard";

  for (let rowCounter = 0; rowCounter < rowHeaders.length; rowCounter++) {
    const row = document.createElement("div");
    row.id = "row-" + rowCounter;
    row.className = "gameboard-rows";
    for (
      let cellCounter = 0;
      cellCounter < columnHeaders.length;
      cellCounter++
    ) {
      const cell = document.createElement("div");
      cell.textContent = "";
      cell.id = `${columnHeaders[cellCounter]}${rowHeaders[rowCounter]}`;
      cell.addEventListener("click", targetCell);
      cell.classList.add("play-cells");
      cell.classList.add("gameboard-cells");
      row.appendChild(cell);
    }
    grid.appendChild(row);
  }
  return grid;
}

// Controls and game ui interaction
function createBoardControls() {
  // Container
  const div = document.createElement("div");
  div.className = "control-con";

  const targetDisplay = document.createElement("div");
  targetDisplay.className = "target-display";
  const targetAOCon = document.createElement("div");
  const targetAOName = document.createElement("span");
  targetAOName.textContent = "Enemy AO";
  const targetAOSwitch = document.createElement("button");
  targetAOSwitch.textContent = "Switch AO";
  const targetCoordCon = document.createElement("div");
  const targetCoordLabel = document.createElement("span");
  targetCoordLabel.textContent = "Target Coord: ";
  const targetCoordValue = document.createElement("span");
  targetCoordValue.textContent = "XX";

  targetAOCon.appendChild(targetAOName);
  targetAOCon.appendChild(targetAOSwitch);
  targetCoordCon.appendChild(targetCoordLabel);
  targetCoordCon.appendChild(targetCoordValue);
  targetDisplay.appendChild(targetAOCon);
  targetDisplay.appendChild(targetCoordCon);
  div.appendChild(targetDisplay);

  // Fire/place button
  const fireCon = document.createElement("div");
  fireCon.className = "fire-place-con";

  const btnLabel = document.createElement("label");
  btnLabel.textContent = "FIRE";
  const actionButton = document.createElement("button");
  actionButton.className = "fire-place-button";
  actionButton.addEventListener("click", demoLog);

  fireCon.appendChild(btnLabel);
  fireCon.appendChild(actionButton);
  div.appendChild(fireCon);

  // Status of player's fleet on board
  const fleetMonitor = document.createElement("figure");
  fleetMonitor.id = "fleet-display";
  const fmCaption = document.createElement("figcaption");
  fmCaption.textContent = "Fleet Status";
  fleetMonitor.appendChild(fmCaption);

  const fleetList = document.createElement("ul");
  fleetList.className = "fleet-display-ul";
  const fleet = ["Carrier", "Battleship", "Destroyer", "Submarine", "Frigate"];
  const reversedFleet = [...fleet].reverse();
  for (let shipName of fleet) {
    let idx = reversedFleet.indexOf(shipName);
    // Add 1 because I want Carrier === [5], Battleship === [4]...
    // Optionally, add 1 IF shipname === "Frigate" because minimum ship length is 2
    idx += idx === 0 ? 2 : 1;

    const shipStat = document.createElement("li");
    shipStat.classList.add("ship-status-display", "place-mode-selectable");
    shipStat.addEventListener("click", (e) => toggleShipSelect(e, idx), true);

    const caption1 = document.createElement("span");
    caption1.className = "ship-name";
    caption1.textContent = shipName;

    const caption2 = document.createElement("span");
    caption2.className = "ship-stat";
    caption2.textContent = "x1";

    shipStat.appendChild(caption1);
    shipStat.appendChild(caption2);
    fleetList.appendChild(shipStat);
  }
  fleetMonitor.appendChild(fleetList);
  div.appendChild(fleetMonitor);

  function deploymentFiringPageSwitcher() {}

  const logMonitor = document.createElement("figure");
  logMonitor.id = "log-display";
  // child1
  const lmCaption = document.createElement("figcaption");
  lmCaption.textContent = "Battle Log";
  logMonitor.appendChild(lmCaption);
  // child2
  const battleLog = document.createElement("ol");
  battleLog.className = "log-display-ol";
  logMonitor.appendChild(battleLog);
  div.appendChild(logMonitor);

  return div;
}

function toggleShipSelect(e, len) {
  if (selectedShip === e.target) {
    exclusivelySelectShip("none");
    placementSystem.togglePlaceMode("off");
  } else {
    exclusivelySelectShip(e.target);
    placementSystem.togglePlaceMode("on");
  }
}

// function refreshPlaceMode() {
//   placementSystem.togglePlaceMode("off");
//   placementSystem.togglePlaceMode("on");
// }

function exclusivelySelectShip(target) {
  // if no target deselect all ships that are selected // remove bg color
  const allShipChoices = [
    ...document.querySelectorAll(".place-mode-selectable"),
  ];
  let counter = 5;
  allShipChoices.forEach((shipChoice) => {
    if (target === "none") {
      selectedShip = null;
      shipChoice.classList.remove("place-mode-selected");
    } else if (shipChoice === target) {
      shipChoice.classList.add("place-mode-selected");
      placementSystem.changeLength(counter);
      selectedShip = shipChoice;
    } else {
      shipChoice.classList.remove("place-mode-selected");
    }
    counter -= counter === 2 ? 0 : 1;
  });
}

function demoLog() {
  const log = document.querySelector(".log-display-ol");
  const length = log.querySelectorAll("li").length;
  const item = document.createElement("li");
  item.textContent = length + 1 + ".) Fired at XX. It was a hit!";
  log.appendChild(item);
}

// Selecting/reselecting target cell on enemy board before firing
function targetCell(e) {
  e.preventDefault();
  if (targetingSystem.targetElement === e.target) {
    return 0;
  }
  if (targetingSystem.targetElement !== null) {
    targetingSystem.targetElement.textContent = "";
  }
  targetingSystem.targetElement = e.target;
  targetingSystem.targetElement.textContent = targetingSystem.targetMarker;
}

// Allows placement rotation upon scroll/wheel event

// Rotate orientation of placement
// function placementSystem.rotatePlacement(e) {
//   e.preventDefault();
//   if (placementSystem.mode === "on") {
//     placementSystem.orientation =
//       placementSystem.orientation === "y" ? "x" : "y";
//     placementSystem.placeModeOut({ target: placementSystem.targetCell });
//     placementSystem.placeModeIn({ target: placementSystem.targetCell });
//   }
// }
// Toggle placement mode by middle mouse button click
// boardEl.addEventListener("mousedown", mmToggle);
// function mmToggle(e) {
//   e.preventDefault();
//   if (e.button === 1) {
//     const mode = placementSystem.mode === "off" ? "on" : "off";
//     placementSystem.togglePlaceMode(mode);
//   }
// }

// Toggle placement when deploying chosen ships (num of affected cells == ship length)
// function togglePlaceMode(mode) {
//   if (mode === "on" || placementSystem.mode === "off") {
//     // then turn on placement mode
//     boardCells.forEach((cell) => {
//       cell.addEventListener("mouseover", placementSystem.placeModeIn);
//       cell.addEventListener("mouseout", placementSystem.placeModeOut);
//     });
//     boardEl.addEventListener("wheel", placementSystem.rotatePlacement);
//     placementSystem.mode = "on";
//   } else if (mode === "off" || placementSystem.mode === "on") {
//     // then turn off placement mode
//     boardCells.forEach((cell) => {
//       cell.removeEventListener("mouseover", placementSystem.placeModeIn);
//       cell.removeEventListener("mouseout", placementSystem.placeModeOut);
//     });
//     placementSystem.placeModeOut({ target: placementSystem.targetCell });
//     boardEl.removeEventListener("wheel", placementSystem.rotatePlacement);
//     placementSystem.mode = "off";
//   }
// }

// Placement of ships on board, hover tiles effect
// function placementSystem.placeModeIn(e) {
//   const target = e.target;
//   placementSystem.targetCell = target;
//   target.classList.add("place-mode");
//   const x = target.id.slice(0, 1);
//   const y = Number(target.id.slice(1));
//   if (placementSystem.length === 1) return;
//   else {
//     // v0
//     // let exceeding = false;
//     // for (let counter = y, i = 1; i < placementSystem.length; i++) {
//     //   let modifiedY = i % 2 === 0 ? counter - i : counter + i;
//     //   if (modifiedY <= 0) counter = modifiedY = counter + 1;
//     //   else if (modifiedY > 10) counter = modifiedY = counter - i;
//     //   else counter = modifiedY;
//     //   const adj = document.getElementById(x + modifiedY);
//     //   adj.classList.add("place-mode");
//     //   placementSystem.targetAdjacents.push(adj);
//     // }

//     // v1 - works
//     if (placementSystem.orientation === "x") {
//       for (
//         let counter = y, excess = null, i = 1;
//         i < placementSystem.length;
//         i++
//       ) {
//         let modifiedY;
//         if (excess === "over") modifiedY = y === 10 ? y - i : counter - i;
//         else if (excess === "under") modifiedY = y === 1 ? y + i : counter + i;
//         else {
//           modifiedY = i % 2 === 0 ? counter - i : counter + i;
//           if (y === 10 || y === 9) {
//             excess = "over";
//             counter = modifiedY = y === 10 ? 9 : 10;
//           } else if (y === 1 || y === 2) {
//             excess = "under";
//             counter = modifiedY = y === 1 ? 2 : 1;
//           } else counter = modifiedY;
//         }
//         const adj = document.getElementById(x + modifiedY);
//         adj.classList.add("place-mode");
//         placementSystem.targetAdjacents.push(adj);
//       }
//     } else {
//       const xHeaders = ["", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
//       const xIndex = xHeaders.indexOf(x);
//       for (
//         let counter = xIndex, excess = null, i = 1;
//         i < placementSystem.length;
//         i++
//       ) {
//         let modifiedX;
//         if (excess === "over")
//           modifiedX = xIndex === 10 ? xIndex - i : counter - i;
//         else if (excess === "under")
//           modifiedX = xIndex === 1 ? xIndex + i : counter + i;
//         else {
//           modifiedX = i % 2 === 0 ? counter - i : counter + i;
//           if (xIndex === 10 || xIndex === 9) {
//             excess = "over";
//             counter = modifiedX = xIndex === 10 ? 9 : 10;
//           } else if (xIndex === 1 || xIndex === 2) {
//             excess = "under";
//             if (xIndex === 1) counter = modifiedX = 2;
//             if (xIndex === 2) counter = modifiedX = 1;
//           } else counter = modifiedX;
//         }
//         const adj = document.getElementById(xHeaders[modifiedX] + y);
//         adj.classList.add("place-mode");
//         placementSystem.targetAdjacents.push(adj);
//       }
//     }
//   }

// function placementSystem.placeModeOut(e) {
//   if (placementSystem.targetCell) e.target.classList.remove("place-mode");
//   placementSystem.targetAdjacents.forEach((adj) => {
//     adj.classList.remove("place-mode");
//   });
//   placementSystem.targetAdjacents = [];
// }
