exports.seed = function (knex, Promise) {
  return knex("budgets").insert([
    {
      amount: 2000,
      budget_name: "Daniel's budget 1",
      owner_id: 1,
      account_id: 1,
      spending_category_id: 1,
    },
    {
      amount: 1000,
      budget_name: "Daniel's budget 2",
      owner_id: 1,
      account_id: 2,
      spending_category_id: 5,
    },
    {
      amount: 150,
      budget_name: "Daniel's budget 3",
      owner_id: 1,
      account_id: 3,
      spending_category_id: 6,
    },
  ]);
};
