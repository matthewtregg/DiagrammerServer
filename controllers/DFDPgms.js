const PgmCalls = require('../models/PgmCalls');
const PgmDefs = require('../models/PgmDefs');
const PgmFiles = require('../models/PgmFiles');
const PgmSchema = require('../models/PgmSchema');
const EntRels = require('../models/EntRels');
const Entities = require('../models/Entities');
// needs refactoring
// make back end non-blocking
const getDFDPgmInfo = async(req,res) => {
  const pgmId = req.params.pgmId;
  const pgmCalls =  new PgmCalls();
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
  const pgmSchema = new PgmSchema();
  const PgmIds = CallingpgmIds.concat(CalledpgmIds); 
  const FileIds = files.filter(file => file.PGMID!==pgmId)
    .map(pgm=> { if (pgm.ENTID) return pgm.ENTID.trim(); 
                 else return pgm.VIEWID.trim();  
    });
  const pgmSchemas = await pgmSchema.getPgmSchemaDefList(PgmIds);
  const fileSchemas = await pgmSchema.getFileSchemaDefList(FileIds);
  //schema information 
 res.send(JSON.stringify({"Error" : false, "data":{ "CallingPgmdefs":[Callingdefs],"CalledPgmDefs": [Calleddefs], "Files":[files],"PgmSchemas":[pgmSchemas], "FileSchemas":[fileSchemas]}}));   
};

const getDFDFileInfo = async(req,res) => {
  const entId = req.params.entId;
  const viewId = req.params.viewId;
  const entRels =  new EntRels();
  const files = await entRels.getEntRel(entId);
  const CallingfileIds = files.filter(file => file.PAR!==entId).map(pgm=>pgm.PAR)
  const CalledfileIds = files.filter(file=> file.CHLD!==entId).map(pgm=>pgm.CHLD)
  const fileDefs = new Entities();
  let Callingdefs = [];
  let Calleddefs = [];
  if (CallingfileIds.length > 0) Callingdefs = await fileDefs.getEntDefList(CallingfileIds);
  if (CalledfileIds.length > 0) Calleddefs = await fileDefs.getEntDefList(CalledfileIds);
  const pgmFiles = new PgmFiles();
  const Pgms = await pgmFiles.getDFDinfo(viewId);
  const PgmIds = Pgms.filter(file => file.ENTID!==entId).map(pgm=>pgm.PGMID);
  const FileIds = CallingfileIds.concat(CalledfileIds); 
  const pgmSchema = new PgmSchema();
  console.log(PgmIds);
  console.log(FileIds);
  const pgmSchemas = await pgmSchema.getPgmSchemaDefList(PgmIds);
  const fileSchemas = await pgmSchema.getFileSchemaDefList(FileIds);
  // schema information 
  res.send(JSON.stringify({"Error" : false, "data":{ "CallingFiledefs":[Callingdefs],"CalledFileDefs": [Calleddefs], "Pgms":[Pgms]}}))
}



module.exports = {
  getDFDPgmInfo,
  getDFDFileInfo
}