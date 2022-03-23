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
      const regex = /^[a-f][1-9]$|^[a-f]10$/g;
      if (regex.test(coord) === false) {
        throw Error("Invalid coordinates");
      } else if (this.activityLog.includes(coord)) {
        throw Error("Coordinate has already been attacked earlier");
      } else {
        // target ship part becomes inactive
        for (let i = 0; i < this.ships.length; i++) {
          // look for a ship with a part that matches the target coordinate
          const ship = this.ships[i];
          const matchIdx = ship.parts.findIndex(
            (part) => part.coordinates === coord
          );
          // if no matches abort
          if (matchIdx === -1) continue;
          // if theres a match, call hit method of ship then exit from loop
          ship.hit(matchIdx);
          // updates activity log
          this.activityLog.push(coord);
          break;
        }
      }
    },
    hasLost() {
      // returns true if ALL ship objects have their status property set to 'inactive'
      return this.ships.every((ship) => ship.status === "inactive")
        ? true
        : false;
    },
    placeShip(ship, ...coords) {
      const regex = /^[a-f][1-9]$|^[a-f]10$/g;
      if (ship == undefined || typeof ship !== "object") {
        throw Error("Invalid target ship argument");
      } else if (coords.every((coord) => regex.test(coord) === true)) {
        throw Error("Invalid coordinates");
      } else if (ship.length !== coords.length) {
        throw Error("Unexpected number of arguments");
      } else {
        // assign 1-5 coordinates to each ship depending on their class/length
        for (let i = 0; i < coords.length; i++) {
          ship.parts[i].coordinates = coords[i];
        }
      }
    },
  };
};
