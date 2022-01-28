const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const auth = require("../middleware/auth");

router.get("/", auth, taskController.getTasks);
router.get("/:id", auth, taskController.getSingleTask);
router.post("/", auth, taskController.addTask);
router.post("/multiple", auth, taskController.addMultipleTasks);
router.patch("/:id", auth, taskController.updateTask);
router.delete("/:id", auth, taskController.deleteTask);

module.exports = router;
