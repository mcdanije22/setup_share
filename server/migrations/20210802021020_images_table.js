exports.up = function (knex) {
  return knex.schema.createTable("images", (table) => {
    table.uuid("image_id").defaultTo(knex.raw("uuid_generate_v4()")).primary();
    table.uuid("setup_id").references("setups.setup_id").onDelete("CASCADE");
    table.uuid("user_id").references("users.user_id").onDelete("CASCADE");
    table.string("image_url");
    table.string("image_position");
    table.integer("image_position_number");
    table.string("aws_key");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("images");
};
