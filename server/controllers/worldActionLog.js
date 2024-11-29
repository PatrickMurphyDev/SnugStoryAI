class WorldActionLog {
  constructor() {
    this.log = [];
  }

  getLog() {
    return this.log;
  }

  async addAction(userid, action, usrLoc, simTimeData) {
    this.log.push({
      userid,
      action,
      usrLoc,
      simTimeData,
    });
  }
}

export default WorldActionLog;