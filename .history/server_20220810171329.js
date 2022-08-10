const express = require("express");
const { Server: HTTPServer} = require ("http");
const { Server: SocketServer} = require("socket.io");

const Container = require ("./public/class/container")
const m = new Container('./files/messages.json');
const events = require("socket_events")
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
        msg = {...msg, id: socket.id};
        messages.push(msg);
        console.log(msg);
        socketServer.sockets.emit(events.NEW_MESSAGE, msg);
    });
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});