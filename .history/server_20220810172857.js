const express = require("express");
const { Server: HTTPServer} = require ("http");
const { Server: SocketServer} = require("socket.io");

const Container = require ("./public/class/container")
const m = new Container('./files/messages.json');
const events = require("./socket_events")
let nowDayJs = dayjs().format("DD/MM/YYYY HH:mm:ss");
const messages = [];

const app = express();

const httpServer = new HTTPServer(app);
const socketServer= new SocketServer (httpServer);

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

socketServer.on("connection", (socket) => {
    console.log("New client connected");
    socketServer.emit(events.UPDATE_MESSAGES, "WELCOME TO WEBSOCKET", messages);

    socket.on("POST_MSG", (msg) => {
        const newMsg = {
            ...msg,
            socket_id: socket.id,
            likes: 0,
            date: nowDayJs
        };
        messages.push(newMsg);
        console.log(newMsg);
        socketServer.sockets.emit(events.NEW_MESSAGE, newMsg);
    });
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});