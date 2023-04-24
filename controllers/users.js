const usersRouter = require("express").Router()
const bcrypt = require("bcrypt")
const User = require("../models/user")

usersRouter.get("/", async (request, response) => {
    const users = await User.find({}).populate("blogs", {user:0, likes:0})
    response.json(users)
})

usersRouter.post("/", async (request, response, next) => {
    const {username, name, password} = request.body
    if (!password){
        const error = new Error("ValidationError")
        error.message = "Password is required."
        error.name = "ValidationError"
        return next(error)
    } else if (password.length < 3){
        const error = new Error("ValidationError")
        error.message = "Password must contain at least 3 characters"
        error.name = "ValidationError"
        return next(error)
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User(
        {
            username,
            name,
            passwordHash,
        }
    )

    const savedUser = await user.save()

    response.status(201).json(savedUser)
})

module.exports = usersRouter