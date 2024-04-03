import express from "express";
import { test_export } from "./other_file";
import { WebSocketServer } from "ws";

// Express server
const webserver = express()
  .use((req, res) => res.sendFile("/index.html", { root: __dirname }))
  .listen(3000, () => console.log(`Listening on ${3000}`));

// Example of using an import from another file
test_export();

// Websocket server
const sockserver = new WebSocketServer({ port: 443 });
sockserver.on("connection", (ws) => {
  console.log("New client connected!");
  ws.send("connection established");
  ws.on("close", () => console.log("Client has disconnected!"));
  ws.on("message", (data) => {
    sockserver.clients.forEach((client) => {
      console.log(`distributing message: ${data}`);
      client.send(`${data}`);
    });
  });
  ws.onerror = function () {
    console.log("websocket error");
  };
});
