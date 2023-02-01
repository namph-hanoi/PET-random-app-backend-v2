import { Sequelize } from "sequelize";
import {
  dbName,
  dbUser,
  dbPassword,
  dbHost,
  dbType
} from './envVar';

export const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: dbType,
  });
