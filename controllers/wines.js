const router = require("express").Router()

router
    .route("/")
    .get((req, res) => {
        // get all wines
        const username = req.query.username
        console.log(username)
        res.send("Get wine route hit.")
    })
    .post((req, res) => {
        // post our wines
        const { 
            wineName,
            vintage,
            location,
            price,
            color,
            grapes,
            available,
            username
        } = req.body
        console.log(req.body);
        res.send("Post wine route hit.")
    })

router
    .route("/:id")
    .put((req, res) => {
        // update our wine
        const { id } = req.params

        const { 
            wineName,
            vintage,
            location,
            price,
            color,
            grapes,
            available,
        } = req.body
        
        console.log(id)
        res.send("Update wine route hit!")
    })
    .delete((req, res) => {
        // deletes our wine
        const { id } = req.params
        console.log(id)
        res.send("Delete wine route hit.")
    })

module.exports = router