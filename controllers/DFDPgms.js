const DFDPgms = require('../models/DFDPgms');
const DFDEnts = require('../models/DFDEnts');

// needs refactoring
// make back end non-blocking
const getDFDPgmInfo = async(req,res) => {
  const pgmId = req.params.pgmId;
  const DFDpgms =  new DFDPgms();
  const DFDPgmInfo = await DFDpgms.getDFDPgmInfo(pgmId)
  const DFDFileInfo = await DFDpgms.getDFDFileInfo(pgmId);
  const centralSchema = await DFDpgms.getCentralSchema(pgmId);
 res.send(JSON.stringify({"Error" : false, "data":{ "DFDPgmInfo":[DFDPgmInfo], "DFDFileInfo":[DFDFileInfo],"centralSchema":[centralSchema]}}));   
};

const getDFDFileInfo = async(req,res) => {
  const entId = req.params.entId;
  const viewId = req.params.viewId;
  const entRels =  new DFDEnts();
  const DFDEntInfo = await entRels.getDFDEntInfo(entId);
  const DFDPgmInfo = await entRels.getDFDPgmInfo(viewId);
  const centralSchema = await entRels.getCentralSchema(entId);
  // schema information 
  res.send(JSON.stringify({"Error" : false, "data":{ "DFDEntInfo":[DFDEntInfo],"DFDPgmInfo": [DFDPgmInfo], "centralSchema":[centralSchema]}}))
}


module.exports = {
  getDFDPgmInfo,
  getDFDFileInfo
}

//WhereUsed api ends here
