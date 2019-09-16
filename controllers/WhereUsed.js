const PgmCalls = require('../models/PgmCalls');
const PgmFiles = require('../models/PgmFiles');
const PgmSchema = require('../models/PgmSchema');
const PgmCode = require('../models/PgmCode');

const getFileField= async(req,res) => {
 const dbname = req.params.dbName;
 const fieldId = req.params.fieldId;
 const pgmSchema = new PgmSchema();
 const result = await pgmSchema.getFieldWhereUsed(dbname, fieldId);
 res.send(result);   
}

const getPgms = async(req,res) => {
 const dbname = req.params.dbName;
 const pgmId = req.params.PgmId;
 const pgmCalls = new PgmCalls();
 const result = await pgmCalls.getWhereUsedPgms(dbname, pgmId);
 res.send(result);   
}

const getEnts = async(req,res) => {
 const dbname = req.params.dbName;
 const entId = req.params.EntId;
 const pgmFiles = new PgmFiles();
 const result = await pgmFiles.getWhereUsedFiles(dbname, entId);
 res.send(result);   
}

const getVar= async(req,res) => {
 const dbname = req.params.dbName;
 const variable = req.params.Var;
 const pgmCode = new PgmCode();
 const result = await pgmCode.getVarUsed(dbname, variable);
 res.send(result);   
}

module.exports = {
  getFileField,
  getPgms,
  getEnts,
  getVar
}
