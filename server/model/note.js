import { Schema, model } from "mongoose";

const noteSchema = new Schema({
  filename: {
    type: String,
    required: true,
    unique: true
  },
  content: {
    type: String,
    required: true,
  },
}, { timestamps: true});
export default model("Note", noteSchema);