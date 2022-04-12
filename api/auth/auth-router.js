const router = require("express").Router();
const bcrypt = require("bcryptjs");
const { JWT_SECRET } = require("../secrets");

const Users = require("../users/users-model");
const { tokenBuilder } = require("./token-builder");
const {
  checkUsernameExists,
  checkUsernameUnique,
} = require("./auth-middleware");

router.post("/register", checkUsernameUnique, async (req, res, next) => {
  try {
    let user = req.body;

    const rounds = process.env.BCRYPT_ROUNDS || 8;
    const hash = bcrypt.hashSync(user.password, rounds);

    user.password = hash;

    const newUser = await Users.insertUser(user);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

router.post("/login", checkUsernameExists, (req, res, next) => {
  if (bcrypt.compareSync(req.body.password, req.user.password)) {
    const token = tokenBuilder(req.user);
    res.status(200).json({
      message: `${req.user.username} is logged in`,
      token,
    });
  } else {
    next({ status: 401, message: "Invalid credentials" });
  }
});

module.exports = router;
