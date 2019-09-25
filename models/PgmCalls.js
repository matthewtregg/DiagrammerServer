const pool = require('./index');
class PgmCalls {
  constructor(
    pgmID,
    pgmCls,
    name,
    callSeq,
    excPgm,
    clPgtyp, 
    cldPgm,
    totChlcnt,
    rlvChlcnt,
    chlChlcnt,
    callID,
    callTyp,
    callTxt,
    callCls,
    pgmDir,
    cldDir,
    appNm
  ) {}

 async getDisplayPgms(dbName) {
    const display = "D"
    const [result] = await pool.execute(
      `SELECT * FROM ${dbName}.PGMCALLS WHERE PGMID <> CLDPGM AND CALLCLS = 'D' AND EXCPGM = ''`
    )
    return result;
  };

  async getDFDpgmPgms(pgmId) {
    const display = "D"
    const [result] = await pool.execute(
      `SELECT * FROM MVXD008.PGMCALLS WHERE PGMID=? OR CLDPGM=? AND CALLCLS = 'D' AND EXCPGM = ''`,[pgmId,pgmId]); 
    return result;

  }
 

  //PGM DEFS
  async getWhereUsedPgms(dbname, pgmId) {
    const display = "D"
    return pool.execute(
      `SELECT pc.PGMID, pc.CLDPGM, pd.PGMTX, pd.PGMTYP  FROM ${dbname}.PGMCALLS pc INNER JOIN ${dbname}.PGMDEFS pd ON pc.CLDPGM = pd.PGMID
      WHERE pc.PGMID = '${pgmId}' AND pc.EXCPGM = '' UNION
      SELECT pc.PGMID, pc.CLDPGM, pd.PGMTX, pd.PGMTYP  FROM ${dbname}.PGMCALLS pc INNER JOIN ${dbname}.PGMDEFS pd ON pc.PGMID = pd.PGMID
      WHERE pc.CLDPGM = '${pgmId}' AND pc.EXCPGM = ''`
     );
  }
 

  async getPgmList(dbName) {
    const [result] = await pool.execute(
    `SELECT DISTINCT PGMID FROM ${dbName}.PgmCalls`
    );  
    return result;
  };

 
 
}

module.exports = PgmCalls

