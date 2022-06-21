import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(__dirname, `..`, `.env.${process.env.NODE_ENV}`),
});

const db = require("knex")({
  client: "pg",
  version: "7.2",
  connection: {
    host: "db",
    user:
      process.env.NODE_ENV === "development" ? "" : process.env.POSTGRES_USER,
    password:
      process.env.NODE_ENV === "development"
        ? ""
        : process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  },
});
export default db;
