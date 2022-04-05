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

describe("parts property", () => {
  it("parts property defined", () =>
    expect(Ship("battleship").parts).toBeDefined());
  it("parts property is an array", () =>
    expect(Array.isArray(Ship("battleship").parts)).toBe(true));
  it("parts length is equals to length property", () =>
    expect(Ship("battleship").parts.length === Ship("battleship").length).toBe(
      true
    ));
  it("parts items are all non-array objects", () =>
    expect(
      Ship("battleship").parts.every(
        (part) => typeof part === "object" && Array.isArray(part) === false
      )
    ).toBe(true));
  it("parts objects have coordinate property", () =>
    expect(
      Ship("battleship").parts.every((part) => "coordinates" in part)
    ).toBe(true));
  it("parts objects have status property", () =>
    expect(Ship("battleship").parts.every((part) => "status" in part)).toBe(
      true
    ));
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
  it("hit affects parts if given valid target ()", () => {
    const sampleShip = Ship("battleship");
    sampleShip.hit(2);
    expect(sampleShip.parts[2].status).toBe("inactive");
  });
  it("hit throws error if target was already hit", () => {
    const sampleShip = Ship("battleship");
    sampleShip.hit(2);
    expect(() => sampleShip.hit(2)).toThrow("Already destroyed!");
  });
  it("If all parts of ship are hit change status to inactive", () => {
    const sampleShip = Ship("battleship");
    sampleShip.hit(0);
    sampleShip.hit(1);
    sampleShip.hit(2);
    sampleShip.hit(3);
    expect(sampleShip.status).toBe("inactive");
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
  it("isSunk returns true if all parts item === false otherwise false", () => {
    const sampleShip = Ship("battleship");
    sampleShip.hit(0);
    sampleShip.hit(1);
    sampleShip.hit(2);
    sampleShip.hit(3);
    const expected = sampleShip.parts.every(
      (parts) => parts.status === "inactive"
    )
      ? true
      : false;
    expect(sampleShip.isSunk()).toBe(expected);
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
    it("parts.status is equals to 'active'", () => {
      expect(sampleObj.parts.every((part) => part.status === "active")).toBe(
        true
      );
    });
    it("parts.coordinates is equal to an empty string", () => {
      expect(sampleObj.parts.every((part) => part.coordinates === "")).toBe(
        true
      );
    });
    it("hit method modifies target part.status to 'inactive'", () => {
      const sampleShip = Ship("battleship");
      sampleShip.hit(3);
      expect(sampleShip.parts[3].status).toBe("inactive");
    });
    it("isSunk method returns true after all parts are hit()", () => {
      const sampleShip = Ship("battleship");
      sampleShip.hit(0);
      sampleShip.hit(1);
      sampleShip.hit(2);
      sampleShip.hit(3);
      expect(sampleShip.isSunk()).toBe(true);
    });
  });
  describe("Ship('frigate')", () => {
    const sampleObj = Ship("frigate");
    it("type property is equals to 'ship'", () => {
      expect(sampleObj.type).toBe("ship");
    });
    it("class property is equals to 'frigate'", () => {
      expect(sampleObj.class).toBe("frigate");
    });
    it("length property is equals to 1", () => {
      expect(sampleObj.length).toBe(1);
    });
    it("status property is equals to 'active'", () => {
      expect(sampleObj.status).toBe("active");
    });
    it("parts.status is equals to 'active'", () => {
      expect(sampleObj.parts.every((part) => part.status === "active")).toBe(
        true
      );
    });
  });
});
