exports.seed = function (knex, Promise) {
  return knex("spending_categories").insert([
    //id 1
    {
      spending_category: "food",
    },
    //id 2
    {
      spending_category: "medical",
    },
    //id 3
    {
      spending_category: "utilties",
    },
    //id 4
    {
      spending_category: "transportation",
    },
    //id 5
    {
      spending_category: "entertainment",
    },
    //id 6
    {
      spending_category: "clothing",
    },
    //id 7
    {
      spending_category: "other",
    },
  ]);
};
