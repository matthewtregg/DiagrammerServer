const pool = require('./index');
class DFDEnts {
  constructor(
  ) {}
  
  async getDFDEntInfo(entId) {
    const [result] = await pool.execute(
      `SELECT  * FROM MVXD008.ENTRELS rel INNER JOIN MVXD008.ENTITIES ent ON rel.PAR = ent.ENTID
      WHERE rel.PAR = '${entId}' UNION
      SELECT  * FROM MVXD008.ENTRELS rel INNER JOIN MVXD008.ENTITIES ent ON rel.CHLD = ent.ENTID
      WHERE rel.CHLD = '${entId}' ;`
      );  
      return result;
  };

  async getDFDPgmInfo(viewId) {
   
    const [result] = await pool.execute(
    `SELECT  * FROM MVXD008.PGMFILES fl
    WHERE fl.VIEWID = '${viewId}'`
    );  
    return result;
  };

  async getCentralSchema(entId){

  const [result] = await pool.execute(
    `SELECT  * FROM MVXD008.PGMSCMDB db
    WHERE db.ENTID = '${entId}'`
    );  
    return result;
  };


}

module.exports = DFDEnts;