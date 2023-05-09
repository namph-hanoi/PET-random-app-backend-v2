import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import { SequelizeTypescriptMigration } from "sequelize-typescript-migration-lts"
import {
  dbName,
  dbUser,
  dbPassword,
  dbHost,
  dbType
} from './envVar';
import User from '@/components/User/user.model';

export const connectDB = async () => {
  if (process.env.NODE_ENV === 'TEST') {
    return new Sequelize('sqlite::memory:');
  }

  const sequelize = new Sequelize({
    username: dbUser,
    password: dbPassword,
    database: dbName,
    host: dbHost,
    dialect: dbType,
    models: [User]
  } as SequelizeOptions);

  // Todo: turn off on production deployment
  try {
    const result = await SequelizeTypescriptMigration.makeMigration(sequelize, {
      outDir: `${process.cwd()}/db/migrations`,
      migrationName: "init",
      useSnakeCase: false,
    });
    console.log(result);
  } catch (e) {
    console.error(e);
  }
  return sequelize;
}

