const pool = require('./index');
class DFDPgms {
  constructor(
  ) {}
  
  async getDFDPgmInfo(pgmId) {
    const [result] = await pool.execute(
      `SELECT  * FROM MVXD008.PGMCALLS pc INNER JOIN MVXD008.PGMDEFS pd ON pc.PGMID = pd.PGMID
      WHERE pc.PGMID = '${pgmId}' AND pc.EXCPGM = '' UNION
      SELECT  * FROM MVXD008.PGMCALLS pc INNER JOIN MVXD008.PGMDEFS pd ON pc.CLDPGM = pd.PGMID
      WHERE pc.CLDPGM = '${pgmId}' AND pc.EXCPGM = '';` 
      );  
      return result;
  };

  async getDFDFileInfo(pgmId) {
   
    const [result] = await pool.execute(
    `SELECT * FROM MVXD008.PGMFILES fl
    WHERE fl.PGMID = '${pgmId}'
    ` 
    );  
    return result;
  };

  async getCentralSchema(pgmId) {
    const [result] = await pool.execute(
      `SELECT  * FROM MVXD008.PGMSCMDB db
      WHERE db.PGMID = '${pgmId}'`
      );  
      return result;
  }

}

module.exports = DFDPgms;