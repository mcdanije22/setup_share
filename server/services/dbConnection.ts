const db = require("knex")({
  client: "pg",
  version: "7.2",
  connection: {
    host: "127.0.0.1",
    // user: "your_database_user",
    // password: "your_database_password",
    database: "share_station",
  },
});
export default db;
