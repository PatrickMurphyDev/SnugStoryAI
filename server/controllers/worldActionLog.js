class WorldActionLog {
  constructor() {
    this.log = [];
  }

  getLog() {
    return this.log;
  }

  async addAction(action) {
    this.log.push({...action});
    return this.log.length-1;
  }

  // save game state to db by saveGameID, gameState is JSON string
  async storeGameActionLog(gameAction) {
    const gameActionLog = require("../models/WorldActionLogModel");
    this.addAction(gameAction);
    let saveRow = await gameActionLog.create(gameAction);
  }
}

module.exports = WorldActionLog;