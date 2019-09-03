const {buildChart} = require('../Diagrams/EntRelationshipDiagram.js')
const {convertChildrenHierarchy} = require('../Diagrams/DendogramData.js')
const EntRels = require('../models/EntRels');

const createPgmStrChartTwo = async(req,res) => {
  entRels = new EntRels();
  const entrels = await entRels.getEntRels()
  const startingPgm = "OTPROJ";
  
  let Diagrams = buildChart(entrels, startingPgm)
  // Make CINTAS Children 
  // Make CINTAS Parents 
  // 
  let ParentTree = Diagrams[0];
  let ParentData = ParentTree[0];
  ParentTree = ParentTree[1];
  let ChildTree = Diagrams[1]; 
  let ChildData = ChildTree[0];
  ChildTree = ChildTree[1];
  
   
  let RemRelsGoingDown = convertChildrenHierarchy(Diagrams);
  res.send(JSON.stringify({"Error" : false, "data" : [ParentTree,ChildTree, RemRelsGoingDown]}));   

};

const getEntRelData = async(req,res) => {
  //const entId = req.params.entId;
  entRels = new EntRels();
  const entrels = await entRels.getEntRels()
  res.send(JSON.stringify({"Error" : false, "data" : entrels}))
};


module.exports = {
  createPgmStrChartTwo,
  getEntRelData
}