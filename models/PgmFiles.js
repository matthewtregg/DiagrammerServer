const pool = require('./index');
class PgmFiles {
  constructor(
   pgmID,
   pgmDIR,
   viewID,
   viewDIR,
   objTYP,
   entID,
   fWRITE,
   fUPDATE,
   fSEQREAD,
   fDELETE,
   eFID,
   rLNID,
   fileNM,
   appNM,
   intFID,
   whDTTM,
   whFUSG,
   whRFSN,
   whOBJT,
   whOTYP,
   whSYSN,
   whSPKG,
   whRFNB, 
  ) {}

  async getPgmFiles(pgmId) {
    const [result] = await pool.execute(
    `SELECT * FROM PgmFiles WHERE PGMID = ?`,[pgmId] 
    );  
    return result;
  };

    //PGMDEFS
  async getWhereUsedFiles(dbname, entId) {
    return pool.execute(
      `SELECT * FROM ${dbname}.PgmFiles pf 
      INNER JOIN ${dbname}.PGMDEFS pd
      ON pf.PGMID = pd.PGMID  
      WHERE pf.ENTID = ?`
      ,[entId] 
      );  
  }





  








  async getDFDinfo(viewId) {
    const [result] = await pool.execute(
      `SELECT * FROM PgmFiles WHERE VIEWID = ?`, [viewId]
    );
    return result;
  }
 
}

module.exports = PgmFiles