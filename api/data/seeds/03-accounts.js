exports.seed = function (knex, Promise) {
  return knex("accounts").insert([
    {
      balance: 20000,
      account_type: "checking",
      owner_id: 1,
      account_name: "Account 1",
    },
    {
      balance: 10000,
      account_type: "cash",
      owner_id: 1,
      account_name: "Account 2",
    },
    {
      balance: 150,
      account_type: "savings",
      owner_id: 1,
      account_name: "Account 3",
    },
  ]);
};
