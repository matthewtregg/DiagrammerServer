const PgmCode = require('../models/PgmCode');

const getSourceCode = async(req,res) => {
  var pgmId = req.params.pgmId;
  const pgmCode = new PgmCode()
  console.log(pgmId);
  const CodeData = await pgmCode.getPgmSource(pgmId); 
  console.log(CodeData)
  res.send(JSON.stringify({"Error" : false, "sourceData":CodeData}));   

}


module.exports = {
  getSourceCode,
  
}