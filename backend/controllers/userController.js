import asyncHandler from '../middlewares/asyncHandler.js'
import User from '../models/userModel.js'
import bcrypt from 'bcryptjs/dist/bcrypt.js'
import createToken from '../utils/createToken.js'


const createUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password)
        throw new Error("Please enter all the field")

    const userExist = await User.findOne({ email })

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)


    if (userExist) {
        res.status(400)
        throw new Error("User Exist")
    }


    const newUser = new User({ username, email, password: hashedPassword })
    try {
        await newUser.save()
        createToken(res, newUser._id)

        res.status(201).json({ _id: newUser._id, username: newUser.username, password: newUser.password, isAdmin: newUser.isadmin })
    } catch (error) {
        console.log(error)
        res.status(400)
        throw new Error("Invalid user data")

    }
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const existingUser = await User.findOne({ email })
    if (existingUser) {
        const isValidPassword = await bcrypt.compare(password, existingUser.password)
        if (isValidPassword) {
            createToken(res, existingUser._id)
            res.status(200).json({ _id: existingUser._id, username: existingUser.username, email, isAdmin: existingUser.isadmin })
            return
        }
        else {
            throw new Error("Invalid password")
        }
    } else {
        res.status(404)
        throw new Error("User not found")
    }
})

const logoutCurrentUser = asyncHandler(async (req, res) => {
    res.cookie("jwt", "", {
        httyOnly: true,
        expires: new Date(0),
    });

    res.status(200).json({ message: "Logged out successfully" });
});

const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({})
    res.json(users)
})

const getCurrentProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if (user) {
        res.json({
            id: user._id,
            userName: user.username,
            email: user.email
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

const updateCurrentUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if (user) {
        user.username = req.body.username || user.username,
            user.email = req.body.email || user.email

        if (req.body.password) {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(req.body.password, salt)
            user.password = hashedPassword
        }
        const updatedUser = await user.save()

        res.json({
            id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            isadmin: updatedUser.isadmin,
            password: updatedUser.password
        })

    } else {
        res.status(404)
        throw new Error("User not found")
    }
})

const deleteUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (user) {
        if (user.isadmin) {
            res.status(400)
            throw new Error("Admin user can't be deleted")
        }
        await User.deleteOne({ _id: user._id })
        res.json({ message: "User removed !" })
    } else {
        res.status(404)
        throw new Error("User not found")
    }
})

const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password')
    if (user)
        res.json(user)
    else {
        res.status(404)
        throw new Error('User not found')
    }
})

const updateUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (user) {
        user.username = req.body.username || user.username,
            user.email = req.body.email || user.email
        user.isadmin = Boolean(req.body.isadmin)
        const updatedUser = await user.save()
        res.json({
            id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            isadmin: updatedUser.isadmin,

        })

    }
})





export { createUser, updateUserById, getUserById, updateCurrentUserProfile, getCurrentProfile, loginUser, logoutCurrentUser, getAllUsers, deleteUserById }