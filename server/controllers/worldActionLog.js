class WorldActionLog {
  constructor() {
    this.log = [];
  }

  getLog() {
    return this.log;
  }

  async addAction(action) {
    this.log.push({action});
  }
}

module.exports = WorldActionLog;