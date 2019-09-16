const PgmCalls = require('../models/PgmCalls');
const PgmFiles = require('../models/PgmFiles');
const PgmSchema = require('../models/PgmSchema');
const PgmCode = require('../models/PgmCode');

const getFileField= async(req,res) => {
 const dbname = req.params.dbName;
 const fieldId = req.params.fieldId;
 const pgmSchema = new PgmSchema();
 pgmSchema.getFieldWhereUsed(dbname, fieldId).then(result => res.send(result[0]));
   
}

const getPgms = async(req,res) => {
 const dbname = req.params.dbName;
 const pgmId = req.params.PgmId;
 const pgmCalls = new PgmCalls();
 pgmCalls.getWhereUsedPgms(dbname, pgmId).then(result => res.send(result[0]));
}

const getEnts = async(req,res) => {
 const dbname = req.params.dbName;
 const entId = req.params.EntId;
 const pgmFiles = new PgmFiles();
 pgmFiles.getWhereUsedFiles(dbname, entId).then(result => res.send(result[0]));
}

const getVar= async(req,res) => {
 const dbname = req.params.dbName;
 const variable = req.params.Var;
 const pgmCode = new PgmCode();
 pgmCode.getVarUsed(dbname, variable).then(result => res.send(result[0]));
}

module.exports = {
  getFileField,
  getPgms,
  getEnts,
  getVar
}
