// TODO Finish Testing for SocketManager

const SocketManager = require("./SocketManager");
//const Messages = require("../../../models/messageModel");

describe("SocketManager", () => {
  let socketManager;

  beforeEach(() => {
    socketManager = new SocketManager();
  });

  describe("storeMessage", () => {
    test("should successfully store a message with valid input parameters", async () => {
      const mockCreate = jest.fn().mockResolvedValue({
        message: { text: "Test message" },
        users: ["user1", "user2"],
        sender: "user1",
      });

      jest.mock("../../models/messageModel", () => ({
        create: mockCreate,
      }));

      const socketManager = new SocketManager();
      const result = await socketManager.storeMessage(
        "Test message",
        "user2",
        "user1",
        true
      );

      expect(mockCreate).toHaveBeenCalledWith({
        message: { text: "Test message" },
        users: ["user1", "user2"],
        sender: "user1",
      });
      expect(result).toEqual({
        message: { text: "Test message" },
        users: ["user1", "user2"],
        sender: "user1",
      });
    });
/*
    test("should handle empty message text gracefully", async () => {
      const mockCreate = jest.fn().mockResolvedValue({
        message: { text: "" },
        users: ["user1", "user2"],
        sender: "user1",
      });

      jest.mock("../../models/messageModel", () => ({
        create: mockCreate,
      }));

      const socketManager = new SocketManager();
      const result = await socketManager.storeMessage(
        "",
        "user2",
        "user1",
        true
      );

      expect(mockCreate).toHaveBeenCalledWith({
        message: { text: "" },
        users: ["user1", "user2"],
        sender: "user1",
      });
      expect(result).toEqual({
        message: { text: "" },
        users: ["user1", "user2"],
        sender: "user1",
      });
    });*/
  });
});
