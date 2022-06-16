exports.up = function (knex) {
  return knex.schema.createTable("image_items", (table) => {
    table.uuid("item_id").defaultTo(knex.raw("uuid_generate_v4()")).primary();
    table.uuid("image_id").references("images.image_id").onDelete("CASCADE");
    table.uuid("user_id").references("users.user_id").onDelete("CASCADE");
    table.uuid("setup_id").references("setups.setup_id").onDelete("CASCADE");
    table.specificType("coords_list", "integer ARRAY");
    table.string("item_name");
    table.string("item_url");
    table.integer("number_of_clicks").defaultTo(0);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("image_items");
};
