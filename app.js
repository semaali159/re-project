const express = require("express");
require("dotenv").config();
const connectToDB = require("./conf/db");
const cors = require("cors");
const {
  scheduleMedicinNotifications,
  scheduleActivityNotifications,
} = require("./utils/sendNoti");
const { notFound, errorHandler } = require("./middleware/errors");
//connection to database
connectToDB();
//send notification
scheduleMedicinNotifications();
scheduleActivityNotifications();
//init app
const app = express();
app.use(
  cors({
    origin: "*", // origin: 'http://localhost:3000'
  })
);
app.use(cors({ credentials: true, origin: true, withCredentials: true }));
//apply middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/profile", require("./routes/profile"));
app.use("/api/medicin", require("./routes/medicin"));
app.use("/api/activity", require("./routes/activity"));
// app.use("/api/notification", require("./routes/notification"));
app.use("/api/disease", require("./routes/diseases"));
app.use("/api/dailyHealth", require("./routes/dailyHealth"));
app.get("/test", (req, res) => {
  res.send("hello");
});
app.use("/", (req, res) => {
  res.send(`<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Enaya</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        font-family: sans-serif;
        background-color: #e0e0e0;
      }
      .header {
        height: 100vh;
        background-image: url("https://images.unsplash.com/photo-1579537533965-3875982f3d87?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaW8=&auto=format&fit=crop&w=750&q=80");
        background-size: cover;
        background-position: center;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .header h1 {
        color: #0a9a95;
        font-size: 6rem;
        text-align: center;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
      }
    </style>
  </head>
  <body>
    <div class="header">
      <b><h1>Welcome to our Enaya app</h1></b>
    </div>
  </body>
  </html>
  `);
});
// Error Handler Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`server is running in ${process.env.NODE_ENV}on port ${PORT}`)
);
