exports.up = function (knex) {
  const date = knex.fn.now();

  return knex.schema.createTable("rooms", (table) => {
    table.uuid("roomID").defaultTo(knex.raw("uuid_generate_v4()")).primary();
    table.uuid("userID").references("users.userID").onDelete("CASCADE");
    table.string("room_title");
    table.string("room_description");
    table.string("room_type");
    table.dateTime("room_created_date").defaultTo(date);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("rooms");
};
