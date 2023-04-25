process.env['NODE_CONFIG_DIR'] = process.cwd() + '/config';

import 'module-alias/register';
import 'dotenv/config';
import 'reflect-metadata';
import App from '@/app';

export const app = new App([]);
const server = app.listen();

export default server;
