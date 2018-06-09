const Generator = require('yeoman-generator')
const readdirp = require('readdirp')
const fs = require('fs')

module.exports = class extends Generator {
  renameFiles (typeName, name) {
    readdirp({ root: '.', directoryFilter: [ '!.git', '!*modules' ] })
      .on('data', function (entry) {
        // ACCESS ALL FILES
        fs.rename(entry.path, entry.path.replace('[templateName]', name))
      })
  }
}
