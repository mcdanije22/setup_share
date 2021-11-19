exports.up = function (knex) {
  const date = knex.fn.now();

  return knex.schema.createTable("rooms", (table) => {
    table.uuid("roomID").defaultTo(knex.raw("uuid_generate_v4()")).primary();
    table.uuid("userID").references("users.userID").onDelete("CASCADE");
    table.string("setup_title");
    table.string("setup_description");
    table.string("setup_type");
    table.dateTime("setup_created_date").defaultTo(date);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("rooms");
};
