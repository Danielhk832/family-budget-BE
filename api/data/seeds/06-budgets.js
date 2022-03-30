exports.seed = function (knex, Promise) {
  return knex("budgets").insert([
    {
      amount: 2000,
      owner_id: 1,
      account_id: 1,
      spending_category_id: 1,
    },
    {
      amount: 1000,
      owner_id: 1,
      account_id: 2,
      spending_category_id: 5,
    },
    {
      amount: 150,
      owner_id: 1,
      account_id: 3,
      spending_category_id: 6,
    },
  ]);
};
