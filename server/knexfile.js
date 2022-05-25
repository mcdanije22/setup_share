// Update with your config settings.

module.exports = {
  development: {
    client: "postgresql",
    connection:
      "postgres://root:password@postgresql_database:5432/share_station",
  },

  staging: {
    client: "postgresql",
    connection:
      "postgres://root:password@postgresql_database:5432/share_station",
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
    connection:
      "postgres://root:password@postgresql_database:5432/share_station",
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
