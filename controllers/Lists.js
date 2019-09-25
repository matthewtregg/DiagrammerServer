const PgmCalls = require('../models/PgmCalls');
const Entities = require('../models/Entities');


const getProgramList = async(req,res) => {
  const dbname = req.params.dbName;
  const pgmCalls = new PgmCalls ();
  const programList = await pgmCalls.getPgmList(dbname); 
  res.send(programList);   

}

const getEntList = async(req, res) => {
  const dbname = req.params.dbName;
  const entities = new Entities ();
  const entityList = await entities.getFileList(dbname);
  res.send(entityList);
}


module.exports = {
  getProgramList,
  getEntList
}