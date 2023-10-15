import mongoose from "mongoose";

// Define the Task Schema
const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        tag: {
            type: String,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        }
    },
    {
        timestamps: true
    }
);

// Create the Task model
const Task = mongoose.model("Task", taskSchema);

export default Task;
