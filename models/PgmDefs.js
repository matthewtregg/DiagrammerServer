const pool = require('./index');
class PgmDefs {
  constructor(
    pgmID,
    rlvChlcnt,
    pgmnm,
    pgmtx,
    pgmcls,
    objpgm,
    pgmtyp,
    srcmbrnm,
    srcfile,
    srcdir,
    fileid,
    viewid,
    cmpcls,
    crtdat,
    crtby,
    upddat,
    upddby,
    dirnm,
    appnm,
    connected,
    entrypnt
  ) {}

  async getPgmList() {
    const [result] = await pool.execute(
    `SELECT Pgmnm FROM PgmDefs` 
    );  
    return result;
  };

 
 
}

module.exports = PgmDefs