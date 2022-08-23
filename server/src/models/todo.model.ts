import { model, Schema } from "mongoose";
import { ITodo } from "../types/todos.type";

const todoSchema: Schema = new Schema({
    authorId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    public: {
        type: Boolean,
        default: false,
    },
});

export const TodoModel = model<ITodo>("Todo", todoSchema);
