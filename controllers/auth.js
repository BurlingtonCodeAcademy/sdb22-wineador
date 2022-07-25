const router = require("express").Router()
const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const SECRET_KEY = process.env.SECRET_KEY

// Login routes
router
    .route("/login")
    .post(async (req, res) => {
        const { username, password } = req.body
        
        try {
            const findUser = await User.findOne({ username })
            
            if (findUser) {

                const verifyPwd = await bcrypt.compare(password, findUser.password)

                const token = jwt.sign(
                    { username: findUser.username },
                    SECRET_KEY,
                    { expiresIn: 60 * 60 * 24}
                )

                verifyPwd
                    ? res.status(200).json({
                        status: "User logged in.",
                        token,
                        findUser
                    })
                    : res.status(403).json({
                        status: "Wrong password peasant!"
                    })

                // TODO: talk about tokens
            } else {
                res.status(401).json({
                    status: "User not found."
                })
            }
        } catch(err) {
            res.status(500).json({
                status: "Generic Error",
                error: `${err}`
            })
        }
        
        
        // const verifyPwd = await bcrypt.compare(password, findUser.password )
        // console.log(verifyPwd)

        // // !findUser && res.status(400).json({
        // //     status: `User not found.`
        // // })

        // !findUser
        //     ? res.status(400).json({
        //         status: `User not found.`
        //     })
        //     : res.status(200).json({
        //         status: `Logged in.`,
        //         findUser
        //     })
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

                const token = jwt.sign(
                    { username: newUser.username },
                    SECRET_KEY,
                    { expiresIn: 60 * 60 * 24}
                )

                res.status(201).json({
                    status: `User created`,
                    token,
                    newUser
                })
            }
                
        } catch(err) {
            console.log(err)
        }
    })

    // TODO: put route and delete route for user modification

module.exports = router