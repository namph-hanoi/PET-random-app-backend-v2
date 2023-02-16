## Notice:
- 'config' folder at cwd is for the npm config lib
- Main env variables file in the config, the .env is for migration cli
- The migration file will be auto-gen when adding new model to the sequelize.connection


## Done:
- Handle error globally
- Debugger configuration
- Migration configuration work

## To do:
- Setup tests
- Rename the nested config folder which makes tsc confused while compiling.
- Add the following into the dockerignore when run in the docker: .vscode, .git,node_modules...
- Copy the eslint, prettierrc ... from a NestJS project
- Change all console into winston

## WIP:
- Write authentication services
