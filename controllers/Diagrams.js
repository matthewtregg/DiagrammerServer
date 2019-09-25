const PgmCalls = require('../models/PgmCalls');

// needs refactoring
// make back end non-blocking
const createPgmStrChartTwo = async(req,res) => {
  const dbName = req.params.dbName
  const pgmCalls =  new PgmCalls ();
  const programs = await pgmCalls.getDisplayPgms(dbName);
  res.send(JSON.stringify({"Error" : false, "progams":programs}));   
};





module.exports = {
  createPgmStrChartTwo, 
}