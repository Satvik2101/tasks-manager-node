const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

router.get("/", taskController.getTasks);
router.get("/:id", taskController.getSingleTask);
router.post("/", taskController.addTask);
router.post("/multiple", taskController.addMultipleTasks);
router.patch("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);

module.exports = router;
