import config from 'config';

/**
 * Database variables
 * 
 */
// todo: remove all config.get
export const dbHost = process.env.DB_HOST || config.get('db.host');
export const dbPort = process.env.DB_PORT || config.get('db.port');
export const dbName = process.env.DB_NAME || config.get('db.database');
export const dbUser = process.env.DB_USER || config.get('db.username');
export const dbPassword = process.env.DB_PASSWORD || config.get('db.password');
export const dbType = process.env.DB_TYPE || config.get('db.type');
export const nodeEnv = process.env.NODE_ENV || 'development';

/**
 * App variables
 */
export const appPort = process.env.APP_PORT || config.get('server.port');


export default {
    dbName,
    dbUser,
    dbPassword,
    dbType,
    dbHost,
    dbPort,
}