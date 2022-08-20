import mongoose, { Schema } from "mongoose";
var ObjectId = require("mongodb").ObjectId;

export type SchemaType = {
 blog_id:string;
 user_id:string;
 message:string;
 rating:string;
};

const CommentSchema = new mongoose.Schema<SchemaType>({
    blog_id:Schema.Types.ObjectId,
    user_id:Schema.Types.ObjectId,
    message:String,
    rating:String,
});

const Comment = mongoose.model("comments", CommentSchema);

module.exports = Comment;
