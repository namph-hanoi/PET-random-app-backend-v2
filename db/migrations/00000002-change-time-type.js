'use strict';

const Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * changeColumn "deletedAt" on table "users" from BigInt to number
 * changeColumn "updatedAt" on table "users" from BigInt to number
 * changeColumn "createdAt" on table "users" from BigInt to number
 *
 **/

const info = {
    "revision": 2,
    "name": "init",
    "created": "2023-02-24T15:11:36.177Z",
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
                state: '{"revision":2,"tables":{"users":{"tableName":"users","schema":{"id":{"seqType":"Sequelize.INTEGER","allowNull":false,"primaryKey":true,"autoIncrement":true},"userName":{"seqType":"Sequelize.STRING","unique":true},"email":{"seqType":"Sequelize.STRING","unique":true},"password":{"seqType":"Sequelize.STRING"},"createdAt":{"seqType":"Sequelize.INTEGER"},"updatedAt":{"seqType":"Sequelize.INTEGER"},"deletedAt":{"seqType":"Sequelize.INTEGER"}},"indexes":{}}}}'
            }],
            {}
        ]
    },



    {
        fn: "changeColumn",
        params: [
            "users",
            "deletedAt",
            {
                "type": Sequelize.INTEGER
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "users",
            "updatedAt",
            {
                "type": Sequelize.INTEGER
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "users",
            "createdAt",
            {
                "type": Sequelize.INTEGER
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
            "deletedAt",
            {
                "type": Sequelize.BIGINT
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "users",
            "updatedAt",
            {
                "type": Sequelize.BIGINT
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "users",
            "createdAt",
            {
                "type": Sequelize.BIGINT
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
