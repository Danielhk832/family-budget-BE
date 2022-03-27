exports.seed = function (knex, Promise) {
  return knex("users").insert([
    //user_id 1
    {
      username: "Daniel One",
      email: "email1@email.com",
      password: "password",
      name: "Daniel1",
    },
    //user_id 2
    {
      username: "Daniel Two",
      email: "email2@email.com",
      password: "password",
      name: "Daniel2",
    },
    //user_id 3
    {
      username: "Daniel Three",
      email: "email3@email.com",
      password: "password",
      name: "Daniel3",
    },
  ]);
};
