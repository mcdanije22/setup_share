const db = require("knex")({
  client: "pg",
  version: "7.2",
  connection: {
    host: "postgres://root:password@postgresql_database:5432/share_station",
    user: "root",
    password: "password",
    database: "share_station",
  },
});
export default db;
