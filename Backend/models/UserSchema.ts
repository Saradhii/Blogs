import mongoose,{ Schema } from "mongoose";

export type SchemaType = {
  name:string;
  email:string;
  social_profile:{};
  addresses:[{}];
  blogs:[];
};

const UserSchema = new mongoose.Schema<SchemaType>({
  name:String,
  email:String,
  social_profile:{},
  addresses:[{}],
  blogs:[Schema.Types.ObjectId],
});

const User = mongoose.model("users", UserSchema);

module.exports = User;
