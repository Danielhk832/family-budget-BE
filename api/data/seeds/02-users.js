exports.seed = function (knex, Promise) {
  return knex("users").insert([
    {
      username: "Daniel One",
      email: "email1@email.com",
      password: "password",
      name: "Daniel1",
    },
    {
      username: "Daniel Two",
      email: "email2@email.com",
      password: "password",
      name: "Daniel2",
    },
    {
      username: "Daniel Three",
      email: "email3@email.com",
      password: "password",
      name: "Daniel3",
    },
  ]);
};
