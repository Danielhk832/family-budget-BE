exports.up = async (knex) => {
  await knex.schema.createTable("users", (tbl) => {
    tbl.increments("user_id");
    tbl.string("username", 200).notNullable();
    tbl.string("password", 200).notNullable();
    tbl.string("email", 200).notNullable();

  })
  .createTable("accounts", (tbl) => {
    tbl.increments("account_id");
    tbl.integer("balance").notNullable();
    tbl.string("account_type", 200).notNullable();
  })
  .createTable("user_joint_accounts", (tbl) => {
    tbl.increments("user_joint_account_id")
    tbl.integer("user_id").notNullable()
    tbl.integer("account_id").notNullable()
  })
  .createTable())
  .createTable("transactions", (tbl) => {
    tbl.increments("transaction_id");
    tbl.string("transaction_type", 200).notNullable();
    tbl.integer("amount").notNullable();
    tbl.integer("account_id").notNullable();
    tbl.integer("budget_id").notNullable();
  })
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists("users");
};
