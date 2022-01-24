const Task = require("../models/task");

async function getTasks(req, res) {
  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch (e) {
    res.status(500).send(e);
  }
}

async function getSingleTask(req, res) {
  const _id = req.params.id;
  if (!_id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).send("Invalid ID");
  }

  try {
    const task = await Task.findById(_id);
    if (!task) {
      return res.status(404).send("Task not found");
    }
    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
}

async function addTask(req, res) {
  const task = new Task(req.body);

  try {
    await task.save();
    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
}

async function addMultipleTasks(req, res) {
  const tasks = req.body;
  try {
    const newTasks = await Task.insertMany(tasks);
    res.send(newTasks);
  } catch (e) {
    res.status(400).send(e);
  }
}

async function updateTask(req, res) {
  const _id = req.params.id;
  if (!_id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).send("Invalid ID");
  }

  try {
    const task = await Task.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res.status(404).send("Task not found");
    }
    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
}

async function deleteTask(req, res) {
  const _id = req.params.id;
  if (!_id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).send("Invalid ID");
  }

  try {
    const task = await Task.findByIdAndDelete(_id);
    if (!task) {
      return res.status(404).send("Task not found");
    }
    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
}
module.exports = {
  getTasks,
  getSingleTask,
  updateTask,
  deleteTask,
  addTask,
  addMultipleTasks,
};
