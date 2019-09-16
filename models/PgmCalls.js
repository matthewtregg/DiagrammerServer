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

 async getDisplayPgms() {
    const display = "D"
    const [result] = await pool.execute(
      `SELECT * FROM MVXD008.PGMCALLS WHERE PGMID <> CLDPGM AND CALLCLS = 'D' AND EXCPGM = ''`
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
    const [result] = await pool.execute(
      `SELECT * FROM ${dbname}.PGMCALLS pc
      INNER JOIN ${dbname}.PGMDEFS pd
      ON pc.PGMID = pd.PGMID  
      WHERE pc.PGMID=? OR pc.CLDPGM=? AND pc.EXCPGM=''`,[pgmId,pgmId]); 
    return result;
  }
 

  async getPgmList() {
    const [result] = await pool.execute(
    `SELECT DISTINCT PGMID FROM PgmCalls` 
    );  
    return result;
  };

 
 
}

module.exports = PgmCalls

