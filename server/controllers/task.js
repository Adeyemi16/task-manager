import Task from "../models/task.js";

export const addTask = async (req, res) => {
    try {
        const task = await Task.insertMany(req.body)
        res.status(201).json(task)
    } catch (error) {
        res.status(500).json(error);
    }
};

export const deleteTask = async (req, res) => {
    try {
        await Task.findByIdAndRemove(req.params.id)
        res.status(200).json("Task deleted successfully")
    }
    catch (error) {
        res.status(500).json(error)
    }
}


export const getAllTask = async (req, res, next) => {
    const userId = req.user.id
    try {
        const task = await Task.find({ user: userId });
        res.status(200).json(task)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const editTask = async (req, res) => {
    const { title, description, tag } = req.body;
    // Finding the task by its ID
    const existingTask = await Task.findById(req.params.id);
    try {
        if (existingTask) {
            // If the task was not found, send a 404 response
            existingTask.title = title || existingTask.title;
            existingTask.description = description || existingTask.description;
            existingTask.tag = tag || existingTask.tag;

            // Save the updated task to the database
            const updatedTask = await existingTask.save();

            // Send a success response with the updated task
            res.status(200).json(updatedTask);
        }



        // Update the task with the new data
        if (!existingTask) {
            return res.status(404).json({ error: 'Task not found' });
        }
    } catch (error) {
        // Handle errors and send an error response
        res.status(500).json({ error: 'Failed to update the task' });
    }
};

export const specificTask = async (req, res) => {
    const taskId = req.params.id
    try {
        const task = await Task.findById(taskId)

        res.status(200).json(task);
    }
    catch (error) {
        // Handle the error appropriately
        res.status(500).json({ error: "An error occurred" });
    }
}