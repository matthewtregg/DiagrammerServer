const pool = require("./index");
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

  async saveDMDNodes(DMDNodes) {
    const [result] = await pool.execute(
      `
      INSERT INTO SavedDiags.DMDNodes (NAME,FX,FY,ISCIRCLE, LEFTX, RECTWIDTH, RECTX, RIGHTX, TEXTLENGTH, VX,VY, X,Y, DIAGNAME)
      VALUES${DMDNodes}; `
    );
    return result;
  }

  async saveDMDLinks(DMDLinks) {
    const [result] = await pool.execute(
      `INSERT INTO SavedDiags.DMDLinks (RELID,SOURCENAME,SOURCEFX,SOURCEFY,SOURCEINDEX,SOURCEISCIRCLE,SOURCELEFTX,SOURCERECTWIDTH,SOURCERECTX,SOURCERIGHTX,SOURCETEXTLENGTH,SOURCEXCOORD,SOURCEYCOORD,SOURCEVX,SOURCEVY,TARGETNAME,TARGETFX,TARGETFY,TARGETINDEX,TARGETISCIRCLE,TARGETLEFTX,TARGETRECTWIDTH,TARGETRECTX,TARGETRIGHTX,TARGETTEXTLENGTH,TARGETXCOORD,TARGETYCOORD,TARGETVX,TARGETVY,SOURCEX,SOURCEY,TARGETX,TARGETY,DIAGNAME)
      VALUES ${DMDLinks}`
    );
    return result;
  }

  async getDMDNodes() {
    const [result] = await pool.execute(`SELECT * FROM SavedDiags.DMDNodes`);
    return result;
  }

  async getDMDLinks() {
    const [result] = await pool.execute(`SELECT * FROM SavedDiags.DMDLinks`);
    return result;
  }
}

module.exports = PgmSchema;
