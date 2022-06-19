const knex = require("knex");

module.exports = knex({
  client: "postgres",
  connection: {
    host: "db",
    user: "docker",
    password: "123456",
    database: "share_station",
  },
});
