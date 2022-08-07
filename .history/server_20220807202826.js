const express = require ('express');
const { Server: HTTPServer } = require ('http');
const { Server: SocketServer } = require ("socket.io");

const app = express();
const httpServer = new HTTPServer(app);
const socketServer = new SocketServer(httpServer);

app.use(express.static('public'));

app.get("/", (req, res) => {
    res.sendfile(__dirname + "/public/index.html");
});

socketServer.on("connection", (socket) => {
    console.log('Nuevo cliente conectado');
    socketServer.emit("INIT", "Welcome to WebSocket");

});

const PORT = process.env.PORT || 8080;
httpServer.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})