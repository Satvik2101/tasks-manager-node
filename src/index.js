const express = require("express");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");

require("./db/mongoose");
const app = express();
app.use(express.json());
app.use("/users", userRoutes);
app.use("/tasks", taskRoutes);
app.listen(3000);
