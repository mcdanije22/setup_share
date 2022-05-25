const db = require("knex")({
  client: "pg",
  version: "7.2",
  connection: {
    host: "postgresql_database",
    user: "root",
    password: "password",
    database: "share_station",
  },
});
export default db;
