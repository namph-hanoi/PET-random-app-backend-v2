'use strict';

const Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * changeColumn "email" on table "users"
 * changeColumn "userName" on table "users"
 *
 **/

const info = {
    "revision": 2,
    "name": "init",
    "created": "2023-02-16T11:24:28.383Z",
    "comment": ""
};

const migrationCommands = [

    {
        fn: "createTable",
        params: [
            "SequelizeMigrationsMeta",
            {
                "revision": {
                    "primaryKey": true,
                    "type": Sequelize.INTEGER
                },
                "name": {
                    "allowNull": false,
                    "type": Sequelize.STRING
                },
                "state": {
                    "allowNull": false,
                    "type": Sequelize.JSON
                },
            },
            {}
        ]
    },
    {
        fn: "bulkDelete",
        params: [
            "SequelizeMigrationsMeta",
            [{
                revision: info.revision
            }],
            {}
        ]
    },
    {
        fn: "bulkInsert",
        params: [
            "SequelizeMigrationsMeta",
            [{
                revision: info.revision,
                name: info.name,
                state: '{"revision":2,"tables":{"users":{"tableName":"users","schema":{"id":{"seqType":"Sequelize.INTEGER","allowNull":false,"primaryKey":true,"autoIncrement":true},"userName":{"seqType":"Sequelize.STRING","unique":true},"email":{"seqType":"Sequelize.STRING","unique":true},"password":{"seqType":"Sequelize.STRING"},"creationDate":{"seqType":"Sequelize.DATE","allowNull":false},"updatedOn":{"seqType":"Sequelize.DATE","allowNull":false},"deletionDate":{"seqType":"Sequelize.DATE"}},"indexes":{}}}}'
            }],
            {}
        ]
    },



    {
        fn: "changeColumn",
        params: [
            "users",
            "email",
            {
                "unique": true,
                "type": Sequelize.STRING
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "users",
            "userName",
            {
                "unique": true,
                "type": Sequelize.STRING
            }
        ]
    }
];

const rollbackCommands = [

    {
        fn: "bulkDelete",
        params: [
            "SequelizeMigrationsMeta",
            [{
                revision: info.revision,
            }],
            {}
        ]
    },



    {
        fn: "changeColumn",
        params: [
            "users",
            "email",
            {
                "type": Sequelize.STRING
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "users",
            "userName",
            {
                "type": Sequelize.STRING
            }
        ]
    }
];

module.exports = {
  pos: 0,
  up: function(queryInterface, Sequelize) {
    let index = this.pos;

    return new Promise(function(resolve, reject) {
      function next() {
        if (index < migrationCommands.length) {
          let command = migrationCommands[index];
          console.log("[#"+index+"] execute: " + command.fn);
          index++;
          queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
        } else resolve();
      }

      next();
    });
  },
  down: function(queryInterface, Sequelize) {
    let index = this.pos;

    return new Promise(function(resolve, reject) {
      function next() {
        if (index < rollbackCommands.length) {
          let command = rollbackCommands[index];
          console.log("[#"+index+"] execute: " + command.fn);
          index++;
          queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
        }
        else resolve();
      }

      next();
    });
  },
  info
};
