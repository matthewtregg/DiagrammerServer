const router = require('express').Router();
const Diagrams = require('./controllers/Diagrams');
const List = require('./controllers/Lists');
const Source = require('./controllers/Source'); 
const DFDPgms = require('./controllers/DFDPgms'); 
const EntRelChart = require('./controllers/EntRelChart'); 
const WhereUsed = require('./controllers/WhereUsed'); 

router
  .get('/ProgramStructureChart', Diagrams.createPgmStrChartTwo)
  .get('/ProgramList', List.getProgramList)
  .get('/SourceBrowser/PgmCodeData/:pgmId', Source.getSourceCode)
  .get('/PgmDFDPgm/:pgmId', DFDPgms.getDFDPgmPgmInfo)
  .get('/PgmDFDFile/:pgmId', DFDPgms.getDFDPgmFileInfo)
  .get('/PgmDFDCentral/:pgmId', DFDPgms.getDFDPgmCentralInfo)
  .get('/FileDFDPgm/:entId', DFDPgms.getDFDFilePgmInfo)
  .get('/FileDFDEnt/:entId', DFDPgms.getDFDFileFileInfo)
  .get('/FileDFDCentral/:entId', DFDPgms.getDFDFileCentralInfo)
  .get('/EntityRelationshipChart' , EntRelChart.getEntRelData)
  .get('/EntRel/:ent', EntRelChart.getEntRelInfo)
  .get('/getEntRelParent/:ent', EntRelChart.getEntRelParent)
  .get('/getEntRelChild/:ent', EntRelChart.getEntRelChild)
  .get('/findFileWhereUsedField/:dbName/:fieldId',WhereUsed.getFileField) 
  .get('/findPgmWhereUsed/:dbName/:PgmId', WhereUsed.getPgms) 
  .get('/findEntWhereUsed/:dbName/:EntId',WhereUsed.getEnts) 
  .get('/findVarWhereUsedSource/:dbName/:Var', WhereUsed.getVar) 

  // STNTYPE 
  // just file or pgm where used 
module.exports = router;









