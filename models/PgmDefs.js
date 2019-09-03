const pool = require('./index');
class PgmDefs {
  constructor(
   pgmID,
   rlvchlcnt,
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
   updby,
   dirnm,
   appnm,
   connected,
   entrypnt, 
  ) {}

  async getPgmDefList(pgmIds) {
    let pgmIdValues = "("
    pgmIds.forEach((id,index) => {
      if (index === 0) pgmIdValues += "'"+id+"'"
      else pgmIdValues += ","+ "'"+id + "'"  
    });
    pgmIdValues += ")"
    console.log(pgmIdValues);
    const [result] = await pool.execute(
    `SELECT * FROM PgmDefs WHERE PGMID IN ${pgmIdValues}` 
    );  
    return result;
  };

 
 
}

module.exports = PgmDefs