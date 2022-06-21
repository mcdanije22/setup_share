const path = require("path");

require("dotenv").config({
  path: path.resolve(__dirname, `..`, `.env.${process.env.NODE_ENV}`),
});

module.exports = {
  development: {
    client: "postgresql",
    connection: {
      database: "share_station",
    },
    migrations: {
      tableName: "knex_migrations",
    },
    seeds: {
      directory: "./seeds",
    },
  },

  production: {
    client: "postgres",
    connection: {
      host: process.env.POSTGRES_HOST,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
    },
    migrations: {
      tableName: "knex_migrations",
    },
    seeds: {
      directory: "./seeds",
    },
  },
};
