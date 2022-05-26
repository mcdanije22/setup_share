require("dotenv").config();

const db = require("knex")({
  client: "pg",
  version: "7.2",
  connection: {
    host: process.env.DB_URL,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  },
});
export default db;
