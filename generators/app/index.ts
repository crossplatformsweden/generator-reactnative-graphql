import chalk from 'chalk';
import Generator from 'yeoman-generator';
import yosay from 'yosay';

export class ReactGenerator extends Generator {
  public extenstionType: String;

  constructor(args: string | string[], options: {}) {
    super(args, options);
  }

  protected initializing() {
    // Welcome
    this.log(yosay('Welcome to the ReactNative Graphql Component generator!'));
  }

  protected prompting() {
    const prompts = {
      type: 'list',
      name: 'type',
      message: 'What type of Component do you want to create?',
      choices: [
        {
          name: 'ReactNative Component with Query',
          value: 'comp-query'
        }
      ]
    };
    const res = this.prompt({});
  }
}
