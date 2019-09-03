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

 
 
}

module.exports = PgmFiles