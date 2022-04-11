const db = require("../data/db-config.js");

function getAllUsers() {
  return db("users as u").select(
    "u.user_id",
    "u.username",
    "u.password",
    "u.email"
  );
}

async function insertUser(user) {
  // WITH POSTGRES WE CAN PASS A "RETURNING ARRAY" AS 2ND ARGUMENT TO knex.insert/update
  // AND OBTAIN WHATEVER COLUMNS WE NEED FROM THE NEWLY CREATED/UPDATED RECORD
  // UNLIKE SQLITE WHICH FORCES US DO DO A 2ND DB CALL
  const [newUserObject] = await db("users").insert(
    {
      username: user.username,
      email: user.email,
      password: user.password,
      name: user.name,
    },
    ["username", "password", "email"]
  );
  return newUserObject; // { user_id: 7, username: 'foo', password: 'xxxxxxx' }
}

function findBy(filter) {
  return db("users as u")
    .select("u.user_id", "u.username", "u.password", "r.role_name")
    .where(filter);
}

function findById(user_id) {
  return db("users as u")
    .select("u.user_id", "u.username", "u.email", "u.name")
    .where("u.user_id", user_id)
    .first();
}

async function updateUser(user_id, userDetails) {
  await db("users").update(userDetails).where("user_id", user_id);
  return findById(user_id);
}

async function deleteUser(user_id) {
  const deletedUser = await db("users").where("user_id", user_id).del();
  return deletedUser;
}

module.exports = {
  getAllUsers,
  insertUser,
  findBy,
  findById,
  updateUser,
  deleteUser,
  userPunchCard,
};
