const PgmCode = require('../models/PgmCode');

const getSourceCode = async(req,res) => {
  var pgmId = req.params.pgmId;
  const pgmCode = new PgmCode()
  const CodeData = await pgmCode.getPgmSource(pgmId); 
  res.send(JSON.stringify({"Error" : false, "sourceData":CodeData}));   

}


module.exports = {
  getSourceCode,
  
}