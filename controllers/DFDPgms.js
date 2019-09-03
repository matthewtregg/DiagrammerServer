const PgmCalls = require('../models/PgmCalls');
const PgmDefs = require('../models/PgmDefs');
const PgmFiles = require('../models/PgmFiles');
// needs refactoring
// make back end non-blocking
const getDFDPgmInfo = async(req,res) => {
  var pgmId = req.params.pgmId;
  const pgmCalls =  new PgmCalls ();
  const programs = await pgmCalls.getDFDpgmPgms(pgmId);
  const CallingpgmIds = programs.filter(pgm => pgm.PGMID!==pgmId).map(pgm=>pgm.PGMID)
  const CalledpgmIds = programs.filter(pgm=> pgm.CLDPGM!==pgmId).map(pgm=>pgm.CLDPGM)
  const pgmDefs = new PgmDefs();
  let Callingdefs = [];
  let Calleddefs = [];
  if (CallingpgmIds.length > 0) Callingdefs = await pgmDefs.getPgmDefList(CallingpgmIds);
  if (CalledpgmIds.length > 0) Calleddefs = await pgmDefs.getPgmDefList(CalledpgmIds);
  const pgmFiles =  new PgmFiles ();
  const files = await pgmFiles.getPgmFiles(pgmId);
 res.send(JSON.stringify({"Error" : false, "data":{ "CallingPgmdefs":[Callingdefs],"CalledPgmDefs": [Calleddefs], "Files":[files]}}));   
};






module.exports = {
  getDFDPgmInfo,
  
}