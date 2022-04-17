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

async function findByUserid(user_id) {
  const rows = await db("users as u")
    .join("budgets as b", "b.owner_id", "u.user_id")
    .join("accounts as acc", "acc.owner_id", "u.user_id")
    .join(
      "spending_categories as sc",
      "sc.spending_category_id",
      "b.spending_category_id"
    )
    // doesnt work unless leftjoined. returns a 1 otherwise... ALSO maybe this needs to be a seperate database call. including this if a user is not in any joint accounts returns a 1...
    .leftJoin("user_joint_accounts as uja", "uja.user_id", "u.user_id")
    .join("transactions as t", "t.owner_id", "u.user_id")
    .select(
      "u.user_id",
      "u.username",
      "u.email",
      "u.name",
      "b.budget_id",
      "b.budget_name",
      "acc.account_id",
      "acc.account_name",
      "sc.spending_category_id",
      "sc.spending_category",
      "t.transaction_id",
      "t.transaction_type",
      "t.amount",
      "t.account_id",
      "t.budget_id"
    )
    .where("u.user_id", user_id);

  //need to seperate out the transactions... use another function..?

  let result = {
    user_id: rows[0].user_id,
    username: rows[0].username,
    email: rows[0].email,
    name: rows[0].name,
    budgets: [],
    accounts: [],
    transactions: [],
  };

  let transactions = await getUserTransactions(user_id);
  let budgets = await getUserBudgets(user_id);
  let accounts = await getUserAccounts(user_id);

  transactions.forEach((element) => {
    result.transactions.push({});
  });

  return rows;
}

async function getUserTransactions(user_id) {
  const rows = db("transactions as t")
    .join("accounts as acc", "acc.account_id", "t.account_id")
    .leftJoin("budgets as b", "b.budget_id", "t.budget_id")
    .where("t.owner_id", user_id);

  return rows;
}

async function getUserBudgets(user_id) {
  const rows = db("budgets as b")
    .join(
      "spending_categories as sc",
      "sc.spending_category_id",
      "b.spending_category_id"
    )
    .where("b.owner_id", user_id);

  return rows;
}

async function getUserAccounts(user_id) {
  const rows = db("accounts as acc")
    .join("user_joint_accounts as uja", "uja.account_id", "acc.account_id")
    .where("acc.owner_id", user_id);

  return rows;
}

async function findById(user_id) {
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
  findByUserid,
  findById,
  updateUser,
  deleteUser,
  getUserTransactions,
  getUserBudgets,
  getUserAccounts,
};
