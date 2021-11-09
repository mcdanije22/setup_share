exports.up = function (knex) {
  return knex.schema.createTable("image_items", (table) => {
    table.uuid("itemID").defaultTo(knex.raw("uuid_generate_v4()")).primary();
    table.uuid("imageID").references("images.imageID").onDelete("CASCADE");
    table.uuid("userID").references("users.userID").onDelete("CASCADE");
    table.uuid("roomID").references("rooms.roomID").onDelete("CASCADE");
    table.specificType("coords_list", "integer ARRAY");
    table.string("item_name");
    table.string("item_url");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("image_items");
};
