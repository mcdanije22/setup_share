exports.up = function (knex) {
  return knex.schema.createTable("images", (table) => {
    table.uuid("imageID").defaultTo(knex.raw("uuid_generate_v4()")).primary();
    table.uuid("roomID").references("rooms.roomID").onDelete("CASCADE");
    table.uuid("userID").references("users.userID").onDelete("CASCADE");
    table.string("image_url");
    table.string("description");
    table.integer("imgage_position");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("images");
};
