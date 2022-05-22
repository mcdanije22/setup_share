// Update with your config settings.

module.exports = {
  development: {
    client: "postgresql",
    connection: {
      database: "share_station",
    },
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "share_station",
      user: "root",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  production: {
    client: "postgresql",
    connection: {
      database: "share_station",
      user: "root",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
