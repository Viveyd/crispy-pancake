const Ship = require("./shipFactory");
module.exports = function Gameboard() {
  return {
    ships: [Ship("battleship")],
    activityLog: [],
    receiveAttack() {
      // cross-reference given coordinate with each active ships's coordinates
    },
    hasLost() {
      // count how many ship objects have their status property set to 'active'
      return false;
    },
    placeShip(...args) {
      const regex = /^[a-f][1-9]$|^[a-f]10$/g;
      if (args.length !== 1) {
        throw Error("Expects a single argument");
      } else if (regex.test(args[0]) === false) {
        throw Error("Invalid argument format");
      } else {
        // assign 1-5 coordinates to each ship depending on their class/length
      }
    },
  };
};
