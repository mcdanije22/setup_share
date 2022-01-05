exports.up = function (knex) {
  const date = knex.fn.now();

  return knex.schema.createTable("setups", (table) => {
    table.uuid("setup_id").defaultTo(knex.raw("uuid_generate_v4()")).primary();
    table.uuid("user_id").references("users.user_id").onDelete("CASCADE");
    table.string("setup_title");
    table.string("setup_description");
    table.string("setup_type");
    table.dateTime("setup_created_date").defaultTo(date);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("setups");
};