const pool = require('./index');
class PgmCode {
  constructor(
    pgmID,
    sttnum,
    linenum,
    stndate,
    stntyp,
    stn,
    opcode,
    lvlnum,
    stateid,
    ruleid,
    rlseq,
    ruletyp,
    optype,
    opcls,
    cmptor,
    mvar,
    svar1,
    svar2,
    svar3,
    svar4,
    filenm,
    invprnm,
    curprnm,
    keyseqno,
    prfl,
    bif,
    bifcls,
    dsnm,
    frompos,
    topos,
    len,
    decp,
    dtatyp,
    elem,
    mvardb,
    svar1db,
    svar2db,
    svar3db,
    svar4db,
    srcfile,
    srcdir,
    appnm
  ) {}

  async getPgmSource(pgmID) {
    const [result] = await pool.execute(
    `SELECT * FROM MVXD008.PGMCODE WHERE PGMID = '${pgmID}'` 
    ); 
    return result;
  };

    //PGM DEFS
  async getVarUsed(dbname,variable) {
    const [result] = await pool.execute(
    `select pc.PGMID as PgmID, pc.LINENUM as LineNum, pc.STN as Stn from ${dbname}.PGMCODE pc
     INNER JOIN ${dbname}.PGMDEFS pd
     ON pc.PGMID = pd.PGMID  
     WHERE pc.MVARDB='${variable}' OR pc.SVAR1DB='${variable}' OR pc.SVAR2DB='${variable}' OR pc.SVAR3DB='${variable}' OR pc.SVAR4DB='${variable}'
     `,
    ); 
    return result;
  }

 
}

module.exports = PgmCode