exports.up = function (knex) {
  const date = knex.fn.now();

  return knex.schema.createTable("users", (table) => {
    table.uuid("user_id").defaultTo(knex.raw("uuid_generate_v4()")).primary();
    table.string("username").notNullable().unique();
    table.string("email").unique().notNullable();
    table.string("password").notNullable();
    table.string("first_name").notNullable();
    table.string("last_name").notNullable();
    table.dateTime("user_created_date").defaultTo(date);
    table.dateTime("subscription_exp_date").defaultTo(date);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
