const express = require("express");
const { Server: HTTPServer} = require ("http");
const { Server: SocketServer} = require("socket.io");

const Container = require ("./public/class/container")
const m = new Container('./files/messages.json');
const events = require("./socket_events")

const messages = m.getAll();

const dayjs = require('dayjs')
let nowDayJs = dayjs().format("DD/MM/YYYY HH:mm:ss");

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
        m.save(newMsg);
        socketServer.sockets.emit(events.NEW_MESSAGE, newMsg);
    });

    socket.on(events.LIKE_MESSAGE, (msgiD) => {
        const msg = m.getById(msgiD);
        msg.likes++;
        m.update(msgiD, msg);
        socketServer.sockets.emit(
            events.UPDATE_MESSAGES,
            "Message liked",
            m.getAll());
    });
});


const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});