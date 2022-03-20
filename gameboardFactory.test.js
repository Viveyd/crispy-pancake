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
    it("Error if arguments.length is not 1", () => {
      expect(() => Gameboard().placeShip()).toThrow(
        "Expects a single argument"
      );
    });
    it("Error if arg does not follow format: '[a-j][1-10]' ", () => {
      expect(() => Gameboard().placeShip(1)).toThrow("Invalid argument format");
    });
    it("placeShip('a10') does NOT throw error", () => {
      expect(() => Gameboard().placeShip("a10")).not.toThrow();
    });
    it("placeShip('f3') does NOT throw error", () => {
      expect(() => Gameboard().placeShip("f3")).not.toThrow();
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
  });
  describe("Gameboard().hasLost method", () => {
    it("Gameboard().hasLost is defined", () => {
      expect(Gameboard().hasLost).toBeDefined();
    });
    it("Gameboard().hasLost is a function", () => {
      expect(typeof Gameboard().hasLost).toBe("function");
    });
    it("Gameboard().hasLost is not an array", () => {
      expect(Array.isArray(Gameboard().hasLost)).toBe(false);
    });
    it("Gameboard().hasLost returns a boolean value", () => {
      const returnVal = Gameboard().hasLost();
      expect(returnVal === true || returnVal === false).toBe(true);
    });
    it("Gameboard().hasLost is not an array", () => {
      expect(Array.isArray(Gameboard().hasLost)).toBe(false);
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
