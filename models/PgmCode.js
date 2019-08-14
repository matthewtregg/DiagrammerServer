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
    `SELECT PGMID, STNTYP, LINENUM, STN, STNDATE, OPCODE, OPTYPE, CMPTOR, LVLNUM, MVAR, SVAR1, SVAR2, SVAR3, SVAR4, FILENM, INVPRNM, CURPRNM, STATEID, RULEID, RLSEQ, RULETYP FROM MVXD008.PGMCODE WHERE PGMID = '${pgmID}'` 
    ); 
    return result;
  };

 
 
}

module.exports = PgmCode