const app = require("express")()
const http = require("http").createServer(app)
const io = require("socket.io")(http, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
})

app.get("/", (req, res) => {
    res.send("Hello backend")
})

var count = 0

io.on("connection", (socket) => {
    // console.log("New websocket connection")

    socket.emit("countUpdated", count)

    socket.on("increment", () => {
        count++
        io.emit("countUpdated", count)
    })
})

http.listen(8000, () => {
    console.log("Your backend is on localhost 8000")
})
