const express = require("express")();
const http = require("http").Server(express);
const port = process.env.PORT || 3000;
const SocketServer = require("ws").Server;
express.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

const server = http.listen(port, () => {
    console.log(`Socket.IO server running at http://localhost:${port}/`);
});
const wss = new SocketServer({ server });

wss.on("connection", (ws) => {
    console.log("Client connected");
    ws.on("message", (data) => {
        let clients = wss.clients;
        clients.forEach((client) => {
            client.send(data);
        });
    });
    ws.on("close", () => {
        console.log("Close connected");
    });
});