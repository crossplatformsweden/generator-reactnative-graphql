'use strict'
const Generator = require('yeoman-generator')
const chalk = require('chalk')
const yosay = require('yosay')
const projectFinder = require('./projectFinder.js')
const _ = require('lodash')
const ClassType = require('./ClassType')
const path = require('path')
const xml2js = require('xml2js')
const nodefs = require('fs')
const MyBase = require('./MyBase')

module.exports = class extends MyBase {
  constructor (args, opts) {
    super(args, opts)
    this.templateData = {}
    this.argument('type', { type: String, required: true })

    // And you can then access it later; e.g.
    // this.log(this.options.type)

    this.projectNames = projectFinder.findProjects()

    this.log(yosay(
      'Welcome to the swell ' + chalk.red('generator-xamarinmvvm') + ' generator!' + '/xEmil'
    ))
  }

  prompting () {
    // TODO WHY NOT WORK?
    // if (this.options.type !== 'p' || 's') {
    //   throw new Error(only p, s types allowed')
    // }
    this.typeName = ClassType.getName(this.options.type)

    var prompts = [
      {
        type: 'list',
        name: 'projectPath',
        message: chalk.red(`[/${this.typeName}] `) + 'Source project: ',
        choices: this.projectNames
      },
      {
        type: 'input',
        name: 'name',
        message: chalk.red(`[/${this.typeName}] `) + `${this.typeName} Name:`
      }]

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.projectPath;
      this.props = props
      this.name = props.name
      this.projectPath = props.projectPath
    })
  }

  writing () {
    // Copy all files under type
    var staticPathToTypeSubfolder = `../static/${this.typeName}/`
    var destPath = `${this.name}`

    var file = path.basename(this.projectPath)

    this.nameSpace = file.replace('.csproj', '') + '.' + this.typeName + '.' + this.name

    this.fs.copyTpl(
      this.templatePath(staticPathToTypeSubfolder),
      this.destinationRoot(destPath),
      // TEMPLATE CAN ACCESS ALL this.propEx
      this
    )

    // Called in MyBase.js  
  }
  _copyPage () {
    var staticPathToTypeSubfolder = `../static/Page/Page.xaml`
    this.fs.copyTpl(
      this.templatePath(staticPathToTypeSubfolder),
      this.destinationRoot(`Page/${this.name}Page.xaml`),
      // TEMPLATE CAN ACCESS ALL this.propEx
      this
    )
  }

  paths () {
    var templateSourcePath = path.dirname(this.props.projectPath) + '/' + ClassType.getName(this.options.type)
    console.log('PATH: ' + templateSourcePath)
    this.destinationRoot(templateSourcePath)
  }

  rename () {
    console.log('RENAME')
  }

  install () {
    this.renameFiles(this.typeName, this.name)
    this.installDependencies()

    var parser = new xml2js.Parser()
    nodefs.readFile(this.props.projectPath, function (data) {
      parser.parseString(data, function (result) {
        console.dir(result)
        console.log('Done')
      })
    })
  }
}
