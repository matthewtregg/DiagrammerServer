const EntRels = require("../models/EntRels");
const Entities = require("../models/Entities");
const PgmDefs = require("../models/PgmDefs");
const PgmSchema = require("../models/PgmSchema");
const PgmFiles = require("../models/PgmFiles");
const EntSchema = require("../models/EntSchema");

const getEntrels = async (req, res) => {
  const dbname = req.params.dbName;
  const Entrels = new EntRels();
  const entFile = await Entrels.getFullFile(dbname);
  console.log(entFile);
  res.send(entFile);
};

const getPgmFiles = async (req, res) => {
  const dbname = req.params.dbName;
  const pgmfiles = new PgmFiles();
  const pgmFile = await pgmfiles.getFullFile(dbname);
  const finalpgmFile = pgmFile.map((file) => {
    if (file.ENTID) file.ENTID = file.ENTID.trim();
    if (file.VIEWID) file.VIEWID = file.VIEWID.trim();
    return file;
  });
  console.log(pgmFile);
  res.send(finalpgmFile);
};

const getPgmSchema = async (req, res) => {
  const pgm = req.params.pgm;
  const ent = req.params.ent;
  const pgmschema = new PgmSchema();
  const pgmSchemafile = await pgmschema.getPgmSchema(pgm, ent);
  const fileSchema = new EntSchema();
  const fileSchemafile = await fileSchema.getEntSchema(ent);
  res.send([...fileSchemafile, ...pgmSchemafile]);
};

const getEntSchema = async (req, res) => {
  const ent = req.params.ent;
};

const getPgmDiagSchemas = async (req, res) => {
  const pgms = JSON.parse(req.params.pgms);
  console.log(pgms);
  const pgmschema = new PgmSchema();
  const pgmSchemafile = await pgmschema.getPgmDiagSchemas(pgms);
  res.send(pgmSchemafile);
};

const getPgmDefs = async (req, res) => {
  const dbname = req.params.dbName;
  const pgmdefs = new PgmDefs();
  const entFile = await pgmdefs.getFullFile(dbname);
  console.log(entFile);
  res.send(entFile);
};

const getEntities = async (req, res) => {
  const dbname = req.params.dbName;
  const entities = new Entities();
  const entitiesFile = await entities.getFullFile(dbname);
  console.log(entitiesFile);
  res.send(entitiesFile);
};

module.exports = {
  getEntrels,
  getPgmDefs,
  getPgmSchema,
  getPgmFiles,
  getEntities,
  getEntSchema,
  getPgmDiagSchemas,
};
