exports.up = async (knex) => {
  await knex.schema.createTable("users", (tbl) => {
    tbl.increments("user_id");
    tbl.string("username", 200).notNullable();
    tbl.string("password", 200).notNullable();
    tbl.string("email", 200).notNullable();
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists("users");
};
