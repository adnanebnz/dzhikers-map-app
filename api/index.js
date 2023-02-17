const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const pinRoute = require("./routes/pins");
const userRoute = require("./routes/users");
mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("connected to mongoDb"));

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/pins", pinRoute);
app.use("/api/users", userRoute);

app.listen(8800, () => {
  console.log("Server listening at port 8800");
});
