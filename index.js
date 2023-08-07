const express = require("express");
const mongoose = require("mongoose");
const Model = require("./Models/userModel");
var cors = require("cors");

const app = express();
const routes = require("./routes/routes");

app.use(cors());
app.use(express.json());
app.use("/api", routes);

app.listen(8080, () => {
  console.log(`Server Started at ${8080}`);
  const password = encodeURIComponent("Divyan@123");
  mongoose.connect(
    `mongodb+srv://divyanshusaroj:Vm3iXlRN8SDeEL8O@cluster0.pj7yexl.mongodb.net/passwordmanager`
  );
  const database = mongoose.connection;
  database.on("error", (error) => {
    console.log(error);
  });

  database.once("connected", () => {
    console.log("Database Connected");
  });
});
