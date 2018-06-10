import chalk from 'chalk';
const Generator = require('yeoman-generator');
import yosay = require('yosay');
import * as glob from 'glob';
import { lstatSync, readdirSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';
import * as _ from 'lodash';
import * as shell from 'shelljs';

class QueryGenerator extends Generator {
  public async initializing() {
    // Welcome
    this.log(
      yosay('Welcome to the amazing ' + chalk.red('React Native Graphql') + ' generator!')
    );
  }

  public async prompting() {
    const isDirectory = source => lstatSync(source).isDirectory();
    const getDirectories = source =>
      readdirSync(source)
        .map(name => join(source, name))
        .filter(isDirectory);

    let mobileFeaturesFolder = this.config.get('promptValues').mobileFeature;

    const features = getDirectories(mobileFeaturesFolder);

    const choices = _.map(features, feature => {
      return {
        name: feature,
        value: feature
      };
    });

    const selectFeature = {
      type: 'list',
      name: 'selectedFeature',
      message: 'Select feature',
      choices: choices
    };

    const nameOfComponent = {
      type: 'input',
      name: 'componentName',
      message: 'Your component name ex. ' + chalk.yellow('UserList')
    };

    const nameOfQuery = {
      type: 'input',
      name: 'queryName',
      message: 'Your QueryName name ex. ' + chalk.yellow('MyUserListQuery')
    };

    const answers = await this.prompt([selectFeature, nameOfComponent, nameOfQuery]);

    this.log('Component Name: ' + answers.componentName);
    this.log('Query Name: ' + answers.queryName);
    this.log('Selected Feature: ' + answers.selectedFeature);
    this.props = answers;
  }

  public writing() {
    console.log('Writing');
    console.log(this.props.componentName);
    console.log(this.props.queryName);

    const data = {
      componentName: this.props.componentName,
      queryName: this.props.queryName,
      queryNameCamel: _.camelCase(this.props.queryName)
    };

    this.log(this.props.selectedFeature);
    this.log(this.props.componentName);

    const dir = `${this.props.selectedFeature}/${this.props.componentName}/component/`;
    const dir2 = `${this.props.selectedFeature}/${this.props.componentName}/query/`;

    if (!existsSync(dir)) {
      shell.mkdir('-p', dir);
      shell.mkdir('-p', dir2);
    }

    //COPY COMPONENT
    this.fs.copyTpl(
      this.templatePath('component/_Component.tsTemplate'),
      this.destinationPath(`${dir}/${this.props.componentName}Component.tsx`),
      data
    );
    this.fs.copyTpl(
      this.templatePath('component/_Component.test.tsTemplate'),
      this.destinationPath(`${dir}/${this.props.componentName}Component.test.tsx`),
      data
    );

    // COPY QUERY
    this.fs.copyTpl(
      this.templatePath('query/_Query.tsTemplate'),
      this.destinationPath(`${dir2}/${this.props.queryName}Query.ts`),
      data
    );
    this.fs.copyTpl(
      this.templatePath('query/_Query.test.tsTemplate'),
      this.destinationPath(`${dir2}/${this.props.queryName}Query.test.ts`),
      data
    );
  }
}

export = QueryGenerator;
