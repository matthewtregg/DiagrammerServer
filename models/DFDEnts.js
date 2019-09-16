const pool = require('./index');
class DFDEnts {
  constructor(
  ) {}
  
  async getDFDEntInfo(entId) {
    return pool.execute(
      `SELECT  * FROM MVXD008.ENTRELS rel INNER JOIN MVXD008.ENTITIES ent ON rel.PAR = ent.ENTID
      WHERE rel.PAR = '${entId}' UNION
      SELECT  * FROM MVXD008.ENTRELS rel INNER JOIN MVXD008.ENTITIES ent ON rel.CHLD = ent.ENTID
      WHERE rel.CHLD = '${entId}' ;`
      );  
  };

  async getDFDPgmInfo(viewId) {
    return  pool.execute(
    `SELECT  * FROM MVXD008.PGMFILES fl
    WHERE fl.VIEWID = '${viewId}'`
    );  
  };

  async getCentralSchema(entId){
  return pool.execute(
    `SELECT  * FROM MVXD008.PGMSCMDB db
    WHERE db.ENTID = '${entId}'`
    );  
  };


}

module.exports = DFDEnts;