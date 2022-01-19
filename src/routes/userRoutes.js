const express = require("express");
const router = express.Router();
const User = require("../models/user");
const userController = require("../controllers/userController");

router.get("/", userController.getUsers);
router.get("/:id", userController.getSingleUser);
router.post("/", userController.addUser);
router.patch("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;