const pool = require('./index');
class EntSchema {
  constructor(
    pgmID,
    shortnm,
    rnmonly,
    len,
    decp,
    dtatyp, 
    flddbcls,
    fldscncls,
    entID,
    viewID,
    ftxt,
    fseq,
    dirnm,
    appnm
  ) {}



  async getEntSchema(EntId) {
    const [result] = await pool.execute(
        `SELECT * FROM MVXD008.ENTSCHEMA WHERE ENTID = ?`, [EntId]
      );
    return result;
  }


}

module.exports = EntSchema;