const pool = require('./index');
class PgmSchema {
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

  async getPgmSchemaDefList(pgmIds) {
    let pgmIdValues = "("
    pgmIds.forEach((id,index) => {
      if (index === 0) pgmIdValues += "'"+id+"'"
      else pgmIdValues += ","+ "'"+id + "'"  
    });
    pgmIdValues += ")";
    const [result] = await pool.execute(
    `SELECT * FROM PGMSCMDB WHERE PGMID IN ${pgmIdValues}` 
    );  
    return result;
  };

  async getFileSchemaDefList(entIds) {
    let entIdValues = "("
    entIds.forEach((id,index) => {
      if (index === 0) entIdValues += "'"+id+"'"
      else entIdValues += ","+ "'"+id + "'"  
    });
    entIdValues += ")";
    const [result] = await pool.execute(
    `SELECT * FROM PGMSCMDB WHERE ENTID IN ${entIdValues}` 
    );  
    return result;
  };

  //PGMDEFS
  async getFieldWhereUsed(dbname,fieldId){
    return pool.execute(
      `SELECT * FROM ${dbname}.PGMSCMDB pb
      INNER JOIN ${dbname}.PGMDEFS pd
      ON pb.PGMID = pd.PGMID  
      WHERE pb.SHORTNM = '${fieldId}'`
      );  
  }


}

module.exports = PgmSchema;

