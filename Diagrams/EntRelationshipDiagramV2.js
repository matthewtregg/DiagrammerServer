
function buildChartGoingDown(startingPgm, entrels){
  // get child relationships going down
  const InitialObjInfo = createGoingDownObj(startingPgm, entrels, "", 0, 0,true);
  const InitialObj = InitialObjInfo[0]
  let entityId = InitialObjInfo[1]
  let parentId = 0;
  // place in double nested array
  let DiagramGoingDown= [[[InitialObj]]];
  let EntLvl = [[InitialObj]];
  let EntCluster = [];
  let EntObj = {};
  let newEntLvl= [];
  let EntObjInfo = [];
  let nextLevelChildren = [];
  let nextChildren = []; 
  let DendogramObj = {};
  nextLevelChildren = EntLvl.reduce((acc,Obj)=>{return acc.concat(Obj)})
  console.log(nextLevelChildren,'next level children')
  nextLevelChildren = nextLevelChildren.map((Obj)=>{return Obj.DiagramChildren })
  nextLevelChildren = nextLevelChildren.reduce((acc,Obj)=>{return acc.concat(Obj)})
  while (nextLevelChildren.length > 0){
  newEntLvl = [];
  EntLvl = EntLvl.reduce((acc,Obj)=>{return acc.concat(Obj)});
  for (let cluster of EntLvl) {
  parentId ++;
  parent = cluster.DiagramEntity;
  nextChildren = cluster.DiagramChildren; 
  // remove duplicates
  EntCluster = [];
  for ( let child of nextChildren){
  EntObjInfo = createGoingDownObj(child, entrels,parent, entityId, parentId, false);
  EntObj = EntObjInfo[0];
  entityId = EntObjInfo[1];
  EntCluster.push(EntObj);
  }
  if (EntCluster.length > 0){
  newEntLvl.push(EntCluster); 
  }
  
  }
    if (newEntLvl.length > 0 ){
    nextLevelChildren = newEntLvl.reduce((acc,Obj)=>{return acc.concat(Obj)})
    nextLevelChildren = nextLevelChildren.map((Obj)=>{return Obj.DiagramChildren })
    nextLevelChildren = nextLevelChildren.reduce((acc,Obj)=>{return acc.concat(Obj)})
    DiagramGoingDown.push(newEntLvl)
    EntLvl = newEntLvl;
    } else {
      EntLvl = [];
    }
  }
  
  DiagramGoingDown = EliminateDiagramGoingDown(DiagramGoingDown)
  LeftDiagramData = DiagramGoingDown.map((Lvl)=>{return Lvl.reduce((acc,Obj)=>{return acc.concat(Obj)})})
  LeftDiagramData = LeftDiagramData.reduce((acc,Obj)=>{return acc.concat(Obj);})
  LeftDiagramData = FindChildIds(DiagramGoingDown,LeftDiagramData);
  DendogramObj = addEntClusterToChildren(DiagramGoingDown,DendogramObj)
  return [DiagramGoingDown,DendogramObj]
  
  }
  
  function FindChildIds(DiagramGoingDown,LeftDiagramData){
  
  DiagramGoingDown = DiagramGoingDown.map((Lvl)=>{return Lvl.map((Clter)=>{return Clter.map((Obj)=>{
    Obj.ChildIds =  getChildId(Obj,LeftDiagramData)
    return Obj }) })})
  return DiagramGoingDown;
  }
  
  function getChildId(Obj, LeftDiagramData){
  let RemEnts = LeftDiagramData.filter((Ent)=>{return Obj.EntityId === Ent.ParentId});
  RemEnts = RemEnts.map((Ent)=>{return Ent.EntityId});
  return RemEnts;
  }
  
  
  function getDirectlyEliminatedEntityIds(RevDiagramCopy){
   
    let prevPgms =[];
    let EntityIds = []; 
    EntityIds = RevDiagramCopy.map((Lvl)=>{
        Lvl = Lvl.map((Cltr)=>{
        Cltr = Cltr.map((Obj)=>{
                               if (prevPgms.includes(Obj.DiagramEntity)){
                                          return Obj.EntityId
                                       }
                                       prevPgms.push(Obj.DiagramEntity)
                                       return "NOT_ELIMINATED";
                             }).filter((Obj)=>{return Obj!=="NOT_ELIMINATED"})
       if (Cltr.length>0){
       return Cltr;}
       else {
        return "NOT_ELIMINATED"   
       }                
                   }).filter((Cltr)=>{return Cltr!=="NOT_ELIMINATED"})           
       if (Lvl.length>0){
       return Lvl;}
       else {
        return "NOT_ELIMINATED"
       }           
       }).filter((Lvl)=>{return Lvl!=="NOT_ELIMINATED"})
    if (EntityIds.length>0){
    EntityIds = EntityIds.map((lvl)=>{return lvl.reduce((acc,Id)=>{return acc.concat(Id)})});
    EntityIds = EntityIds.reduce((acc,lvl)=>{return acc.concat(lvl)})};  
    return EntityIds;
  }
  
  
  function getAdditionalImpactedEntityIds(RevDiagramCopy, EliminatedEntityIds){
    let AdditionalImpactedEliminatedEntityIds = []
    AdditionalImpactedEliminatedEntityIds = RevDiagramCopy.map((Lvl)=>{
        Lvl = Lvl.map((Cltr)=>{
        Cltr = Cltr.map((Obj)=>{
                               if (EliminatedEntityIds.includes(Obj.ParentId)){
                                          return Obj.EntityId
                                       }
                                       return "NOT_ELIMINATED";
                             }).filter((Obj)=>{return Obj!=="NOT_ELIMINATED"})
       if (Cltr.length>0){
       return Cltr;}
       else {
        return "NOT_ELIMINATED"   
       }                
                   }).filter((Cltr)=>{return Cltr!=="NOT_ELIMINATED"})           
       if (Lvl.length>0){
       return Lvl;}
       else {
        return "NOT_ELIMINATED"
       }           
       }).filter((Lvl)=>{return Lvl!=="NOT_ELIMINATED"})
    if (AdditionalImpactedEliminatedEntityIds.length>0){
    AdditionalImpactedEliminatedEntityIds = AdditionalImpactedEliminatedEntityIds.map((lvl)=>{return lvl.reduce((acc,Id)=>{return acc.concat(Id)})});
    AdditionalImpactedEliminatedEntityIds  = AdditionalImpactedEliminatedEntityIds.reduce((acc,lvl)=>{return acc.concat(lvl)});  
    }
    return AdditionalImpactedEliminatedEntityIds
  }
  
  function getIdsOfEntitiesToEliminate(RevDiagramCopy){  
   let EliminatedIds = getDirectlyEliminatedEntityIds(RevDiagramCopy);
   if (EliminatedIds.length>0){
   let IndirectlyImpactedIds = getAdditionalImpactedEntityIds(RevDiagramCopy,EliminatedIds);
   IndirectlyImpactedIds = IndirectlyImpactedIds.filter((Id)=>{return !EliminatedIds.includes(Id)})
   while (IndirectlyImpactedIds.length>0){
   EliminatedIds = EliminatedIds.concat(IndirectlyImpactedIds);
   IndirectlyImpactedIds = getAdditionalImpactedEntityIds(RevDiagramCopy,IndirectlyImpactedIds);
   IndirectlyImpactedIds = IndirectlyImpactedIds.filter((Id)=>{return !EliminatedIds.includes(Id)})
        }
    }    
   return EliminatedIds
  }
  
  
  
  
  
  function EliminateDiagramGoingDown(DiagramGoingDown){
    let prevPgms = [];
    let DiagramCopy = DiagramGoingDown.slice(0)
    let RevDiagramCopy = DiagramCopy.reverse()
    let EntitiesToEliminate = [];
    EntitiesToEliminate = getIdsOfEntitiesToEliminate(RevDiagramCopy)
  
    if (EntitiesToEliminate.length>0){
    RevDiagramCopy = RevDiagramCopy.map((Lvl)=>{
         Lvl = Lvl.map((Cltr)=>{
         Cltr = Cltr.map((Obj)=>{
                                if (EntitiesToEliminate.includes(Obj.EntityId)){
                                           return "ELIMINATED"
                                        }
                                        return Obj;
                              }).filter((Obj)=>{return Obj!=="ELIMINATED"})
        if (Cltr.length>0){
        return Cltr;}
        else {
         return "ELIMINATED"   
        }                
                    }).filter((Cltr)=>{return Cltr!=="ELIMINATED"})           
        if (Lvl.length>0){
        return Lvl;}
        else {
         return "ELIMINATED"
        }           
        }).filter((Lvl)=>{return Lvl!=="ELIMINATED"})
    }
  
    FinalDiagram = RevDiagramCopy.reverse()  
    return FinalDiagram;
  
  }
  
  
  
  
  function buildChartGoingUp(startingPgm, entrels){
  // get parent relationships going down 
  let InitialObjInfo = createGoingUpObj(startingPgm, entrels, "", 0, 0,true);
  let InitialObj = InitialObjInfo[0]
  let entityId = InitialObjInfo[1]
  let childId = 0;
  // place in double nested array
  let DiagramGoingUp= [[[InitialObj]]];
  let EntLvl = [[InitialObj]];
  let EntCluster = [];
  let EntObj = {};
  let newEntLvl= [];
  let EntObjInfo = [];
  let nextLevelParents = [];
  let nextParents = [];
  let DendogramObj = {};
  nextLevelParents = EntLvl.reduce((acc,Obj)=>{return acc.concat(Obj)})
  nextLevelParents = nextLevelParents.map((Obj)=>{return Obj.DiagramParents })
  nextLevelParents = nextLevelParents.reduce((acc,Obj)=>{return acc.concat(Obj)})
  while (nextLevelParents.length > 0){
  newEntLvl = [];
  EntLvl = EntLvl.reduce((acc,Obj)=>{return acc.concat(Obj)});
  for (let cluster of EntLvl) {
  childId ++;
  parent = cluster.DiagramEntity;
  nextParents = cluster.DiagramParents; 
  EntCluster = [];
  if (nextParents.length > 0){
  for (let child of nextParents){
  EntObjInfo = createGoingUpObj(child, entrels,parent, entityId, childId, false)
  EntObj = EntObjInfo[0];
  entityId = EntObjInfo[1];
  EntCluster.push(EntObj);
  
  }
  }
  if (EntCluster.length > 0){
    newEntLvl.push(EntCluster); 
  }
  
    }
    if (newEntLvl.length > 0 ){
    nextLevelParents = newEntLvl.reduce((acc,Obj)=>{return acc.concat(Obj)})
    nextLevelParents = nextLevelParents.map((Obj)=>{return Obj.DiagramParents })
    nextLevelParents = nextLevelParents.reduce((acc,Obj)=>{return acc.concat(Obj)})
    DiagramGoingUp.push(newEntLvl)
    EntLvl = newEntLvl;
    } else {
      EntLvl = [];
      nextLevelParents=[];
    }
  
  }
  DendogramObj = addEntClusterToParents(DiagramGoingUp,DendogramObj)
  return [DiagramGoingUp,DendogramObj]
  
  }
  // Get next level entities
  
  function createGoingUpObj(startingPgm, entrels,DiagramChild,entityId, ChildId, InitialObj){
  
  let StartingPgmParentRels = entrels.filter((rel)=>{return rel.CHLD === startingPgm}) 
  let DiagramParents = StartingPgmParentRels.map((rel)=>{return rel.PAR })
  if (!InitialObj && DiagramParents.length > 20 ){
    DiagramParents = []
  }
  entityId ++;
  return [{
    "ParentIds": [],
    "EntityId": entityId,
    "ChildId": ChildId,
    "DiagramParents": DiagramParents,
    "DiagramEntity": startingPgm,
    "DiagramChild": DiagramChild,
  }, entityId]
  
  
  
  }
  
  
  
  function addEntClusterToChildren(DiagramGoingDown, DendogramObj){
  
  DiagramGoingDown = DiagramGoingDown.map((Lvl)=>{return Lvl.reduce((acc,Clter)=>{return acc.concat(Clter)})});
  DiagramGoingDown = DiagramGoingDown.reduce((acc,Obj)=>{return acc.concat(Obj)});
  FirstParentObj = DiagramGoingDown.filter((Obj)=>{return Obj.EntityId === 1})[0]
  DendogramObj.children = FirstParentObj.DiagramChildren.map((Obj)=>{return Obj = getNestedChildrenGoingDown(Obj,DiagramGoingDown)});
  DendogramObj.name = FirstParentObj.DiagramEntity
  
  
  return DendogramObj;
  }
  
  
  function addEntClusterToParents(DiagramGoingUp, DendogramObj){
  
    DiagramGoingUp = DiagramGoingUp.map((Lvl)=>{return Lvl.reduce((acc,Clter)=>{return acc.concat(Clter)})});
    DiagramGoingUp = DiagramGoingUp.reduce((acc,Obj)=>{return acc.concat(Obj)});
    FirstParentObj = DiagramGoingUp.filter((Obj)=>{return Obj.EntityId === 1})[0]
    DendogramObj.children = FirstParentObj.DiagramParents.map((Obj)=>{return Obj = getNestedParentsGoingUp(Obj,DiagramGoingUp)});
    DendogramObj.name = FirstParentObj.DiagramEntity
    
    
    return DendogramObj;
    }
    
  
  function getNestedChildrenGoingDown(Obj,DiagramGoingDown){
   // set names
    let newObj = {}
    newObj.name = Obj
    nextChildren = DiagramGoingDown.filter((child)=>{return child.DiagramParent === Obj});
    nextChildren = nextChildren.map((Obj)=>{return Obj.DiagramEntity});
    if (nextChildren.length > 0) {
    newObj.children = nextChildren.map((Obj)=>{return Obj = getNestedChildrenGoingDown(Obj,DiagramGoingDown)})
    } else {
    newObj.children = [];
    }
    return newObj
  }
  
  function getNestedParentsGoingUp(Obj,DiagramGoingUp){
    // set names
     let newObj = {}
     newObj.name = Obj
     nextChildren = DiagramGoingUp.filter((child)=>{return child.DiagramChild === Obj});
     nextChildren = nextChildren.map((Obj)=>{return Obj.DiagramEntity});
     if (nextChildren.length > 0) {
     newObj.children = nextChildren.map((Obj)=>{return Obj = getNestedParentsGoingUp(Obj,DiagramGoingUp)})
     } else {
     newObj.children = [];
     }
     return newObj
   }
  
  
  
  function createGoingDownObj(Entity, entrels,DiagramParent, entityId, parentId, InitialObj){
  const StartingPgmChildRels = entrels.filter((rel)=>{return rel.PAR === Entity})
  const DiagramChildren = StartingPgmChildRels.map((rel)=>{return rel.CHLD })
  if (!InitialObj && DiagramChildren.length > 20){
    DiagramChildren = [];
  }
  entityId++;
  return [{
    "ParentId": parentId,
    "EntityId": entityId,
    "ChildIds": [],
    "DiagramParent": DiagramParent,
    "DiagramEntity": Entity,
    "DiagramChildren": DiagramChildren,
  }, entityId]
  
  
  
  }
  
  
  function buildChart(entrels, startingPgm){
      const DiagramGoingDown = buildChartGoingDown(startingPgm, entrels);
      const DiagramGoingUp = buildChartGoingUp(startingPgm, entrels)
      return [DiagramGoingDown,DiagramGoingUp]
  }
  
  module.exports = {buildChart}