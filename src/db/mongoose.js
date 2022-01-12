const mongoose = require("mongoose");
const validator = require("validator");

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api");

const User = mongoose.model("User", {
  name: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    required: true,
    validate(value) {
      if (value < 0) {
        throw new Error("Age must be a positive number");
      }
    },
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error('Password cannot contain "password"');
      }
    },
  },
});

const Task = mongoose.model("Task", {
  description: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const tasks = [
  new Task({
    description: "Clean the house",
    completed: true,
  }),
  new Task({
    description: "Walk the dog",
    completed: false,
  }),
  new Task({
    description: "Make dinner",
    completed: true,
  }),
  new Task({
    description: "Clean the car",
    completed: false,
  }),
  new Task({
    description: "Clean the kitchen",
    completed: false,
  }),
  new Task({
    description: "Keep the books on the bookshelf",
    completed: true,
  }),
  new Task({
    description: "Buy groceries",
    completed: false,
  }),
];

tasks.forEach((task) => {
  task
    .save()
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log("Error: ", err);
    });
});
