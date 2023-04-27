
/**
 * Database variables
 * 
 */
export const dbHost = process.env.DB_HOST;
export const dbPort = process.env.DB_PORT;
export const dbName = process.env.DB_NAME;
export const dbUser = process.env.DB_USER;
export const dbPassword = process.env.DB_PASSWORD;
export const dbType = process.env.DB_TYPE;
export const nodeEnv = process.env.NODE_ENV || 'development';

/**
 * App variables
 */
export const appPort = process.env.APP_PORT;


export default {
    dbName,
    dbUser,
    dbPassword,
    dbType,
    dbHost,
    dbPort,
}