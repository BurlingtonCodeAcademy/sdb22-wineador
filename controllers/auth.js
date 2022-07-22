const router = require("express").Router()
const User = require("../models/User")
const bcrypt = require("bcryptjs")

// Login routes
router
    .route("/login")
    .post(async (req, res) => {
        const { username, password } = req.body
        const findUser = await User.findOne({ username })
        

        // !findUser && res.status(400).json({
        //     status: `User not found.`
        // })

        !findUser
            ? res.status(400).json({
                status: `User not found.`
            })
            : res.status(200).json({
                status: `Logged in.`,
                findUser
            })
    })

// Register routes
router
    .route("/register")
    .post(async (req, res) => {
        
        try {
            const { name, email, username, password } = req.body
            if (!name || !email || !username || !password) {
                throw new Error(`Insufficient Data`)
            } else {
                const newUser = new User({
                    name,
                    email,
                    username,
                    password: bcrypt.hashSync(password, 10)
                })
                newUser.save()

                res.status(201).json({
                    status: `User created`,
                    newUser
                })
            }
                
        } catch(err) {
            console.log(err)
        }
    })

    // TODO: put route and delete route for user modification

module.exports = router