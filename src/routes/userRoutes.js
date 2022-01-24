const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middleware/auth");

router.get("/me", auth, (req, res) => {
  res.send(req.user);
});
router.post("/logout", auth, userController.logoutUser);
router.post("/logoutAll", auth, userController.logoutAllUsers);
router.post("/login", userController.loginUser);
router.post("/", userController.addUser);
router.patch("/me", auth, userController.updateUser);
router.delete("/me", auth, userController.deleteUser);

module.exports = router;
