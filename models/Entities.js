const pool = require('./index');
class Entities {
  constructor(
    entID,
    rcdfmt,
    entnm,
    enttx,
    enttp,
    crtdat, 
    crtby,
    upddat,
    updby,
    objpgm,
    pgmtyp,
    srcmbrnm,
    srcfile,
    srcdir,
    dirnm,
    appnm
  ) {}
  
  async getEntDefList(entIds) {
    let entIdValues = "("
    entIds.forEach((id,index) => {
      if (index === 0) entIdValues += "'"+id+"'"
      else entIdValues += ","+ "'"+id + "'"  
    });
    entIdValues += ")";
    const [result] = await pool.execute(
    `SELECT * FROM Entities WHERE ENTID IN ${entIdValues}` 
    );  
    return result;
  };

}

module.exports = Entities;