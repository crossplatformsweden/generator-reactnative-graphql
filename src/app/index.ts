import chalk from 'chalk';
const Generator = require('yeoman-generator');
import yosay = require('yosay');
import * as glob from 'glob';
import { lstatSync, readdirSync } from 'fs';
import { join } from 'path';
import * as _ from 'lodash';

class ReactGenerator extends Generator {
  public async initializing() {
    // Welcome
    this.log(
      yosay('Welcome to the amazing ' + chalk.red('React Native Graphql') + ' generator!')
    );

    if (
      !this.config.get('promptValues') ||
      !this.config.get('promptValues').mobileFeature
    ) {
      let folders = glob.sync('**/features', null);

      if (folders.length == 0) {
        throw new Error('Create a features folder inside mobile project');
      }

      const choices = _.map(folders, folder => {
        return {
          name: folder,
          value: folder
        };
      });

      const mobileFeatureFolder = {
        type: 'list',
        name: 'mobileFeature',
        message: 'What feature folder belongs to mobile project',
        choices: choices,
        store: true
      };

      const answers = await this.prompt(mobileFeatureFolder);
      this.log('mobileFolder: ' + answers.mobileFeature);

      //const isDirectory = source => lstatSync(source).isDirectory()
      // const getDirectories = source =>
      //   readdirSync(source).map(name => join(source, name)).filter('isDirectory');
    }
  }

  public async prompting() {
    const selectComponentTypePrompt = {
      type: 'list',
      name: 'type',
      message: 'What type of Component do you want to create?',
      choices: [
        {
          name: 'ReactNative Component with Query',
          value: 'comp-query'
        },
        {
          name: 'ReactNative Component with Mutation',
          value: 'comp-mutation'
        },
        {
          name: 'ReactNative Component with Query And Mutation',
          value: 'comp-querymutation'
        },
        {
          name: 'ReactNative Component Pure',
          value: 'comp-pure'
        }
      ]
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

    const answers = await this.prompt([
      selectComponentTypePrompt,
      nameOfComponent,
      nameOfQuery
    ]);
    this.log('Type: ' + answers.type);
    this.props = answers;
  }
}

export = ReactGenerator;
