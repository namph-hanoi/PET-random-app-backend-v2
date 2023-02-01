import config from 'config';

/**
 * Database variables
 */
export const dbHost = process.env.DB_HOST || config.get('db.host');
export const dbPort = process.env.DB_PORT || config.get('db.port');
export const dbName = process.env.DB_NAME || config.get('db.database');
export const dbUser = process.env.DB_USER || config.get('db.username');
export const dbPassword = process.env.DB_PASSWORD || config.get('db.password');
export const dbType = process.env.DB_TYPE || config.get('db.type');

/**
 * App variables
 */
export const appPort = process.env.DB_TYPE || config.get('server.port');


export default {
    dbName,
    dbUser,
    dbPassword,
    dbType,
    dbHost,
    dbPort,
}