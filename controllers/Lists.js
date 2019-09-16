const PgmCalls = require('../models/PgmCalls');
const Entities = require('../models/Entities');
const getProgramList = async(req,res) => {
  const pgmCalls = new PgmCalls ();
  const programList = await pgmCalls.getPgmList(); 
  res.send(programList);   

}

const getEntList = async(req, res) => {
  const entities = new Entities ();
  const entityList = await entities.getFileList();
  res.send(entityList);
}


module.exports = {
  getProgramList,
  getEntList
}