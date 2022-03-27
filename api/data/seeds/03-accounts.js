exports.seed = function (knex, Promise) {
  return knex("accounts").insert([
    {
      balance: "Daniel One",
      account_type: "Daniel1",
    },
    {
      balance: "Daniel Two",
      account_type: "Daniel2",
    },
    {
      balance: "Daniel Three",
      account_type: "Daniel3",
    },
  ]);
};
