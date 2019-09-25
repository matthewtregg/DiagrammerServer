const router = require('express').Router();
const Diagrams = require('./controllers/Diagrams');
const List = require('./controllers/Lists');
const Source = require('./controllers/Source'); 
const DFDPgms = require('./controllers/DFDPgms'); 
const EntRelChart = require('./controllers/EntRelChart'); 
const WhereUsed = require('./controllers/WhereUsed'); 
const Repository = require('./controllers/Repository'); 


router
  .get('/ProgramStructureChart/:dbName', Diagrams.createPgmStrChartTwo)
  .get('/ProgramList/:dbName', List.getProgramList)
  .get('/SourceBrowser/PgmCodeData/:pgmId', Source.getSourceCode)
  .get('/PgmDFDPgm/:pgmId', DFDPgms.getDFDPgmPgmInfo)
  .get('/PgmDFDFile/:pgmId', DFDPgms.getDFDPgmFileInfo)
  .get('/PgmDFDCentral/:pgmId', DFDPgms.getDFDPgmCentralInfo)
  .get('/FileDFDPgm/:entId', DFDPgms.getDFDFilePgmInfo)
  .get('/FileDFDEnt/:entId', DFDPgms.getDFDFileFileInfo)
  .get('/FileDFDCentral/:entId', DFDPgms.getDFDFileCentralInfo)
  .get('/getEntList/:dbName', List.getEntList)  
  .get('/EntRel/:ent', EntRelChart.getEntRelInfo)
  .get('/getEntRelParent/:ent', EntRelChart.getEntRelParent)
  .get('/getEntRelChild/:ent', EntRelChart.getEntRelChild)
  .get('/findFileWhereUsedField/:dbName/:fieldId',WhereUsed.getFileField) 
  .get('/findPgmWhereUsed/:dbName/:PgmId', WhereUsed.getPgms) 
  .get('/findEntWhereUsed/:dbName/:EntId',WhereUsed.getEnts) 
  // .get('/PgmStrChartBoxes/:pgms/:dbName', Diagrams.getPgmSchemaBoxes)
  .get('/findVarWhereUsedSource/:dbName/:Var', WhereUsed.getVar) 
  .get('/getrep', Repository.getRep)

  // STNTYPE 
  // just file or pgm where used 
module.exports = router;









