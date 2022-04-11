const Users = require("../users/users-model.js");

const checkUsernameExists = async (req, res, next) => {
  try {
    const { username } = req.body;
    const [user] = await Users.findBy({ username });

    if (!user) {
      next({ status: 402, message: "Invalid credentials" });
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

const checkUsernameUnique = async (req, res, next) => {
  try {
    const { username } = req.body;
    const [user] = await Users.findBy({ username });

    if (user) {
      return next({ status: 401, message: "Username taken" });
    }
    req.user();
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { checkUsernameExists, checkUsernameUnique };
