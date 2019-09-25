const DFDPgms = require('../models/DFDPgms');
const DFDEnts = require('../models/DFDEnts');

// needs refactoring
// make back end non-blocking
const getDFDPgmPgmInfo = async(req,res) => {
  const pgmId = req.params.pgmId;
  const DFDpgms =  new DFDPgms();
    DFDpgms.getDFDPgmInfo(pgmId).then((DFDPgmInfo)=> {   
      res.send(JSON.stringify({"Error" : false, "data": DFDPgmInfo}));   
  });
};

const getDFDPgmFileInfo = async(req,res) => {
  const pgmId = req.params.pgmId;
  const DFDpgms =  new DFDPgms();
      DFDpgms.getDFDFileInfo(pgmId).then((DFDFileInfo)=> {
        res.send(JSON.stringify({"Error" : false, "data": DFDFileInfo}));   
    }); 
};

const getDFDPgmCentralInfo = async(req,res) => {
  const pgmId = req.params.pgmId;
  const DFDpgms =  new DFDPgms();
    DFDpgms.getCentralSchema(pgmId).then((centralSchema)=> {
      res.send(JSON.stringify({"Error" : false, "data": centralSchema}));   
  }) 
};

const getDFDFilePgmInfo = async(req,res) => {
  const viewId = req.params.viewId;
  const entRels =  new DFDEnts();
  entRels.getDFDPgmInfo(viewId).then((DFDPgmInfo)=> {
    res.send(JSON.stringify({"Error" : false, "data": DFDPgmInfo[0]}));   
  });
};

const getDFDFileFileInfo = async(req,res) => {
  const entId = req.params.entId;
  const entRels =  new DFDEnts();
  entRels.getDFDEntInfo(entId).then((DFDFileInfo)=> {
      res.send(JSON.stringify({"Error" : false, "data": DFDFileInfo[0]}));   
    }); 
};

const getDFDFileCentralInfo = async(req,res) => {
  const entId = req.params.entId;
  const entRels =  new DFDEnts();
  entRels.getCentralSchema(entId).then((centralSchema)=> {
      res.send(JSON.stringify({"Error" : false, "data": centralSchema[0]}));   
  }) 
};

  // schema information 

module.exports = {
  getDFDFilePgmInfo,
  getDFDFileFileInfo,
  getDFDFileCentralInfo,
  getDFDPgmPgmInfo,
  getDFDPgmFileInfo,
  getDFDPgmCentralInfo,
 
}

//WhereUsed api ends here
