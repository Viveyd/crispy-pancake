module.exports = function installPlacementSystem(
  refDocument,
  boardEl,
  boardCells
) {
  const placementSystem = {
    refDocument,
    boardEl,
    boardCells,
    orientation: "x",
    mode: "off",
    targetCell: null,
    targetAdjacents: [],
    refShip: null,
    length: 5,
    hoverColor: "lightgreen",
    changeLength(newLength) {
      this.length = newLength;
    },
    togglePlaceMode(mode) {
      if (mode === "on" || this.mode === "off") {
        // then turn on placement mode
        boardCells.forEach((cell) => {
          cell.addEventListener("mouseover", this.placeModeIn);
          cell.addEventListener("mouseout", this.placeModeOut);
        });
        boardEl.addEventListener("wheel", this.rotatePlacement);
        this.mode = "on";
      } else if (mode === "off" || this.mode === "on") {
        // then turn off placement mode
        boardCells.forEach((cell) => {
          cell.removeEventListener("mouseover", this.placeModeIn);
          cell.removeEventListener("mouseout", this.placeModeOut);
        });
        this.placeModeOut({ target: this.targetCell });
        boardEl.removeEventListener("wheel", this.rotatePlacement);
        this.mode = "off";
      }
    },
    rotatePlacement(e) {
      e.preventDefault();
      if (placementSystem.mode === "on") {
        placementSystem.orientation =
          placementSystem.orientation === "y" ? "x" : "y";
        placementSystem.placeModeOut({ target: placementSystem.targetCell });
        placementSystem.placeModeIn({ target: placementSystem.targetCell });
      }
    },

    placeModeIn(e) {
      const target = e.target;
      placementSystem.targetCell = target;
      target.classList.add("place-mode");
      const x = target.id.slice(0, 1);
      const y = Number(target.id.slice(1));
      if (placementSystem.length === 1) return;
      else {
        // v0
        // let exceeding = false;
        // for (let counter = y, i = 1; i < placementSystem.length; i++) {
        //   let modifiedY = i % 2 === 0 ? counter - i : counter + i;
        //   if (modifiedY <= 0) counter = modifiedY = counter + 1;
        //   else if (modifiedY > 10) counter = modifiedY = counter - i;
        //   else counter = modifiedY;
        //   const adj = placementSystem.refDocument.getElementById(x + modifiedY);
        //   adj.classList.add("place-mode");
        //   placementSystem.targetAdjacents.push(adj);
        // }

        // v1 - works
        if (placementSystem.orientation === "x") {
          for (
            let counter = y, excess = null, i = 1;
            i < placementSystem.length;
            i++
          ) {
            let modifiedY;
            if (excess === "over") modifiedY = y === 10 ? y - i : counter - i;
            else if (excess === "under")
              modifiedY = y === 1 ? y + i : counter + i;
            else {
              modifiedY = i % 2 === 0 ? counter - i : counter + i;
              if (y === 10 || y === 9) {
                excess = "over";
                counter = modifiedY = y === 10 ? 9 : 10;
              } else if (y === 1 || y === 2) {
                excess = "under";
                counter = modifiedY = y === 1 ? 2 : 1;
              } else counter = modifiedY;
            }
            const adj = placementSystem.refDocument.getElementById(
              x + modifiedY
            );
            adj.classList.add("place-mode");
            placementSystem.targetAdjacents.push(adj);
          }
        } else {
          const xHeaders = [
            "",
            "a",
            "b",
            "c",
            "d",
            "e",
            "f",
            "g",
            "h",
            "i",
            "j",
          ];
          const xIndex = xHeaders.indexOf(x);
          for (
            let counter = xIndex, excess = null, i = 1;
            i < placementSystem.length;
            i++
          ) {
            let modifiedX;
            if (excess === "over")
              modifiedX = xIndex === 10 ? xIndex - i : counter - i;
            else if (excess === "under")
              modifiedX = xIndex === 1 ? xIndex + i : counter + i;
            else {
              modifiedX = i % 2 === 0 ? counter - i : counter + i;
              if (xIndex === 10 || xIndex === 9) {
                excess = "over";
                counter = modifiedX = xIndex === 10 ? 9 : 10;
              } else if (xIndex === 1 || xIndex === 2) {
                excess = "under";
                if (xIndex === 1) counter = modifiedX = 2;
                if (xIndex === 2) counter = modifiedX = 1;
              } else counter = modifiedX;
            }
            const adj = placementSystem.refDocument.getElementById(
              xHeaders[modifiedX] + y
            );
            adj.classList.add("place-mode");
            placementSystem.targetAdjacents.push(adj);
          }
        }
      }
    },
    placeModeOut(e) {
      if (placementSystem.targetCell) e.target.classList.remove("place-mode");
      placementSystem.targetAdjacents.forEach((adj) => {
        adj.classList.remove("place-mode");
      });
      placementSystem.targetAdjacents = [];
    },
  };
  return placementSystem;
};
