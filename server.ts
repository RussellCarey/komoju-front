// Host the build!!
const express = require("express")
const path = require("path")
const app = express()

// Prodution Server to run client.
// Servied client into pm2 with -spa..
app.use(express.static(path.join(__dirname, "build")))

app.get("/", function (req, res) {
	res.sendFile(path.join(__dirname, "build", "index.html"))
})

app.get("/store", function (req, res) {
	res.sendFile(path.join(__dirname, "build", "index.html"))
})

app.listen(4477, () => {
	console.log("Client hosted on 4477!")
})
