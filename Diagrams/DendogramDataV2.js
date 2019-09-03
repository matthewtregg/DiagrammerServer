function convertChildrenHierarchy(Diagrams){

  let DenogramChildren = [];
  let DiagramGoingDown = Diagrams[0];
  DiagramGoingDown = DiagramGoingDown[0];
  let DiagramGoingUp = Diagrams[1];
  DiagramGoingUp = DiagramGoingUp[0];
  let DiagramEnts = DiagramGoingDown.map((Lvl)=>{return Lvl.reduce((acc,Obj)=>{return acc.concat(Obj);})})
  DiagramEnts = DiagramEnts.reduce((acc,Obj)=>{return acc.concat(Obj)});
  let CoreRels = getCoreRelations(DiagramEnts);
  let AllRels  = getAllRelations(DiagramEnts);
  let NonCoreRels = getNonCoreRelations(CoreRels,AllRels);
  
  // create diagram going down and going up
  return  NonCoreRels;
  
  
  }
  
  
  function getNonCoreRelations(CoreRels,AllRels){
  let NonCoreRels = AllRels.filter((rel)=>{return !CoreRels.includes(rel)})
  return NonCoreRels;
  }
  
  function getAllRelations(DiagramEnts){
    let DiagramEntsCopy = DiagramEnts.slice(0);
    let NewRels = DiagramEntsCopy.map((Ent)=>{
      rel =  Ent.DiagramChildren.map((child)=>{
        return Ent.DiagramEntity + ":" + child 
      })
      
      return rel})
    NewRels = NewRels.reduce((acc,rel)=>{return acc.concat(rel)})
    NewRels = NewRels.filter(function(elem, index, self) {
      return index == self.indexOf(elem);
   });
   
    return NewRels;
  
   
  }
  
  function getCoreRelations(DiagramEnts){
  let DiagramEntsCopy = DiagramEnts.slice(0);
  let NewRels = DiagramEntsCopy.map((Ent)=>{
    if (Ent.DiagramParent!==""){
    let newRel = Ent.DiagramParent + ':' + Ent.DiagramEntity
    return newRel}else {
      return "NO_REL"
    }}).filter((rel)=>{return rel!=="NO_REL"});
  return NewRels;
  }
  
  
  
  
  
  module.exports = {convertChildrenHierarchy}