const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

router.get("/", taskController.getTasks);
router.get("/:id", taskController.getSingleTask);
router.post("/tasks", taskController.addTask);
router.patch("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);
module.exports = router;
