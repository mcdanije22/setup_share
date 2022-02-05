exports.up = function (knex) {
  const date = knex.fn.now();

  return knex.schema.createTable("screen_type_constants", (table) => {
    table.integer("scren_type_id").primary();
    table.string("screen_type_name");
    table.integer("screen_width");
    table.integer("screen_height");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("screen_type_constants");
};
