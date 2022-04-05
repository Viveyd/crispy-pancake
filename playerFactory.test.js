const playerFactory = require("./playerFactory.js");
const Gameboard = require("./gameboardFactory");

it("playerFactory() is defined", () => {
  expect(playerFactory()).toBeDefined();
});
describe("playerFactory().type", () => {
  it("playerFactory().type is defined", () => {
    expect(playerFactory().type).toBeDefined();
  });
  it("playerFactory().type is a string", () => {
    expect(typeof playerFactory().type).toBe("string");
  });
  it("Throw error if arg is not 'computer' or 'human'", () => {
    expect(() => playerFactory("alien")).toThrow();
  });
  it("playerFactory().type is a string", () => {
    expect(typeof playerFactory().type).toBe("string");
  });
});
describe("playerFactory().board", () => {
  it("playerFactory().board is defined", () => {
    expect(playerFactory().board).toBeDefined();
  });
  it("playerFactory().board is a non-array object", () => {
    expect(typeof playerFactory().board).toBe("object");
    expect(Array.isArray(playerFactory().board)).toBe(false);
  });
});

describe("playerFactory().attackPlayer", () => {
  it("playerFactory().attackPlayer is defined", () => {
    expect(playerFactory().attackPlayer).toBeDefined();
  });
  it("playerFactory().attackPlayer is a function", () => {
    expect(typeof playerFactory().attackPlayer).toBe("function");
  });
  it("Throws error if not given two arguments (targetPlayer, targetCoordinate)", () => {
    const player1 = playerFactory();
    const player2 = playerFactory();
    expect(() => player1.attackPlayer(player2)).toThrow();
  });
  it("Attack is logged at target Player's board.activityLog", () => {
    const player1 = playerFactory();
    const player2 = playerFactory();
    player2.board.placeShip(player2.board.ships[0], "a1", "a2", "a3", "a4");
    player1.attackPlayer(player2, "a2");
    expect(player2.board.activityLog[0]).toStrictEqual({
      coord: "a2",
      result: "hit",
    });
  });
});
describe("playerFactory().calculateAttackOn()", () => {
  it("playerFactory().calculateAttack is defined", () => {
    expect(playerFactory().calculateAttackOn).toBeDefined();
  });
  it("playerFactory().calculateAttackOn is a function", () => {
    expect(typeof playerFactory().calculateAttackOn).toBe("function");
  });
  it("Throw error if player object argument missing", () => {
    expect(() => playerFactory().calculateAttackOn()).toThrow();
  });
  it("Attacks are logged at targetPlayer's board.activityLog", () => {
    const player1 = playerFactory();
    const player2 = playerFactory();
    // player2.board.placeShip(player2.board.ships[0], "a1", "a2", "a3", "a4");
    player1.calculateAttackOn(player2);
    expect(player2.board.activityLog[0]).toBeDefined();
  });

  it("If last attack was a hit, next attack targets valid random adjacent tiles", () => {
    const player1 = playerFactory();
    const player2 = playerFactory();
    player2.board.placeShip(player2.board.ships[0], "d5", "e5", "f5", "g5");
    player1.attackPlayer(player2, "e5");
    player1.calculateAttackOn(player2);
    const randomAtk = player2.board.activityLog[1];
    // e4 f5 e6 d5
    const attackedCoord = player2.board.activityLog[1].coord;
    expect(
      attackedCoord === "e4" ||
        attackedCoord === "f5" ||
        attackedCoord === "e6" ||
        attackedCoord === "d5"
    ).toBe(true);
  });
  it("Attacks follow pattern when there is one (1)", () => {
    const player1 = playerFactory();
    const player2 = playerFactory();
    player2.board.placeShip(player2.board.ships[0], "d5", "e5", "f5", "g5");
    player1.attackPlayer(player2, "e5");
    player1.attackPlayer(player2, "f5");
    player1.calculateAttackOn(player2);
    const attackedCoord = player2.board.activityLog[2].coord;
    expect(attackedCoord === "d5" || attackedCoord === "g5").toBe(true);
  });
  it("Attacks follow pattern when there is one (2)", () => {
    const player1 = playerFactory();
    const player2 = playerFactory();
    player2.board.placeShip(player2.board.ships[0], "a10", "a9", "a8", "a7");
    player1.attackPlayer(player2, "a10");
    player1.attackPlayer(player2, "a9");
    player1.calculateAttackOn(player2);
    const attackedCoord = player2.board.activityLog[2].coord;
    expect(attackedCoord).toBe("a8");
  });
  it("Attacks follow pattern when there is one (4)", () => {
    const player1 = playerFactory();
    const player2 = playerFactory();
    player2.board.placeShip(
      player2.board.ships[1],
      "a3",
      "b3",
      "c3",
      "d3",
      "e3"
    );
    player1.attackPlayer(player2, "c3");
    for (let i = 0; i <= 10; i++) {
      player1.calculateAttackOn(player2);
    }
    expect(player2.board.ships[1].status).toBe("inactive");
  });
  it("If no visible target (active), next attack target random valid tile", () => {
    const player1 = playerFactory();
    const player2 = playerFactory();
    player2.board.placeShip(player2.board.ships[0], "d5", "e5", "f5", "g5");
    player1.attackPlayer(player2, "d5");
    player1.attackPlayer(player2, "e5");
    player1.attackPlayer(player2, "f5");
    player1.attackPlayer(player2, "g5");
    player1.calculateAttackOn(player2);
  });
});
