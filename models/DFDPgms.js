const pool = require('./index');
class DFDPgms {
  constructor(
  ) {}
  
  getDFDPgmInfo(pgmId) {
    return pool.execute(
      `SELECT pc.PGMID AS PGMID, pc.CLDPGM AS CLDPGM, pd.PGMTX  FROM MVXD008.PGMCALLS pc INNER JOIN MVXD008.PGMDEFS pd ON pc.CLDPGM = pd.PGMID
      WHERE pc.PGMID = '${pgmId}' AND pc.EXCPGM = '' AND pc.PGMID <> pc.CLDPGM UNION
      SELECT pc.PGMID AS PGMID, pc.CLDPGM AS CLDPGM, pd.PGMTX FROM MVXD008.PGMCALLS pc INNER JOIN MVXD008.PGMDEFS pd ON pc.PGMID = pd.PGMID
      WHERE pc.CLDPGM = '${pgmId}' AND pc.EXCPGM = '' AND pc.PGMID <> pc.CLDPGM;` 
      );  
  };

  getDFDFileInfo(pgmId) {
    return pool.execute(
    `SELECT * FROM MVXD008.PGMFILES fl
    WHERE fl.PGMID = '${pgmId}'
    ` 
    );  
  };

  getCentralSchema(pgmId) {
    return pool.execute(
      `SELECT  * FROM MVXD008.PGMSCMDB db
      WHERE db.PGMID = '${pgmId}'`
      );  
  }

}

module.exports = DFDPgms;