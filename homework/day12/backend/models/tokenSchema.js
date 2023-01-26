import mongoose from "mongoose"

const Token = mongoose.model("Token", new mongoose.Schema({
  token: String,
  phone: String,
  isAuth: Boolean
}))

export default Token