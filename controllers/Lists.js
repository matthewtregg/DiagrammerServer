const PgmDefs = require('../models/PgmDefs');
const Entities = require('../models/Entities');


const getProgramList = async(req,res) => {
  console.log("Pgm List");
  const dbname = req.params.dbName;
  const pgmDefs = new PgmDefs ();
  const programList = await pgmDefs.getPgmList(dbname); 
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