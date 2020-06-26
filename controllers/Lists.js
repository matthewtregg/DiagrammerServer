const PgmDefs = require('../models/PgmDefs');
const Entities = require('../models/Entities');


const getProgramList = async(req,res) => {
  const dbname = req.params.dbName;
  const pgmDefs = new PgmDefs ();
  const programList = await pgmDefs.getPgmList(dbname); 
  const finalList = programList.map((list) => {
    list.PGMID = list.PGMID.trim();
    list.PGMTX = list.PGMTX.trim();
    list.PGMTYP = list.PGMTYP.trim();
    list.DIRNM = list.DIRNM.trim();
    return list;
  })
  res.send(finalList);   
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