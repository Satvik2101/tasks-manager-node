const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const url = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

MongoClient.connect(url, { useNewUrlParser: true }, (error, client) => {
  if (error) {
    return console.log("Unable to connect to database!");
  }
  console.log("Connected to database!");

  const db = client.db(databaseName);

  //   db.collection("tasks").insertMany(
  //     [
  //       {
  //         description: "Clean the house",
  //         completed: true,
  //       },
  //       {
  //         description: "Walk the dog",
  //         completed: false,
  //       },
  //       {
  //         description: "Make dinner",
  //         completed: true,
  //       },
  //       {
  //         description: "Clean the car",
  //         completed: false,
  //       },
  //       {
  //         description: "Clean the kitchen",
  //         completed: false,
  //       },
  //       {
  //         description: "Keep the books on the bookshelf",
  //         completed: true,
  //       },
  //       {
  //         description: "Buy groceries",
  //         completed: false,
  //       },
  //     ],
  //     (error, result) => {
  //       if (error) {
  //         return console.log("Unable to insert documents!");
  //       }
  //       console.log(result);
  //     }
  //   );

  db.collection("tasks").updateMany(
    {
      description: /^Clean/,
    },
    [
      {
        $set: {
          description: {
            $concat: ["$description", " - cleaning task"],
          },
        },
      },
    ],
    (error, result) => {
      if (error) {
        console.log("Unable to update tasks!");
        return console.log(error);
      }
      console.log(result);
    }
  );
});
