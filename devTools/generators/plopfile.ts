import { NodePlopAPI } from 'node-plop';
import { componentGenerator } from './components';
import shell from 'shelljs';
interface PrettifyCustomActionData {
  path: string;
}

export default function plop(plop: NodePlopAPI) {
  plop.setGenerator('component', componentGenerator);

  plop.setHelper('capitalize', (text) => {
    const trimmedText = text.trim();
    return trimmedText.charAt(0).toUpperCase() + trimmedText.slice(1);
  });

  plop.setHelper('decapitalize', (text) => {
    const trimmedText = text.trim();
    return trimmedText.charAt(0).toLowerCase() + trimmedText.slice(1);
  });

  plop.setActionType('prettify', (answers, config) => {
    const data = config!.data as PrettifyCustomActionData;
    shell.exec(`yarn run prettify -- "${data.path}"`, { silent: true });
    return '';
  });
}
