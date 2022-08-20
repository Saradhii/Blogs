import mongoose,{ Schema } from "mongoose";

export type SchemaType = {
  title:string;
  content:string;
  createdAt:Date;
  updatedAt:Date;
  deleted:Boolean;
  category_id:[];
};

const BlogSchema = new mongoose.Schema<SchemaType>({
  title: String,
  content: String,
  createdAt: Date,
  updatedAt: Date,
  deleted: Boolean,
  category_id:[Schema.Types.ObjectId],
});

const Blog = mongoose.model("blog", BlogSchema);

module.exports = Blog;
