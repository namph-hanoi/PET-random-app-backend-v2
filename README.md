## Notice:
- 'config' folder at cwd is for the npm config lib
- Main env variables file in the config, the .env is for migration cli
- The migration file will be auto-gen when adding new model to the sequelize.connection
- ❗️ REMEMBER to try to migrate down to check if the migration functions work well both ways
- ❗️ Auto-gen migration files are NOT always correct, use the files which already commited in the git.

## Done:
- Handle error globally
- Debugger configuration
- Migration configuration work
- Docker-compose setup

## To do:
- Setup the entrypoint and the CMD for the docker container
- Setup tests
- Rename the nested config folder which makes tsc confused while compiling.

- Copy the eslint, prettierrc ... from a NestJS project
- Change all console into winston

## WIP:
- Write authentication services
