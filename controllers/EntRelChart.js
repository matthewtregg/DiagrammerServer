

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
  entRels = new EntRels();
   // get children
  const entrels = await entRels.getEntRelChild(ent);
  res.send(JSON.stringify({"Error" : false, "data" : [entrels]}))
}

const getEntRelParent = async(req,res) => {
  const ent = req.params.ent;
  entRels = new EntRels();
  const entrels = await entRels.getEntRelParent(ent);
  res.send(JSON.stringify({"Error" : false, "data" : [entrels]}))
}

const getEntRelData = async(req,res) => {
  //const entId = req.params.entId;
  entRels = new EntRels();
  const entrels = await entRels.getEntRels()
  res.send(JSON.stringify({"Error" : false, "data" : entrels}))
};


module.exports = {
  getEntRelData,
  getEntRelInfo,
  getEntRelChild,
  getEntRelParent,
  getEntList
}