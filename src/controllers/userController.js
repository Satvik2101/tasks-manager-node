const User = require("../models/user");

async function getUsers(req, res) {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    res.status(500).send(e);
  }
}

async function getSingleUser(req, res) {
  const _id = req.params.id;
  if (!_id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).send("Invalid ID");
  }

  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
}
async function addUser(req, res) {
  const user = new User(req.body);
  try {
    await user.save();
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
}

async function updateUser(req, res) {
  const _id = req.params.id;
  if (!_id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).send("Invalid ID");
  }

  try {
    const user = await User.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
}

async function deleteUser(req, res) {
  const _id = req.params.id;
  if (!_id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).send("Invalid ID");
  }

  try {
    const user = await User.findByIdAndDelete(_id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
}

module.exports = {
  getUsers,
  getSingleUser,
  addUser,
  updateUser,
  deleteUser,
};
