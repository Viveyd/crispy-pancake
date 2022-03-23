const Gameboard = require("./gameboardFactory.js");

describe("Check Gameboard Factory", () => {
  it("Gameboard is defined", () => {
    expect(Gameboard).toBeDefined();
  });
  describe("Gameboard is a factory function", () => {
    it("Gameboard is a function", () => {
      expect(typeof Gameboard).toBe("function");
    });
    it("Gameboard returns an object", () => {
      expect(typeof Gameboard()).toBe("object");
    });
    it("Gameboard returns NOT an array", () => {
      expect(Array.isArray(Gameboard())).toBe(false);
    });
  });
  describe("Gameboard().placeShip method", () => {
    it("Gameboard().placeShip is defined", () => {
      expect(Gameboard().placeShip).toBeDefined();
    });
    it("Gameboard().placeShip is a function", () => {
      expect(typeof Gameboard().placeShip).toBe("function");
    });
    it("Gameboard().placeShip is not an array", () => {
      expect(Array.isArray(Gameboard().placeShip)).toBe(false);
    });
    it("Error if any coord does not follow format: '[a-j][1-10]' ", () => {
      expect(() => Gameboard().placeShip(1)).toThrow("");
    });
    it("Missing 'ship' argument or using non object as first arg throws error", () => {
      expect(() => Gameboard().placeShip("f3")).toThrow(
        "Invalid target ship argument"
      );
    });
    it("Throw error if ship.length not equals to coords given", () => {
      const gameboard = Gameboard();
      expect(() =>
        gameboard.placeShip(gameboard.ships[0], "a1", "a2", "a3")
      ).toThrow("Unexpected number of arguments");
    });
    it("Given valid args, placeShip method updates Ship.parts coordinates", () => {
      const gameboard = Gameboard();
      gameboard.placeShip(gameboard.ships[0], "a1", "a2", "a3", "a4");
      expect(gameboard.ships[0].parts[0].coordinates).toBe("a1");
      expect(gameboard.ships[0].parts[1].coordinates).toBe("a2");
      expect(gameboard.ships[0].parts[2].coordinates).toBe("a3");
      expect(gameboard.ships[0].parts[3].coordinates).toBe("a4");
    });
  });
  describe("Gameboard().receiveAttack method", () => {
    it("Gameboard().receiveAttack is defined", () => {
      expect(Gameboard().receiveAttack).toBeDefined();
    });
    it("Gameboard().receiveAttack is a function", () => {
      expect(typeof Gameboard().receiveAttack).toBe("function");
    });
    it("Gameboard().receiveAttack is not an array", () => {
      expect(Array.isArray(Gameboard().receiveAttack)).toBe(false);
    });
    it("Throws error if given improperly-formatted coordinates", () => {
      expect(() => Gameboard().receiveAttack("0")).toThrow();
    });
    it("Ship part status becomes inactive when hit", () => {
      const gameboard = Gameboard();
      gameboard.placeShip(gameboard.ships[1], "a1", "a2", "a3", "a4", "a5");
      gameboard.receiveAttack("a1");
      expect(gameboard.ships[1].parts[0].status).toBe("inactive");
    });
    it("Log attacks to activityLog array", () => {
      const gameboard = Gameboard();
      gameboard.placeShip(gameboard.ships[0], "a1", "a2", "a3", "a4");
      gameboard.receiveAttack("a1");
      expect(gameboard.activityLog[0]).toBeDefined();
    });
    it("Coordinates already in activity log cannot receive attack (error)", () => {
      const gameboard = Gameboard();
      gameboard.placeShip(gameboard.ships[0], "a1", "a2", "a3", "a4");
      gameboard.receiveAttack("a1");
      expect(() => gameboard.receiveAttack("a1")).toThrow();
    });
  });
  describe("Gameboard().hasLost method", () => {
    it("Gameboard().hasLost is defined", () => {
      expect(Gameboard().hasLost).toBeDefined();
    });
    it("Gameboard().hasLost is a function", () => {
      expect(typeof Gameboard().hasLost).toBe("function");
    });
    it("Gameboard().hasLost returns a boolean value", () => {
      const returnVal = Gameboard().hasLost();
      expect(returnVal === true || returnVal === false).toBe(true);
    });
    it("Returns false if ships array has active ships", () => {
      expect(Gameboard().hasLost()).toBe(false);
    });
  });
  describe("Gameboard().ships property", () => {
    it("Gameboard().ships is defined", () => {
      expect(Gameboard().ships).toBeDefined();
    });
    it("Gameboard().ships is an array", () => {
      expect(Array.isArray(Gameboard().ships)).toBe(true);
    });
  });
  describe("Gameboard().activityLog property", () => {
    it("Gameboard().activityLog is defined", () => {
      expect(Gameboard().activityLog).toBeDefined();
    });
    it("Gameboard().activityLog is an array", () => {
      expect(Array.isArray(Gameboard().activityLog)).toBe(true);
    });
  });
});
