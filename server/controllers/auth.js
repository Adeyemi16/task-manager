import generateToken from "../config/token.js";
import User from "../models/auth.js";
import { customError } from "../config/error.js"
import bcrypt from "bcrypt"
import crypto from "crypto"
import nodemailer from "nodemailer"

export const registerUser = async (req, res, next) => {
    const { email, username, password, profileImg } = req.body;

    try {
        // to check if that user already exist
        const userExists = await User.findOne({ email })
        if (userExists) return next(customError(404, "user exist"))
        //to encrypt the user password
        const salt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(password, salt)

        //to create the user
        const newUser = await User.create({
            username,
            email,
            password: passwordHash,
            profileImg: profileImg || "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        })

        const user = {
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            profileImg: newUser.profileImg
        }

        const access_token = generateToken(user._id)
        res.status(201).json({ access_token, user, msg: "user created" })

    } catch (error) {
        res.status(500).json(error)
    }
}

export const loginUser = async (req, res, next) => {
    const { username, password } = req.body

    try {
        const userExists = await User.findOne({ username })
        if (!userExists) return next(customError(400, "user not found"))
        const isPasswordMatch = await bcrypt.compare(password, userExists.password)
        if (!isPasswordMatch) return next(customError(400, "incorrect pasword"))

        const user = {
            _id: userExists._id,
            username: userExists.username,
            email: userExists.email,
            profileImg: userExists.profileImg,
        }

        const access_token = generateToken(userExists._id);
        res.status(200).json({ access_token, user, msg: 'Login successful' });

    } catch (error) {
        res.status(500).json(error)
    }
}

export const getSingleUser = async (req, res, next) => {
    const { username } = req.params
    try {
        const user = await User.findOne({ username })
        if (!user) return next(customError(400, "Cant find user"))
        //spreading the items from user._doc
        const { password, ...others } = user._doc
        res.status(200).json(others)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const updateUser = async (req, res) => {
    const userId = await User.findById(req.user.id)
    const { username, email, password, profileImg } = req.body
    try {
        if (userId) {
            userId.username = username || userId.username
            userId.email = email || userId.email
            userId.profileImg = profileImg || userId.profileImg
            if (password) {
                const hashedPassword = await bcrypt.hash(req.body.password, 10)
                if (hashedPassword) {
                    userId.password = hashedPassword
                }
            }
            else {
                userId.password = userId.password
            }

            const updatedUser = await userId.save()
            const user = {
                _id: updatedUser._id,
                username: updatedUser.username,
                email: updatedUser.email,
                profileImg: updatedUser.profileImg,
                createdAt: updatedUser.createdAt,
            }
            console.log(user)
            const access_token = generateToken(updatedUser._id)
            res.status(201).json({ access_token, user, msg: "User profile updated" })
        }
        else {
            res.status(404)
            throw new Error("user profile not updated")
        }
    } catch (error) {
        res.status(500).json(error)
    }
}