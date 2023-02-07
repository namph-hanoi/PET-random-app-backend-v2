// Todo: move this file to the top config
require('dotenv').config()

const defaultConfig = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_TYPE,
  dialectOptions: {
    bigNumberStrings: true
  }
}

module.exports = {
  development: defaultConfig,
  test: defaultConfig,
  production: {
    ...defaultConfig,
    // dialectOptions: {
    //   bigNumberStrings: true,
    //   ssl: {
    //     ca: fs.readFileSync(__dirname + `/${dbType}-ca-main.crt`)
    //   }
    // }
  }
};
