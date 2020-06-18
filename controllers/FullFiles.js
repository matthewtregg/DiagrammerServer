

const EntRels = require('../models/EntRels');
const Entities = require('../models/Entities');
const PgmDefs = require('../models/PgmDefs');
const PgmSchema = require('../models/PgmSchema');
const PgmFiles = require('../models/PgmFiles');

const getEntrels = async(req, res) => {
    const dbname = req.params.dbName;
    const Entrels = new EntRels ();
    const entFile = await Entrels.getFullFile(dbname);
    console.log(entFile);
    res.send(entFile);
}

const getPgmFiles = async(req, res) => {
    const dbname = req.params.dbName;
    const pgmfiles = new PgmFiles ();
    const pgmFile = await pgmfiles.getFullFile(dbname);
    console.log(pgmFile);
    res.send(pgmFile);
}

const getPgmSchema = async(req, res) => {
    const dbname = req.params.dbName;
    const pgmschema = new PgmSchema ();
    const schemafile = await pgmschema.getFullFile(dbname);
    console.log(schemafile);
    res.send(entFile);
}


const getPgmDefs = async(req, res) => {
    const dbname = req.params.dbName;
    const pgmdefs = new PgmDefs ();
    const entFile = await pgmdefs.getFullFile(dbname);
    console.log(entFile);
    res.send(entFile);
}

const getEntities = async(req, res) => {
    const dbname = req.params.dbName;
    const entities = new Entities ();
    const entitiesFile = await entities.getFullFile(dbname);
    console.log(entitiesFile);
    res.send(entitiesFile);
}


module.exports = {
    getEntrels,
    getPgmDefs,
    getPgmSchema,
    getPgmFiles,
    getEntities
}