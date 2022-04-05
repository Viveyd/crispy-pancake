const Ship = require("./shipFactory");
module.exports = function Gameboard() {
  return {
    ships: [
      Ship("battleship"),
      Ship("carrier"),
      Ship("destroyer"),
      Ship("submarine"),
      Ship("frigate"),
    ],
    activityLog: [],
    receiveAttack(coord) {
      // cross-reference given coordinate with each active ships's coordinates
      const regex = /^[a-j][1-9]$|^[a-j]10$/g;
      if (regex.test(coord) === false) {
        throw Error("Invalid coordinates");
      } else if (this.activityLog.includes(coord)) {
        throw Error("Coordinate has already been attacked earlier");
      } else {
        for (let i = 0; i < this.ships.length; i++) {
          // look for a ship with a part that matches the target coordinate
          const ship = this.ships[i];
          const matchIdx = ship.parts.findIndex(
            (part) => part.coordinates === coord
          );
          // Call hit method if match found and set result then exit
          if (matchIdx !== -1) {
            ship.hit(matchIdx);
            if (ship.status === "inactive") {
              this.activityLog.push({ coord, result: "destroy" });
            } else this.activityLog.push({ coord, result: "hit" });
            return;
          }
        }
        //If no match found, still log attack on coord as a miss.
        this.activityLog.push({ coord, result: "miss" });
        return;
      }
    },
    hasLost() {
      // returns true if ALL ship objects have their status property set to 'inactive'
      return this.ships.every((ship) => ship.status === "inactive")
        ? true
        : false;
    },
    placeShip(ship, ...coords) {
      if (ship == undefined || typeof ship !== "object") {
        throw Error("Invalid target ship argument");
      } else if (coords.length === 0) {
        throw Error("Expected some coordinates");
      } else if (coordsAreInvalid(coords)) {
        throw Error("Invalid coordinates");
      } else if (ship.length !== coords.length) {
        throw Error("Unexpected number of arguments");
      } else {
        for (let i = 0; i < coords.length; i++) {
          ship.parts[i].coordinates = coords[i];
        }
      }
    },
  };
};

function coordsAreInvalid(coords = []) {
  const regex = /^[a-j][1-9]$|^[a-j]10$/;
  // check each coord individually if they do not match regex
  // if no matches return false
  return coords.some((coord) => regex.test(coord) == false);
}

// function coordsAreValid(coords = []) {
//   const regex = /^[a-j][1-9]$|^[a-j]10$/;
//   // check each coord individually if they do not match regex
//   // if no matches return false
//   return coords.every((coord) => regex.test(coord)) ? true : false;
// }

// function coordsAreInvalid1(coords) {
//   const regex = /^[a-j][1-9]$|^[a-j]10$/;
//   for (let coord of coords) {
//     if (regex.test(coord) === false) return true;
//   }
//   return false;
// }
