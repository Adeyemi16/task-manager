import express from "express"
import { addTask, deleteTask, editTask, getAllTask, specificTask } from "../controllers/task.js"
import { verifyToken } from "../middleware/verifytoken.js"

const router = express.Router()

router.post('/add-task', verifyToken, addTask)

router.delete('/delete/task/:id', verifyToken, deleteTask)

router.put('/edit/:id', verifyToken, editTask)

router.get('/users/:id/tasks', verifyToken, getAllTask)
router.get('/:id', verifyToken, specificTask)

export default router