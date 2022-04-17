const router = require("express").Router();
const Users = require("./users-model");

router.get("/test", async (req, res, next) => {
  try {
    const user = await Users.findByUserid(1);
    console.log(user);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});
router.get("/test1", async (req, res, next) => {
  try {
    const user = await Users.getUserAccounts(1);
    console.log(user);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
