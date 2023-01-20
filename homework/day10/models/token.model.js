import mongoose from "mongoose"

const tokenSchema = new mongoose.Schema({
  token: String,
  phone: String,
  isAuth: Boolean
})

const Token = mongoose.model("Token", tokenSchema)

export default Token