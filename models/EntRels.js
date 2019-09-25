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
  
  // get children
  async getEntRelChild(ent) {
    const [result] = await pool.execute(
      `SELECT ent1.PAR AS PAR, ent1.CHLD AS CHLD, ent2.CHLD AS LASTCHILD FROM MVXD008.ENTRELS ent1 
      LEFT JOIN MVXD008.ENTRELS ent2 ON ent1.CHLD = ent2.PAR
      WHERE ent1.PAR = ? AND ent1.PAR <> ent1.CHLD`
      ,[ent]
    );
    return result;
  }


  
  async getEntRelParent(ent) {
    const [result] = await pool.execute(
      `SELECT ent1.CHLD AS CHLD, ent1.PAR AS PAR, ent2.PAR AS LASTPARENT FROM MVXD008.ENTRELS ent1 
      LEFT JOIN MVXD008.ENTRELS ent2 ON ent1.PAR = ent2.CHLD
      WHERE ent1.CHLD = ? AND ent1.PAR <> ent1.CHLD`
      ,[ent]
    );
    return result;
  }


 
}

module.exports = EntRels;
