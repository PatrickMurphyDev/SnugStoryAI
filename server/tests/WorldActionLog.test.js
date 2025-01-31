const WorldActionLog = require('../controllers/WorldActionLog');

jest.mock('../models/WorldActionLogModel', () => ({
  create: jest.fn(),
}));

describe('WorldActionLog', () => {
  let worldActionLog;

  beforeEach(() => {
    worldActionLog = new WorldActionLog();
  });

  test('WorldActionLog add works', () => {
   let wal = worldActionLog.addAction({action: "tst add"});
   expect(worldActionLog.log.length).toBe(1);
  });
  
  test('make sure WorldActionLog.getLog() works', () => {
    let wal = worldActionLog.addAction({action: "tst add"});
    expect(worldActionLog.getLog().length).toBe(1);
  });

  test('store WorldActionLog in database', () => {
    worldActionLog.storeGameActionLog({action: "tst save"});
    expect(worldActionLog.log.length).toBe(1);
  })

});
