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
    it("Throws no error because valid input (frigate)", () => {
      const gameboard = Gameboard();
      expect(() => {
        gameboard.placeShip(gameboard.ships[4], "f3");
      }).not.toThrow();
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
    it("Ship status becomes inactive when all parts hit", () => {
      const gameboard = Gameboard();
      gameboard.placeShip(gameboard.ships[1], "a1", "a2", "a3", "a4", "a5");
      gameboard.receiveAttack("a1");
      gameboard.receiveAttack("a2");
      gameboard.receiveAttack("a3");
      gameboard.receiveAttack("a4");
      gameboard.receiveAttack("a5");
      expect(gameboard.ships[1].status).toBe("inactive");
    });
    describe("Method updates log once", () => {
      const gameboard = Gameboard();
      gameboard.placeShip(gameboard.ships[0], "a1", "a2", "a3", "a4");
      gameboard.receiveAttack("a1");
      it("Push object with prop coord and result to activityLog array", () => {
        expect(gameboard.activityLog[0]).toStrictEqual({
          coord: "a1",
          result: "hit",
        });
      });
      it("Logged only once", () => {
        expect(gameboard.activityLog.length).toBe(1);
      });
    });
    it("Coordinates already in activity log cannot receive attack (error)", () => {
      const gameboard = Gameboard();
      gameboard.placeShip(gameboard.ships[0], "a1", "a2", "a3", "a4");
      gameboard.receiveAttack("a1");
      expect(() => gameboard.receiveAttack("a1")).toThrow();
    });
    it("Logs destroy when a hit changes ship status to inactive", () => {
      const gameboard = Gameboard();
      gameboard.placeShip(gameboard.ships[0], "a1", "a2", "a3", "a4");
      gameboard.receiveAttack("a1");
      gameboard.receiveAttack("a2");
      gameboard.receiveAttack("a3");
      gameboard.receiveAttack("a4");
      expect(gameboard.activityLog[3].result).toBe("destroy");
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
    it("hasLost() returns true since all ships inactive", () => {
      const gameboard = Gameboard();
      gameboard.placeShip(gameboard.ships[0], "a1", "a2", "a3", "a4");
      gameboard.receiveAttack("a1");
      gameboard.receiveAttack("a2");
      gameboard.receiveAttack("a3");
      gameboard.receiveAttack("a4");
      gameboard.placeShip(gameboard.ships[1], "b1", "b2", "b3", "b4", "b5");
      gameboard.receiveAttack("b1");
      gameboard.receiveAttack("b2");
      gameboard.receiveAttack("b3");
      gameboard.receiveAttack("b4");
      gameboard.receiveAttack("b5");
      gameboard.placeShip(gameboard.ships[2], "c1", "c2", "c3");
      gameboard.receiveAttack("c1");
      gameboard.receiveAttack("c2");
      gameboard.receiveAttack("c3");
      gameboard.placeShip(gameboard.ships[3], "d1", "d2");
      gameboard.receiveAttack("d1");
      gameboard.receiveAttack("d2");
      gameboard.placeShip(gameboard.ships[4], "e1");
      gameboard.receiveAttack("e1");
      expect(gameboard.hasLost()).toBe(true);
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
