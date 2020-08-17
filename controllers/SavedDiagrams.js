const SavedDiags = require("../models/SavedDiags");

const saveDMD = async (req, res) => {
  const name = req.params.name;
  const nodes = req.body.nodes;
  const links = req.body.links;
  DMDNodeArray = objRelDMDNodeMap(nodes, name);
  DMDLinksArray = objRelDMDLinksMap(links, name);
  console.log(DMDNodeArray);
  console.log(DMDLinksArray);
  const savedDiags = new SavedDiags();
  const savedDMDNodes = await savedDiags.saveDMDNodes(DMDNodeArray);
  const savedDMDLinks = await savedDiags.saveDMDLinks(DMDLinksArray);
};

const getDMDs = async (req, res) => {
  const savedDiags = new SavedDiags();
  const DMDNodes = await savedDiags.getDMDNodes();
  const DMDLinks = await savedDiags.getDMDLinks();
  const DMDCharts = convertNodes(DMDNodes, DMDLinks);
  res.send(DMDCharts);
};

module.exports = {
  saveDMD,
  getDMDs,
};

const convertNodes = (DMDNodes, DMDLinks) => {
  const DiagNames = DMDNodes.map((node) => node.DIAGNAME);
  const filteredNames = new Set(DiagNames);
  const finalNames = [...filteredNames];
  return finalNames.map((name) => {
    const nodes = DMDNodes.filter((node) => node.DIAGNAME === name);
    const links = DMDLinks.filter((link) => link.DIAGNAME === name);
    return {
      name,
      nodes,
      links,
    };
  });
};

const objRelDMDLinksMap = (links, name) => {
  const newLinks = links.map((link) => {
    const sourceFx = link.source.fx ? link.source.fx : 0;
    const sourceFy = link.source.fy ? link.source.fy : 0;
    const targetFx = link.target.fx ? link.target.fx : 0;
    const targetFy = link.target.fy ? link.target.fy : 0;
    const relID = link.source.name + ":" + link.target.name;
    const linktextLength = link.source.textLength ? link.source.textLength : 0;
    const linkStraight = link.straight ? 1 : 0;
    const targettextLength = link.target.textLength
      ? link.target.textLength
      : 0;

    const linksRow =
      "(" +
      "'" +
      relID +
      "'" +
      "," +
      "'" +
      link.source.name +
      "'" +
      "," +
      sourceFx +
      "," +
      sourceFy +
      "," +
      link.source.index +
      "," +
      Number(link.source.isCircle) +
      "," +
      link.source.leftX +
      "," +
      link.source.rectWidth +
      "," +
      link.source.rectX +
      "," +
      link.source.rightX +
      "," +
      linktextLength +
      "," +
      link.source.x +
      "," +
      link.source.y +
      "," +
      link.source.vx +
      "," +
      link.source.vy +
      "," +
      "'" +
      link.target.name +
      "'" +
      "," +
      targetFx +
      "," +
      targetFy +
      "," +
      link.target.index +
      "," +
      Number(link.target.isCircle) +
      "," +
      link.target.leftX +
      "," +
      link.target.rectWidth +
      "," +
      link.target.rectX +
      "," +
      link.target.rightX +
      "," +
      targettextLength +
      "," +
      link.target.x +
      "," +
      link.target.y +
      "," +
      link.target.vx +
      "," +
      link.target.vy +
      "," +
      link.sourceX +
      "," +
      link.sourceY +
      "," +
      link.targetX +
      "," +
      link.targetY +
      "," +
      "'" +
      name +
      "'" +
      "," +
      linkStraight +
      ")";

    // link Row push
    return linksRow;
  });
  return newLinks.join();
};

const objRelDMDNodeMap = (nodes, name) => {
  const newNodes = nodes.map((node) => {
    const nodeFx = node.fx ? node.fx : 0;
    const nodeFy = node.fy ? node.fy : 0;
    const textLength = node.textLength ? node.textLength : 0;
    const nodeRow =
      "(" +
      "'" +
      node.name +
      "'" +
      "," +
      nodeFx +
      "," +
      nodeFy +
      "," +
      Number(node.isCircle) +
      "," +
      node.leftX +
      "," +
      node.rectWidth +
      "," +
      node.rectX +
      "," +
      node.rightX +
      "," +
      textLength +
      "," +
      node.vx +
      "," +
      node.vy +
      "," +
      node.x +
      "," +
      node.y +
      "," +
      "'" +
      name +
      "'" +
      ")";

    return nodeRow;
  });
  return newNodes.join();
};
