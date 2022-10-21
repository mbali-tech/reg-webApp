const express = require("express")
const exphbs = require("express-handlebars")
const session = require("express-session")
const flash = require("express-flash")
const bodyParser = require("body-parser")
const pgPromise = require("pg-promise")({})

const app = express()
const config = {
    connectionString: process.env.DATABASE_URL || "postgresql://postgres:2007121214@localhost:5432/registration"
}
if(app.get("env") === "production"){
    config.ssl = {
        rejectUnauthorized: false
    }
}
const db = pgPromise(config)

app.engine("handlebars", exphbs.engine({defaultLayout: "main"}))
app.set("view engine", "handlebars")

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(express.static("public"))

app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: false
}))
app.use(flash())

const database = require("./database")(db)
const routes = require("./routes")(database)

app.get("/", routes.index)
app.post("/add", routes.add)

app.post("/filter", routes.filter)
app.get("/filter/:town", routes.filtered)

const PORT = process.env.PORT || 4020
app.listen(PORT, () => {
    console.log("App started at "+PORT)
})
