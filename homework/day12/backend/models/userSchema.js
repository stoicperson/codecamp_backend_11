import mongoose from "mongoose";

const User = mongoose.model("User", new mongoose.Schema({
  name: String,
  email: String,
  personal: String,
  prefer: String,
  pwd: String,
  phone: String,
  og: {
    title: String,
    description: String,
    image: String
  }
}))

export default User