const db = require("knex")({
  client: "pg",
  version: "7.2",
  connection: {
    host: "159.89.225.102",
    user: "root",
    password: "password",
    database: "share_station",
  },
});
export default db;
