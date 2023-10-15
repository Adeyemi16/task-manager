import axios from "axios"
import { CLOUDINARY_UPLOAD_PRESET, CLOUDINARY_URL, instance } from "./connect"

export const registerUser = async (username, email, password) => {
    const res = await instance.post("/api/v1/auth/register", { username, email, password })
    return res
}

export const loginUser = async (username, password) => {
    const res = await instance.post('/api/v1/auth/login', { username, password })
    return res
}

export const getUser = async (username, token) => {
    const res = await instance.get(`/api/v1/auth/user-profile/${username}`, {
        headers: { Authorization: `Bearer ${token}` }
    })
    return res
}

export const updateUser = async (profile, token) => {
    const res = await instance.put('/api/v1/auth/updateuser', profile,
        {
            headers: { Authorization: `Bearer ${token}` }
        })
    return res
}

export const createTask = async (task, token) => {
    const res = await instance.post('/api/v1/task/add-task',
        task,
        {
            headers: { Authorization: `Bearer ${token}` }
        }
    )
    return res
}

export const allTask = async (userId, token) => {
    const res = await instance.get(`/api/v1/task/users/${userId}/tasks`,
        {
            headers: { Authorization: `Bearer ${token}` }
        }
    )
    return res
}
export const deleteTask = async (taskId, token) => {
    const res = await instance.delete(`/api/v1/task/delete/task/${taskId}`,
        { headers: { Authorization: `Bearer ${token}` } })
    return res
}

export const editTask = async (taskId, updatedTask, token) => {
    const res = await instance.put(`/api/v1/task/edit/${taskId}`, updatedTask,
        {
            headers: { Authorization: `Bearer ${token}` }
        })
    return res
}

export const specificTask = async (taskId, token) => {
    const res = await instance.get(`/api/v1/task/${taskId}`,
        {
            headers: { Authorization: `Bearer ${token}` }
        }
    )
    return res
}

export const uploadToCloudinary = async (file) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)
    const data = await axios.post(CLOUDINARY_URL, formData)
    return data
}