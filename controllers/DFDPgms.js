const DFDPgms = require('../models/DFDPgms');
const DFDEnts = require('../models/DFDEnts');

// needs refactoring
// make back end non-blocking
const getDFDPgmInfo = async(req,res) => {
  const pgmId = req.params.pgmId;
  const DFDpgms =  new DFDPgms();
  DFDpgms.getDFDPgmInfo(pgmId).then((DFDPgmInfo)=> {
    DFDpgms.getDFDFileInfo(pgmId).then((DFDFileInfo)=> {
      DFDpgms.getCentralSchema(pgmId).then((centralSchema)=> {
        res.send(JSON.stringify({"Error" : false, "data":{ "DFDPgmInfo":DFDPgmInfo, "DFDFileInfo":DFDFileInfo,"centralSchema":centralSchema}}));   
      }) 
    })
  });
};

const getDFDFileInfo = async(req,res) => {
  const entId = req.params.entId;
  const viewId = req.params.viewId;
  const entRels =  new DFDEnts();
  entRels.getDFDEntInfo(entId).then((DFDFileInfo)=> {
    entRels.getDFDPgmInfo(viewId).then((DFDPgmInfo)=> {
      entRels.getCentralSchema(entId).then((centralSchema)=> {
        res.send(JSON.stringify({"Error" : false, "data":{ "DFDPgmInfo":DFDPgmInfo[0], "DFDEntInfo":DFDFileInfo[0],"centralSchema":centralSchema[0]}}));   
      }) 
    })
  });

  // schema information 
}


module.exports = {
  getDFDPgmInfo,
  getDFDFileInfo
}

//WhereUsed api ends here
