const router = require('express').Router();
const Diagrams = require('./controllers/Diagrams');
const List = require('./controllers/Lists');
const Source = require('./controllers/Source'); 
const DFDPgms = require('./controllers/DFDPgms'); 
const EntRelChart = require('./controllers/EntRelChart'); 
router
  .get('/ProgramStructureChart', Diagrams.createPgmStrChartTwo)
  .get('/ProgramList', List.getProgramList)
  .get('/SourceBrowser/PgmCodeData/:pgmId', Source.getSourceCode)
  .get('/PgmDFD/:pgmId', DFDPgms.getDFDPgmInfo)
  .get('/FileDFD/:viewId/:entId', DFDPgms.getDFDFileInfo)
  .get('/EntityRelationshipChart' , EntRelChart.getEntRelData)
  .get('/EntRel/:ent', EntRelChart.getEntRelInfo)
  .get('/getEntRelParent/:ent', EntRelChart.getEntRelParent)
  .get('/getEntRelChild/:ent', EntRelChart.getEntRelChild)
module.exports = router;









