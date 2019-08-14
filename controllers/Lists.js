const PgmCalls = require('../models/PgmCalls');

const getProgramList = async(req,res) => {
  const pgmCalls = new PgmCalls ();
  const programList = await pgmCalls.getPgmList(); 
  res.send(programList);   

}


module.exports = {
  getProgramList,
  
}