import mongoose from 'mongoose'

const boardSchema = new mongoose.Schema({
  writer: String,
  title: String,
  contents: String
})

const Board = mongoose.model("Board", boardSchema)

export default Board