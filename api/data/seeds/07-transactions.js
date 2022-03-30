exports.seed = function (knex, Promise) {
  return knex("transactions").insert([
    {
      transaction_type: "credit",
      amount: 100,
      account_id: 1,
      budget_id: 1,
      owner_id: 1,
    },
    {
      transaction_type: "debit",
      amount: -150,
      account_id: 2,
      budget_id: 2,
      owner_id: 1,
    },
    {
      transaction_type: "debit",
      amount: -100,
      account_id: 3,
      budget_id: 3,
      owner_id: 1,
    },
  ]);
};
