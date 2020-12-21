let dboperations = require("./dboperations");

dboperations.getAllByName("PULPIT").then((result) => {
  console.log(result);
});
