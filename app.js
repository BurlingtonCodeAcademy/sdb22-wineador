require("dotenv").config()

const Express = require("express"),
    cors = require("cors"),
    mongoose = require("mongoose"),
    app = Express(),

    PORT = process.env.PORT || 4000,
    HOST = process.env.HOST || "127.0.0.1"
    MONGO_URL = process.env.MONGO_URL

    db = require("./db"),
    auth = require("./controllers/auth")
    wines = require("./controllers/wines"),
    session = require("./middlewares/session")


app.use(cors())
app.use(Express.json())
app.use("/api/auth", auth)
app.use("/api/wines", session, wines)

mongoose
    .connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(console.log(`Connected to: ${MONGO_URL}`))
    .catch((err) => console.log(err))

app.listen(PORT, HOST, () => {
    try {
        console.log(`server running on: ${HOST}:${PORT}`)
    } catch(err) {
        console.log(`server error: ${err}`)
    }
})