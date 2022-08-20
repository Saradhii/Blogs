import mongoose, { Schema }from "mongoose";
var ObjectId = require("mongodb").ObjectId;

export type SchemaType = {
 blog_id:string;
 user_id:string;
 emoji:string;
};

const ReactionSchema = new mongoose.Schema<SchemaType>({
    blog_id:Schema.Types.ObjectId,
    user_id:Schema.Types.ObjectId,
    emoji:String,
});

const Reaction = mongoose.model("reactions", ReactionSchema);

module.exports = Reaction;
