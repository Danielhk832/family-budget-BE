exports.seed = function (knex, Promise) {
  return knex("user_joint_accounts").insert([
    {
      user_id: 2,
      account_id: 1,
    },
    {
      user_id: 3,
      account_id: 2,
    },
    {
      user_id: 2,
      account_id: 3,
    },
    {
      user_id: 3,
      account_id: 1,
    },
    {
      user_id: 2,
      account_id: 2,
    },
    {
      user_id: 3,
      account_id: 3,
    },
  ]);
};
