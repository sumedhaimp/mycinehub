const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const userRoutes = require("./routes/UserRoutes")
app.use(cors());
app.use(express.json());
mongoose
  .connect("mongodb://127.0.0.1:27017/cinehubb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connected");
  });
app.use("/api/user", userRoutes);
app.listen(5000, console.log("server started"));