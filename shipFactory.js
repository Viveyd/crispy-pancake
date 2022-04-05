// Carrier > Battleship > Destroyer > Submarine > Frigate

module.exports = function Ship(shipClass) {
  const classIdx = [
    "frigate",
    "submarine",
    "destroyer",
    "battleship",
    "carrier",
  ].indexOf(shipClass);
  if (classIdx === -1) throw Error("Invalid Ship class");

  const computedLength = classIdx + 1;
  const computedParts = computeParts(computedLength);

  return {
    type: "ship",
    class: shipClass,
    length: computedLength || 5,
    status: "active",
    parts: computedParts, // parts. array containing part objects with (state and coordinate)
    hit(targetIdx) {
      if (isNaN(targetIdx)) throw Error("Expected a number arg (hit)");
      else if (targetIdx >= 0 && targetIdx >= this.length)
        throw Error("Invalid target");
      else if (this.parts[targetIdx].status === "inactive")
        throw Error("Already destroyed!");
      else {
        this.parts[targetIdx].status = "inactive";
        if (this.isSunk() === true) this.status = "inactive";
      }
    },
    isSunk() {
      return this.parts.every((part) => part.status === "inactive")
        ? true
        : false;
    },
  };

  function computeParts(computedLength) {
    const computedParts = [];
    for (let i = computedLength; i !== 0; i -= 1) {
      computedParts.push({ status: "active", coordinates: "" });
    }
    return computedParts;
  }
};
