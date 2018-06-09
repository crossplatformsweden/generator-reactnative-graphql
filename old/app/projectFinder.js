
const glob = require('glob')

module.exports = {
  findProjects: function () {
    var proj = glob.sync('**/*.csproj', null)
    // console.log(proj)
    console.log(this.options)
    return proj
  }
}
