const PgmCode = require('../models/PgmCode');

const getSourceCode = async(req,res) => {
  const pgmId = req.params.pgmId;
  const dbname = req.params.dbName;
  const pgmCode = new PgmCode()
  const CodeData = await pgmCode.getPgmSource(pgmId, dbname); 
  res.send(JSON.stringify({"Error" : false, "sourceData":CodeData}));   

}


module.exports = {
  getSourceCode, 
}