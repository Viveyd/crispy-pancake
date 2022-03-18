const Ship = require("./shipFactory.js");

describe("Ship is a factory function", () => {
  test("Ship is a function", () => {
    expect(typeof Ship).toBe("function");
  });

  test("Ship returns an object", () => {
    expect(
      typeof Ship("battleship") === "object" &&
        Ship("battleship") !== null &&
        Array.isArray(Ship("battleship")) === false
    ).toBe(true);
  });
});

describe("length property", () => {
  it("Length property defined", () =>
    expect(Ship("battleship").length).toBeDefined());
  it("Length property is a Number", () =>
    expect(typeof Ship("battleship").length === "number").toBe(true));
  describe("Ship length depends on its class", () => {
    it("Carriers have length of 5", () =>
      expect(Ship("carrier").length).toBe(5));
    it("Battleship have length of 4", () =>
      expect(Ship("battleship").length).toBe(4));
    it("Destroyer have length of 3", () =>
      expect(Ship("destroyer").length).toBe(3));
    it("Submarine have length of 2", () =>
      expect(Ship("submarine").length).toBe(2));
    it("Frigate have length of 1", () =>
      expect(Ship("frigate").length).toBe(1));
  });
});

describe("type property", () => {
  it("Type property defined", () =>
    expect(Ship("battleship").type).toBeDefined());
  it("Type property is a string", () =>
    expect(typeof Ship("battleship").type === "string").toBe(true));
  it("Type property value is ship", () =>
    expect(Ship("battleship").type).toBe("ship"));
});

describe("class property", () => {
  it("Class property defined", () =>
    expect(Ship("battleship").class).toBeDefined());
  it("Class property is a string", () =>
    expect(typeof Ship("battleship").class === "string").toBe(true));
  it("Class property value is equal to given arg", () =>
    expect(Ship("battleship").class === "battleship").toBe(true));
  it("Throws error when given invalid value", () =>
    expect(() => Ship("battleshirp").class).toThrow("Invalid Ship class"));
  // xit("Class property value can only be carrier || battleship || destroyer || submarine|| frigate", () =>
  //   expect(Ship(['carrier','battleship','destroyer','submarine', 'frigate'].indexOf(Ship('').class) ).not.toBe(-1));
});

describe("status property", () => {
  it("Status property defined", () =>
    expect(Ship("battleship").status).toBeDefined());
  it("Status property is a string", () =>
    expect(typeof Ship("battleship").status === "string").toBe(true));
  it("Status property value is either active or inactive ONLY", () =>
    expect(
      Ship("battleship").status === "active" ||
        Ship("battleship").status === "inactive"
    ).toBe(true));
});

describe("workingParts property", () => {
  it("workingParts property defined", () =>
    expect(Ship("battleship").workingParts).toBeDefined());
  it("workingParts property is an array", () =>
    expect(Array.isArray(Ship("battleship").workingParts)).toBe(true));
  it("workingParts length is equals to length property", () =>
    expect(
      Ship("battleship").workingParts.length === Ship("battleship").length
    ).toBe(true));
  it("workingParts items are all boolean", () =>
    expect(
      Ship("battleship").workingParts.every(
        (part) => part === true || part === false
      )
    ).toBe(true));
});
describe("hit method", () => {
  it("hit defined", () => expect(Ship("battleship").hit).toBeDefined());
  it("hit is a function", () =>
    expect(typeof Ship("battleship").hit === "function").toBe(true));
  it("hit returns error if given NaN argument", () => {
    expect(() => Ship("battleship").hit("d")).toThrow(
      "Expected a number arg (hit)"
    );
  });
  it("hit returns error if given num argument exceed ship length", () => {
    expect(() => Ship("battleship").hit("6")).toThrow("Invalid target");
  });
  it("hit affects workingParts if given valid target ()", () => {
    const sampleShip = Ship("battleship");
    sampleShip.hit(2);
    expect(sampleShip.workingParts[2]).toBe(false);
  });
  it("hit throws error if target was already hit", () => {
    const sampleShip = Ship("battleship");
    sampleShip.hit(2);
    expect(() => sampleShip.hit(2)).toThrow();
  });
});

describe("isSunk method", () => {
  it("isSunk defined", () => expect(Ship("battleship").isSunk).toBeDefined());
  it("isSunk is a function", () =>
    expect(typeof Ship("battleship").isSunk === "function").toBe(true));
  it("isSunk returns boolean value", () =>
    expect(
      Ship("battleship").isSunk() === true ||
        Ship("battleship").isSunk() === false
    ).toBe(true));
  it("isSunk returns true if all workingParts item === false otherwise false", () => {
    const expected = Ship("battleship").workingParts.every(
      (parts) => parts === false
    )
      ? true
      : false;
    expect(Ship("battleship").isSunk()).toBe(expected);
  });
});

describe("Sample objects", () => {
  describe("Ship('destroyer')", () => {
    const sampleObj = Ship("destroyer");
    it("type property is equals to 'ship'", () => {
      expect(sampleObj.type).toBe("ship");
    });
    it("class property is equals to 'destroyer'", () => {
      expect(sampleObj.class).toBe("destroyer");
    });
    it("length property is equals to 3", () => {
      expect(sampleObj.length).toBe(3);
    });
    it("status property is equals to 'active'", () => {
      expect(sampleObj.status).toBe("active");
    });
    it("workingParts property is equals to [true,true,true]", () => {
      expect(sampleObj.workingParts).toStrictEqual([true, true, true]);
    });
  });
});
