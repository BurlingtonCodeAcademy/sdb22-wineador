const router = require("express").Router()

// Login routes
router
    .route("/login")
    .post(async (req, res) => {
        const { username, password } = req.body
        console.log(username, password)
        res.send("login route hit")
    })
    
// Register routes
router
    .route("/register")
    .post(async (req, res) => {
        const { name, email, username, password } = req.body
        console.log(name, email, username, password)
        res.send("register route hit")
    })

    // TODO: put route and delete route for user modification

module.exports = router