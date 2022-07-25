const jwt = require("jsonwebtoken")
const User = require("../models/User")
const SECRET_KEY = process.env.SECRET_KEY

const session = async (req, res, next) => {
    try {
        if (req.method === "OPTIONS") {
            next()
        } else if (req.headers.authorization) {
            const authToken = req.headers.authorization.includes("Bearer") ? req.headers.authorization.split(" ")[1] : req.headers.authorization
            
            
            let payload = authToken ? jwt.verify(authToken, SECRET_KEY) : undefined
            
            
            if (payload) {
                const findUser = await User.findOne(
                    { username: payload.username}
                )
                
                // findUser
                //     ? req.user = findUser
                //     : res.status(400).json({
                //         status: `User not found.`
                //     })
                if (findUser) {
                    req.user = findUser
                    next()
                } else {
                    res.status(400).json({
                        status: `User not found.`
                    })
                }
            } else {
                res.status(401).json({
                    status: `Invalid token.`
                })
            }
        } else {
            res.status(403).json({
                status: `Forbidden.`
            })
        }
    } catch(err) {
        res.status(500).json({
            status: `Error`,
            error: `${err}`
        })
    }
}

module.exports = session