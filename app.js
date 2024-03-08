const express = require("express");
require("dotenv").config();
const connectToDB = require("./config/db");
//connection to database
connectToDB();
//init app
const app = express();
//apply middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/profile", require("./routes/profile"));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`server is running in ${process.env.NODE_ENV}on port ${PORT}`)
);
