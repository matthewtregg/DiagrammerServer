

const PgmCalls = require('../models/PgmCalls');

// needs refactoring
// make back end non-blocking
const getDFDFileInfo = async(req,res) => {
  const fileId = req.params.fileId;
  const fileDFDFiles =  new EntFiles ();
  const fileDFDFiles = await PgmFiles.getPgmFiles(fileId);
  // look in filese
  res.send(JSON.stringify({"Error" : false, "files":files}));   
};






module.exports = {
  createPgmStrChartTwo,
  
}