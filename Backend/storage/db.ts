import mongoose from "mongoose";

const Connection = mongoose.connect(
  "mongodb://localhost:27017/Blogs"
);

module.exports = Connection;
