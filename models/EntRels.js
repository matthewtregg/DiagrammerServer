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

  async getEntRels() {

    const [result] = await pool.execute(
      `SELECT * FROM MVXD008.ENTRELS`
    );  
    return result;
  };
 
}

module.exports = EntRels;
