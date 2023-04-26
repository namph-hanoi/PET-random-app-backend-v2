/**
 * Component Generator
 */

import { Actions, PlopGeneratorConfig } from 'node-plop';
import inquirer from 'inquirer';

import { pathExists } from '../utils';
import { baseGeneratorPath, sequelizeConfigPath } from '../paths';


// inquirer.registerPrompt('directory', require('inquirer-directory'));

export const enum ComponentProptNames {
  componentName = 'componentName',
  tableName = 'tableName',

}

type Answers = { [P in ComponentProptNames]: string };

export const componentGenerator: PlopGeneratorConfig = {
  description: 'Add a component',
  prompts: [
    {
      name: 'componentName',
      type: 'input',
      message: 'Name of the component ?',
    } as any,
    {
      name: 'tableName',
      type: 'input',
      message: 'Name of the SQL table ?',
    } as any,
    {
      name: 'apiBlueprint',
      type: 'input',
      message: 'Base URL path of the controller ?',
    } as any,
  ],
  actions: data => {
    const answers = data as Answers;

    const componentPath = `${baseGeneratorPath}/{{properCase ${ComponentProptNames.componentName}}}`;
    const actualComponentPath = `${baseGeneratorPath}/${answers.componentName}`;

    if (pathExists(actualComponentPath)) {
      throw new Error(`Component '${answers.componentName}' already exists`);
    }
    const actions: Actions = [
      {
        type: 'add',
        path: `${componentPath}/{{ decapitalize componentName}}.controller.ts`,
        templateFile: './components/controller.ts.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: `${componentPath}/{{ decapitalize componentName}}.service.ts`,
        templateFile: './components/service.ts.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: `${componentPath}/{{ decapitalize componentName}}.repository.ts`,
        templateFile: './components/repository.ts.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: `${componentPath}/{{ decapitalize componentName}}.model.ts`,
        templateFile: './components/model.ts.hbs',
        abortOnFail: true,
      },


      {
        type: 'append',
        path: sequelizeConfigPath,
        template: "import {{ capitalize tableName }} from '@/components/{{ capitalize componentName }}/{{ decapitalize componentName }}.model';",
        pattern: /import.*;(?=\n\n)/,
        separator: '\n',
        abortOnFail: true,
      },
      {
        type: 'append',
        path: sequelizeConfigPath,
        template: '{{ capitalize tableName }}',
        pattern: /(?=\]\n.*SequelizeOptions)/,
        separator: ', ',
        abortOnFail: true,
      },
    ];
    // todo: gencode for DTO, SQL columns
    return actions;
  },
};
