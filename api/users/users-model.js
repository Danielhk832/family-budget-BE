const db = require("../data/db-config.js");

function getAllUsers() {
  return db("users as u")
    .join("roles as r", "u.role_id", "r.role_id")
    .select("u.user_id", "u.username", "u.password", "u.email", "r.role_name");
}

async function insertUser(user) {
  // WITH POSTGRES WE CAN PASS A "RETURNING ARRAY" AS 2ND ARGUMENT TO knex.insert/update
  // AND OBTAIN WHATEVER COLUMNS WE NEED FROM THE NEWLY CREATED/UPDATED RECORD
  // UNLIKE SQLITE WHICH FORCES US DO DO A 2ND DB CALL
  const [newUserObject] = await db("users").insert(
    {
      role_id: user.role_id,
      username: user.username,
      email: user.email,
      password: user.password,
      name: user.name,
    },
    ["username", "password", "email", "role_id"]
  );
  return newUserObject; // { user_id: 7, username: 'foo', password: 'xxxxxxx' }
}

function findBy(filter) {
  return db("users as u")
    .join("roles as r", "u.role_id", "r.role_id")
    .select("u.user_id", "u.username", "u.password", "r.role_name")
    .where(filter);
}

function findById(user_id) {
  return db("users as u")
    .join("roles as r", "u.role_id", "=", "r.role_id")
    .select("u.user_id", "u.username", "u.email", "r.role_name", "u.name")
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

// SELECT SUM()
// FROM products
// WHERE supplierID = 1

// SELECT COUNT(cs.user_id) as times_registered , ct.class_type_name FROM class_signups as cs
// JOIN classes as cl on cl.class_id = cs.class_id
// JOIN class_types as ct on cl.class_type_id = ct.class_type_id
// WHERE cs.user_id = 3
// GROUP BY ct.class_type_name

async function userPunchCard(user_id) {
  return await db("class_signups as cs")
    .count("cs.user_id as times_registered", "ct.class_type_name")
    .join("classes as cl", "cl.class_id", "cs.class_id")
    .join("class_types as ct", "cl.class_type_id", "ct.class_type_id")
    .groupBy("ct.class_type_name")
    .where("user_id", user_id);
  // .andWhere("class_id", class_id)
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
