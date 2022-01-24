const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middleware/auth");

router.get("/", userController.getUsers);
router.get("/me", auth, (req, res) => {
  res.send(req.user);
});
router.get("/:id", userController.getSingleUser);
router.post("/login", userController.loginUser);
router.post("/", userController.addUser);
router.patch("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
