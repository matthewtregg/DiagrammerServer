const router = require('express').Router();
const Diagrams = require('./controllers/Diagrams');
const List = require('./controllers/Lists');
const Source = require('./controllers/Source'); 
const DFDPgms = require('./controllers/DFDPgms'); 
const EntRelChart = require('./controllers/EntRelChart'); 
const WhereUsed = require('./controllers/WhereUsed'); 
const Repository = require('./controllers/Repository'); 
const FullFiles = require('./controllers/FullFiles'); 


router
  .get('/ProgramStructureChart/:dbName', Diagrams.createPgmStrChartTwo)
  .get('/ProgramList/:dbName', List.getProgramList)
  .get('/SourceBrowser/PgmCodeData/:dbName/:pgmId', Source.getSourceCode)
  .get('/PgmDFDPgm/:dbName/:pgmId', DFDPgms.getDFDPgmPgmInfo)
  .get('/PgmDFDFile/:dbName/:pgmId', DFDPgms.getDFDPgmFileInfo)
  .get('/PgmDFDCentral/:dbName/:pgmId', DFDPgms.getDFDPgmCentralInfo)
  .get('/FileDFDPgm/:dbName/:entId', DFDPgms.getDFDFilePgmInfo)
  .get('/FileDFDEnt/:dbName/:entId', DFDPgms.getDFDFileFileInfo)
  .get('/FileDFDCentral/:dbName/:entId', DFDPgms.getDFDFileCentralInfo)
  .get('/getEntList/:dbName', List.getEntList)  
  .get('/EntRel/:dbName/:ent', EntRelChart.getEntRelInfo)
  .get('/getEntRelParent/:dbName/:ent', EntRelChart.getEntRelParent)
  .get('/getEntRelChild/:dbName/:ent', EntRelChart.getEntRelChild)
  .get('/findFileWhereUsedField/:dbName/:fieldId',WhereUsed.getFileField) 
  .get('/findPgmWhereUsed/:dbName/:PgmId', WhereUsed.getPgms) 
  .get('/findEntWhereUsed/:dbName/:EntId',WhereUsed.getEnts) 
  .get('/findVarWhereUsedSource/:dbName/:Var', WhereUsed.getVar) 
  .get('/getrep', Repository.getRep)
  .get('/EntFile/:dbName', FullFiles.getEntrels)
  .get('/PgmFiles/:dbName', FullFiles.getPgmFiles)
  .get('/PgmSchema/:pgm/:ent', FullFiles.getPgmSchema)
  .get('/PgmDefs/:dbName', FullFiles.getPgmDefs)
  .get('/Entities/:dbName', FullFiles.getEntities)
  .get('/EntSchema/:ent', FullFiles.getEntSchema)



  // additional routes for:
  //1 GET PGMCODE BY PGMID & WHEREUSED INFO  
  
  //2
  // A) PGMSCHEMA BOXES 
  // B) FILESCHEMA BOXES - ENTITY BOXES
  // C)  DFD BOXES 

 // http://localhost:4000/PgmSchema/APS030/FAPBKQ


  // STNTYPE 
  // just file or pgm where used 
module.exports = router;









