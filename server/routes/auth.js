import express from 'express'
import { verifyToken } from "../middleware/verifytoken.js"
import { loginUser, registerUser, getSingleUser, updateUser } from '../controllers/auth.js'

const router = express.Router()

// Register a new user
router.post("/register", registerUser);

// Login user
router.post("/login", loginUser);

// Get a single user profile (replace :username with the actual username)
router.get("/user-profile/:username", verifyToken, getSingleUser);

// Update user profile
router.put("/updateuser", verifyToken, updateUser);

export default router