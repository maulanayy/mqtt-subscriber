const database = require("../config/database");

const dbService = () => {
  const authenticateDB = () => database.authenticate();
  const syncDB = () => database.sync();
  
  const successfulDBStart = () => (
    console.info('connection to the database has been established successfully')
  );

  const errorDBStart = (err) => (
    console.info('unable to connect to the database:', err)
  );
  
  const startMigrateFalse = async () => {
    try {
      await syncDB();
      successfulDBStart();
    } catch (err) {
      errorDBStart(err);
    }
  };

  const startDev = async () => {
    try {
      await authenticateDB();



      return startMigrateFalse();
    } catch (err) {
      return errorDBStart(err);
    }
  };
  const start = async () => {
    await startDev();
  }
  
  return {
    start,
  };
};

module.exports = dbService;