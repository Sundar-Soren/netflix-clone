const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();
console.log(dotenv.config());

const authRoute = require("./router/auth");
const userRoute = require("./router/user");
const movieRoute = require("./router/movie");
const listRoute = require("./router/lists");

const DATABASE_URL = process.env.DATABASE;

app.use(express.json());

app.use("/api", authRoute);
app.use("/api", userRoute);
app.use("/api", movieRoute);
app.use("/api", listRoute);

mongoose
  .connect(DATABASE_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.listen("8000", () => {
  console.log(`Server is running at 8000`);
});
