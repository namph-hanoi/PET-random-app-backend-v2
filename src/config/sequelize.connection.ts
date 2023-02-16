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
  const sequelize = new Sequelize({
    username: dbUser,
    password: dbPassword,
    database: dbName,
    host: dbHost,
    dialect: dbType,
    // models: [__dirname + '../components/**/**.model.ts'],
    models: [User]
  } as SequelizeOptions);
  try {
    const result = await SequelizeTypescriptMigration.makeMigration(sequelize, {
      outDir: `${process.cwd()}/db/migrations`,
      migrationName: "init",
      useSnakeCase: false,
    });
    console.log(result);
  } catch (e) {
    console.log(e);
  }
}

