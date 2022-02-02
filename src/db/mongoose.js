const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_DB_URL);

// const tasks = [
//   new Task({
//     description: "Clean the house",
//     completed: true,
//   }),
//   new Task({
//     description: "Walk the dog",
//     completed: false,
//   }),
//   new Task({
//     description: "Make dinner",
//     completed: true,
//   }),
//   new Task({
//     description: "Clean the car",
//     completed: false,
//   }),
//   new Task({
//     description: "Clean the kitchen",
//     completed: false,
//   }),
//   new Task({
//     description: "Keep the books on the bookshelf",
//     completed: true,
//   }),
//   new Task({
//     description: "Buy groceries",
//     completed: false,
//   }),
// ];

// tasks.forEach((task) => {
//   task
//     .save()
//     .then((result) => {
//       console.log(result);
//     })
//     .catch((err) => {
//       console.log("Error: ", err);
//     });
// });
