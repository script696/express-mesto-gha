const router = require("express").Router();
const {
  getUser,
  getUsers,
  createUser,
  updateMe,
  updateAvatar,
} = require("../controllers/users");

router.get("/:id", getUser);
router.get("/", getUsers);
router.post("/", createUser);
router.patch("/users/me", updateMe);
router.patch("/users/me/avatar", updateAvatar);

module.exports = router;
