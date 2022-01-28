const Task = require("../models/task");

async function getTasks(req, res) {
  try {
    await req.user.populate("tasks");
    res.send(req.user.tasks);
  } catch (e) {
    res.status(500).send(e.toString());
  }
}

async function getSingleTask(req, res) {
  const _id = req.params.id;
  if (!_id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).send("Invalid ID");
  }

  try {
    const task = await Task.findOne({ _id, owner: req.user._id });
    if (!task) {
      return res.status(404).send("Task not found");
    }
    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
}

async function addTask(req, res) {
  // const task = new Task(req.body);
  const task = new Task({
    ...req.body,
    owner: req.user._id,
  });
  try {
    await task.save();
    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
}

async function addMultipleTasks(req, res) {
  const tasksOg = req.body;
  const tasks = [];
  tasksOg.forEach((task) => {
    tasks.push({ ...task, owner: req.user._id });
  });
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
    const task = await Task.findOneAndUpdate(
      { _id, owner: req.user._id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
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
    const task = await Task.findByIdAndDelete({ _id, owner: req.user._id });
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
