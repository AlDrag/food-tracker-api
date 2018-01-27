
exports.up = function(knex, Promise) {
    return knex.schema.createTable("food", table => {
        table.increments();
        table.string("barcode");
        table.string("name").notNullable().unique();
      });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable("food");
};
