const router = require('express').Router();
const Diagrams = require('./controllers/Diagrams');
const List = require('./controllers/Lists');
const Source = require('./controllers/Source'); 

router
  .get('/ProgramStructureChart', Diagrams.createPgmStrChartTwo)
  .get('/ProgramList', List.getProgramList)
  .get('/SourceBrowser/PgmCodeData/:pgmId', Source.getSourceCode)
  
module.exports = router;










