exports.up = function (knex) {
  const date = knex.fn.now();

  return knex.schema.createTable("rooms_table", (table) => {
    table.uuid("roomID").defaultTo(knex.raw("uuid_generate_v4()")).primary();
    table
      .foreign("userID")
      .references("users_table.userID")
      .deferrable("deferred");
    table.string("room_title");
    table.string("description");
    table.specificType("room_tags", "text ARRAY");
    table.dateTime("room_created_date").defaultTo(date);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("rooms_table");
};
