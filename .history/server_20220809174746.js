const express = require ('express');
const { Server: HTTPServer } = require ('http');
const { Server: SocketServer } = require ("socket.io");
const events = require("./socket_events");
const Container = require("./Class/container");
const container = new Container("./files/messages.json");

const messages = container.getAll();

const app = express();
const httpServer = new HTTPServer(app);
const socketServer = new SocketServer(httpServer);

app.use(express.static('public'));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

socketServer.on("connection", (socket) => {
    console.log('New client connected');
    socketServer.emit(events.UPDATE_MESSAGES, "Welcome to WebSocket", messages);

    socket.on(events.POST_MESSAGE, (msg)=>{
        const _msg = {
            ...msg,
            id: socket.id,
            likes: 0,
            date: Date.now()
        };
        container.save(_msg);
        messages.push(_msg);
        console.log(_msg);
        socketServer.sockets.emit(events.NEW_MESSAGE, _msg);
        });
    }); 

//     socket.on(events.LIKE_MESSAGE, (msgId) => {
//         const msg = container.getById(msgId);
//         msg.likes++;
//         container.updateMsgById(msgId, msg);
//         socketServer.sockets.emit(
//             events.UPDATE_MESSAGES,
//             "Messages Updated",
//             container.getAll()
//         );
//     })
// });

const PORT = process.env.PORT || 8080;
httpServer.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
});