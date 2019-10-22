

// reconfigure entrel chart API 

const EntRels = require('../models/EntRels');
const Entities = require('../models/Entities');




const getEntList = async(req,res) => {
  entRels = new Entities();
  const entList = await entRels.getFileList();
  res.send(JSON.stringify({"Error" : false, "data" : [entList]}))
}

const getEntRelChild = async(req,res) => {
  const ent = req.params.ent;
  const dbname = req.params.dbName;
  entRels = new EntRels();
   // get children
  const entrels = await entRels.getEntRelChild(ent);
  res.send(JSON.stringify({"Error" : false, "data" : entrels}))
}

const getEntRelParent = async(req,res) => {
  const ent = req.params.ent;
  const dbname = req.params.dbName;
  entRels = new EntRels();
  const entrels = await entRels.getEntRelParent(ent);
  res.send(JSON.stringify({"Error" : false, "data" : entrels}))
}

const getEntRelInfo = async(req,res) => {
  const ent = req.params.ent;
  const dbname = req.params.dbName;
  entRels = new EntRels();
  const entrels = await entRels.getEntRel(ent);
  const children = entrels.filter((entID) => {return entID.PAR.trim() === ent});
  const parents = entrels.filter(entID => entID.CHLD.trim() === ent);
  const parentIds = entrels.map(rel => rel.PAR.trim());
  const childIds = entrels.map(rel => rel.CHLD.trim());
  
  let otherIds = parentIds.concat(childIds);
  otherIds = otherIds.filter(id => id!==ent);
  const otherRels = await entRels.getOtherRels(otherIds)
  for (rel of entrels) {
    if (children.includes(rel)) {
      rel.lastChild = false;
      const entrelTest = await entRels.getEntRelChild(rel.CHLD)
      if (entrelTest.length >0) rel.lastChild = true;
    }
    else if (parents.includes(rel)) {
      rel.lastParent = false;
      const entrelTest = await entRels.getEntRelParent(rel.PAR)
      if (entrelTest.length >0) rel.lastParent = true;
    } 
    rel.ButtonPressed = false;
  }

  res.send(JSON.stringify({"Error" : false, "data" : [entrels,otherRels]}))
}


// const getEntRelChild = async(req,res) => {
//   const ent = req.params.ent;
//   entRels = new EntRels();
//    // get children
//   const entrels = await entRels.getEntRelChild(ent);

//   const childIds = entrels.map(rel => rel.CHLD.trim())

//   const otherRels = await entRels.getOtherRels(childIds)
//   const children = entrels.filter((entID) => {return entID.PAR.trim() === ent});
//   // left join 
//   for (rel of entrels) {
//     if (children.includes(rel)) {
//       rel.lastChild = false;
//       const entrelTest = await entRels.getEntRelChild(rel.CHLD)
//       if (entrelTest.length >0) rel.lastChild = true;
//     }  
//     rel.ButtonPressed = false; 
//   }
//   res.send(JSON.stringify({"Error" : false, "data" : [entrels,otherRels]}))
// }

// const getEntRelParent = async(req,res) => {
//   const ent = req.params.ent;
//   entRels = new EntRels();
//   const entrels = await entRels.getEntRelParent(ent);
//   const parentIds = entrels.map(rel => rel.PAR.trim())
//   const otherRels = await entRels.getOtherRels(parentIds)
//   const parents = entrels.filter(entID => entID.CHLD.trim() === ent);
//   for (rel of entrels) {
//     if (parents.includes(rel)) {
//       rel.lastParent = false;
//       const entrelTest = await entRels.getEntRelParent(rel.PAR)
//       if (entrelTest.length >0) rel.lastParent = true;
//     }  
//     rel.ButtonPressed = false;
//     //ADD ON IN FRONT END
//   }
//   res.send(JSON.stringify({"Error" : false, "data" : [entrels,otherRels]}))
// }


const getEntRelData = async(req,res) => {
  //const entId = req.params.entId;
  entRels = new EntRels();
  const entrels = await entRels.getEntRels()
  res.send(JSON.stringify({"Error" : false, "data" : [entrels]}))
};


module.exports = {
  getEntRelData,
  getEntRelChild,
  getEntRelParent,
  getEntList,
  getEntRelInfo
}