const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../secrets/index");

const tokenBuilder = (user) => {
  //used to auth user/instructor when registering for class
  const payload = {
    subject: user.user_id,
    user_id: user.user_id,
    name: user.name,
    role_name: user.role_name,
    username: user.username,
    email: user.email,
  };

  const options = {
    expiresIn: "1d",
  };

  return jwt.sign(payload, JWT_SECRET, options);
};

module.exports = {
  tokenBuilder,
};
