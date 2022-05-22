const db = require("knex")({
  client: "pg",
  version: "7.2",
  connection: {
    host: "172.17.0.1:5432",
    user: "root",
    password: "password",
    database: "share_station",
  },
});
export default db;
