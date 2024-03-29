import mongoose from "mongoose";

const TodoSchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  desc: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  email:{
    type:String,
    required:true
  }
});

const Todo = mongoose.models.todos || mongoose.model("todos", TodoSchema);
export default Todo;
