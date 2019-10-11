
const getRep = async(req,res) => {
  console.log("Repository");
  res.send(  [{"LIBRARY_NM":"MVXD008"}]);
}

module.exports = {
  getRep
}


