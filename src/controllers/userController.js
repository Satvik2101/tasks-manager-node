const User = require("../models/user");

async function getUserImage(req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (!user || !user.avatar) {
      return res.status(404).send();
    }
    res.set("Content-Type", "image/png");
    res.send(user.avatar);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function uploadImage(req, res) {
  try {
    req.user.avatar = req.file.buffer;
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(400).send(e.message);
  }
}

async function deleteImage(req, res) {
  try {
    req.user.avatar = undefined;
    await req.user.save();
    res.send();
  } catch (error) {
    req.status(500).send(error.message);
  }
}
async function uploadImageErrorHandler(err, req, res, next) {
  if (err.code === "LIMIT_FILE_SIZE") {
    res.status(400).send({ error: "File too big" });
  } else {
    res.status(400).send({ error: "Invalid file" });
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

async function loginUser(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send(e.message);
  }
}

async function updateUser(req, res) {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    updates.forEach((update) => {
      req.user[update] = req.body[update];
    });
    await req.user.save();
    res.send(req.user);
  } catch (e) {
    res.status(500).send(e.message);
  }
}
async function logoutUser(req, res) {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send("Logged out");
  } catch (error) {
    res.status(500).send(error);
  }
}

async function logoutAllUsers(req, res) {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send("Logged out from all sessions");
  } catch (error) {
    res.status(500).send(error);
  }
}

async function deleteUser(req, res) {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (e) {
    res.status(500).send(e.message);
  }
}

module.exports = {
  addUser,
  updateUser,
  deleteUser,
  loginUser,
  logoutUser,
  logoutAllUsers,
  uploadImage,
  uploadImageErrorHandler,
  deleteImage,
  getUserImage,
};
