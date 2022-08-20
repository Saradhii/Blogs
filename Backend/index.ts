import express from "express";
const Connection = require("./storage/db");
const BlogRoute = require("./routes/BlogRoute");
const CommentsRoute = require("./routes/CommentsRoute");
const ReactionsRoute = require("./routes/ReactionsRoute");
const UserRoute = require("./routes/UserRoute");

const cors = require("cors");

let app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use("/blogs",BlogRoute);

app.use("/comments",CommentsRoute);

app.use("/reactions",ReactionsRoute);

app.use("/users",UserRoute);

const port = process.env.PORT || 8080;
app.get("/", (req, res) => {
  res.send("App working");
});


app.listen(port, async () => {
  try {
    await Connection;
    console.log("Connected Successfully");
  } catch (err) {
    console.log(err);
  }

  console.log("Sever is live at http://localhost:8080");
});
