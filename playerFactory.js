const Gameboard = require("./gameboardFactory");
module.exports = function playerFactory(playerType) {
  if (playerType != undefined && playerType !== "human") throw Error();
  return {
    type: playerType || "computer",
    board: Gameboard(),
    calculateAttackOn(targetPlayer) {
      //
      if (
        targetPlayer == undefined ||
        typeof targetPlayer !== "object" ||
        Array.isArray(targetPlayer) === true
      )
        throw Error();
      else {
        const log = targetPlayer.board.activityLog;
        const target = scanForTarget(targetPlayer);
        // If first attack of match or no targets, choose random coord
        if (log.length === 0 || target === null)
          attackRandomly(this, targetPlayer, log);
        else {
          attackAdjacently(this, targetPlayer, target);
          // attackAdjacently(this, targetPlayer, log[log.length - 1].coord);
        }
      }
    },

    attackPlayer(targetPlayer, targetCoordinate) {
      if (targetPlayer == undefined || targetCoordinate == undefined)
        throw Error(targetCoordinate);
      else {
        targetPlayer.board.receiveAttack(targetCoordinate);
      }
    },
  };
};

function scanForTarget(targetPlayer) {
  const enemyShips = targetPlayer.board.ships;
  // Check which ships are damaged
  const damagedShips = [];
  for (let ship of enemyShips) {
    const damagedParts = [];
    if (ship.isSunk() === true) break;
    for (let part of ship.parts) {
      if (part.status === "inactive") damagedParts.push(part.coordinates);
    }
    if (damagedParts.length !== 0) damagedShips.push({ ship, damagedParts });
  }
  if (damagedShips.length === 0) return null;
  else if (damagedShips[0].damagedParts.length > 1)
    return damagedShips[0].damagedParts;
  else return damagedShips[0].damagedParts[0];
}

function attackRandomly(attacker, targetPlayer, log) {
  let coord = getRandomCoord();
  while (isValidCoord(coord, log) === false) coord = getRandomCoord();
  attacker.attackPlayer(targetPlayer, coord);
}

function smartAttack(coords, log) {
  // check which axis the coords belong to
  const coordX = coords[0].split("")[0];
  const coordY = coords[0].slice(1);
  const xAxis = [];
  const yAxis = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"].map(
    (item) => item + coordY
  );
  for (let i = 1; i <= 10; i++) {
    xAxis.push(coordX + i);
  }
  const axis = coords.every((coord) => xAxis.includes(coord)) ? xAxis : yAxis;
  const idx1 = axis.indexOf(coords[0]);
  const idx2 = axis.indexOf(coords[coords.length - 1]);

  const potentialCoords = [];
  if (idx1 > idx2) {
    potentialCoords.push(axis[idx1 + 1]);
    potentialCoords.push(axis[idx2 - 1]);
  } else {
    potentialCoords.push(axis[idx2 + 1]);
    potentialCoords.push(axis[idx1 - 1]);
  }
  return isValidCoord(potentialCoords[0], log)
    ? potentialCoords[0]
    : potentialCoords[1];
}

function attackAdjacently(attacker, targetPlayer, coord) {
  let targetCoord = "";
  const log1 = targetPlayer.board.activityLog;
  if (Array.isArray(coord)) {
    targetCoord = smartAttack(coord, log1);
  } else {
    const adjacents = getAdjacentsOf(coord);
    targetCoord = adjacents.find((coord) => isValidCoord(coord, log1));
  }
  attacker.attackPlayer(targetPlayer, targetCoord);
}

function getRandomCoord() {
  const coordA = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
  return coordA[getRandomNum()] + getRandomNum(1, 10);
}

function isValidCoord(coord, log) {
  const regex = /^[a-j][1-9]$|^[a-j]10$/g;
  if (regex.test(coord) === false) return false;
  return log.every((attack) => attack.coord !== coord) ? true : false;
}

function getRandomNum(min = 0, max = 10) {
  const min1 = min !== 0 ? min - 1 : 0;
  const min2 = min !== 0 ? min : 0;
  return Math.floor(Math.random() * (max - min1) + min2);
}

function getAdjacentsOf(coord) {
  const xArr = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
  const split = coord.split("");
  const x = split[0];
  const xIdx = xArr.indexOf(x);
  const incX = xArr[xIdx + 1];
  const decX = xArr[xIdx - 1];
  const y = split[1];

  const north = split.length === 2 ? x + (y - 1) : x + "9";
  const east = split.length === 2 ? incX + y : incX + "10";
  const south = split.length === 2 ? x + (+y + 1) : x + "11";
  const west = split.length === 2 ? decX + y : decX + "10";

  return [north, east, south, west];
}
