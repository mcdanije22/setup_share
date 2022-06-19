// const path = require("path");

// require("dotenv").config({
//   path: path.resolve(__dirname, `..`, `.env.${process.env.NODE_ENV}`),
// });

// module.exports = {
//   development: {
//     client: "postgresql",
//     connection: {
//       database: "share_station",
//     },
//     migrations: {
//       tableName: "knex_migrations",
//     },
//     seeds: {
//       directory: "./seeds",
//     },
//   },

//   staging: {
//     client: "postgresql",
//     connection: process.env.DB_URL,
//     pool: {
//       min: 2,
//       max: 10,
//     },
//     migrations: {
//       tableName: "knex_migrations",
//     },
//   },

//   production: {
//     client: "postgres",
//     // connection: process.env.DB_URL,
//     // pool: {
//     //   min: 2,
//     //   max: 10,
//     // },
//     connection: {
//       host: "db",
//       user: "docker",
//       password: "123456",
//       database: "share_station",
//     },
//     migrations: {
//       tableName: "knex_migrations",
//     },
//     seeds: {
//       directory: "./seeds",
//     },
//   },
// };

const knex = require("knex");

module.exports = knex({
  client: "postgres",
  // connection: process.env.DB_URL,
  // pool: {
  //   min: 2,
  //   max: 10,
  // },
  connection: {
    host: "db",
    user: "docker",
    password: "123456",
    database: "share_station",
  },
  migrations: {
    tableName: "knex_migrations",
  },
  seeds: {
    directory: "./seeds",
  },
});
