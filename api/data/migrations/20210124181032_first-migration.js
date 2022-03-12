// FOREIGN KEY TEMPLATE
// .integer("")
// .unsigned()
// .notNullable()
// .references("")
// .inTable("")
// .onDelete("CASCADE")
// .onUpdate("CASCADE");

exports.up = async (knex) => {
  await knex.schema
    .createTable("users", (tbl) => {
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
      tbl.increments("user_joint_account_id");
      tbl
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("user_id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      tbl
        .integer("account_id")
        .unsigned()
        .notNullable()
        .references("account_id")
        .inTable("accounts")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .createTable("spending_categories", (tbl) => {
      tbl.increments("spending_category_id");
      tbl.string("spending_category", 200).notNullable();
    })
    .createTable("budgets", (tbl) => {
      tbl.increments("budget_id");
      tbl.integer("user_id").notNullable();
      tbl.integer("account_id").notNullable();
      tbl.integer("balance").notNullable();
      tbl
        .integer("spending_category_id")
        .unsigned()
        .notNullable()
        .references("spending_category_id")
        .inTable("spending_categories")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .createTable("transactions", (tbl) => {
      tbl.increments("transaction_id");
      tbl.string("transaction_type", 200).notNullable();
      tbl.integer("amount").notNullable();
      tbl
        .integer("account_id")
        .unsigned()
        .notNullable()
        .references("account_id")
        .inTable("accounts")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      tbl
        .integer("budget_id")
        .unsigned()
        .notNullable()
        .references("budget_id")
        .inTable("budgets")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists("transactions");
  await knex.schema.dropTableIfExists("budgets");
  await knex.schema.dropTableIfExists("spending_categories");
  await knex.schema.dropTableIfExists("user_joint_accounts");
  await knex.schema.dropTableIfExists("accounts");
  await knex.schema.dropTableIfExists("users");
};
