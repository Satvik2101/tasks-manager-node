const bcrypt = require("bcrypt");

async function main() {
  const pass = "helloworld";
  const hashedPass = await bcrypt.hash(pass, 10);
  console.log(hashedPass);
  const isMatch = await bcrypt.compare(
    "helloworld",
    "$2b$10$2Yyt8xWGjEcmeah5dR"
  );
  console.log(isMatch);
}
main();
/*
{
  "description" : "Make dinner",
  "completed" : true
}


{
  "description" : "Keep the books on the bookshelf",
  "completed" : true
}


{
  "description" : "Clean the car",
  "completed" : false
}


{
  "description" : "Clean the kitchen",
  "completed" : false
}


{
  "description" : "Buy groceries",
  "completed" : false
}


{
  "description" : "Add task through postman",
  "completed" : false
}


{
  "description" : "Add another task through postman",
  "completed" : false
}


{
  "description" : "separate routes task",
  "completed" : false
}
*/
