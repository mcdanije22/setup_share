exports.up = function (knex) {
  const date = knex.fn.now();

  return knex.schema.createTable("users", (table) => {
    table.uuid("userID").defaultTo(knex.raw("uuid_generate_v4()")).primary();
    table.string("username");
    table.string("email");
    table.string("password");
    table.string("first_name");
    table.string("last_name");
    table.dateTime("user_created_date").defaultTo(date);
    table.dateTime("subscription_exp_date").defaultTo(date);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
