const pool = require('./index');
class EntRels {
  constructor(
    rlnID,
    rlnTp,
    rtxt,
    par,
    parSeq,
    chld, 
    chldSeq,
    parnm,
    chldnm,
    pardir,
    chlddir,
    appNm
  ) {}


  async getOtherRels(entArray) {
    let arrayItems = "("
    entArray.forEach((id,index) => {
      if (index === 0) arrayItems += "'"+id+"'"
      else arrayItems += ","+ "'"+id + "'"  
    });
    arrayItems += ")"
    const [result] = await pool.execute(
      `SELECT * FROM MVXD008.ENTRELS WHERE PAR IN ${arrayItems} AND CHLD IN ${arrayItems} AND PAR <> CHLD`
    );
      return result;
  };


  async getEntRels() {
    const [result] = await pool.execute(
      `SELECT * FROM MVXD008.ENTRELS WHERE PAR <> CHLD`
    );  
    return result;
  };

  async getEntRel(ent) {
    const [result] = await pool.execute(
      `SELECT * FROM MVXD008.ENTRELS WHERE PAR = ? OR CHLD = ? AND PAR <> CHLD`,[ent,ent]
    );  
    return result;
  };
  
  async getEntRelChild(ent) {
    const [result] = await pool.execute(
      `SELECT * FROM MVXD008.ENTRELS WHERE PAR = ? AND PAR <> CHLD`,[ent]
    );
    return result;
  }

  async getEntRelParent(ent) {
    const [result] = await pool.execute(
      `SELECT * FROM MVXD008.ENTRELS WHERE CHLD = ? AND PAR <> CHLD`,[ent]
    );
    return result;
  }
 
}

module.exports = EntRels;
