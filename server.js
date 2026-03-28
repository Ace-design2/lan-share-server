const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 3000 });

let clients = [];

wss.on("connection", (ws) => {
  const deviceId = Math.random().toString(36).substring(7);

  const client = {
    id: deviceId,
    ws
  };

  clients.push(client);

  console.log("Device connected:", deviceId);

  // Send updated device list to everyone
  broadcastDevices();

  ws.on("message", (message, isBinary) => {
    // 1. Handle Binary Data (Files)
    if (isBinary) {
      console.log("Broadcasting binary data from:", deviceId);
      clients.forEach(c => {
        if (c.id !== deviceId && c.ws.readyState === WebSocket.OPEN) {
          c.ws.send(message, { binary: true });
        }
      });
      return;
    }

    // 2. Handle JSON Data (Messages/Devices)
    try {
      const data = JSON.parse(message);

      if (data.type === "message") {
        clients.forEach(c => {
          if (c.id !== deviceId && c.ws.readyState === WebSocket.OPEN) {
            c.ws.send(JSON.stringify({
              type: "message",
              payload: data.payload
            }));
          }
        });
      }
    } catch (err) {
      console.error("Invalid JSON received from:", deviceId);
    }
  });


  ws.on("close", () => {
    clients = clients.filter(c => c.id !== deviceId);
    broadcastDevices();
    console.log("Device disconnected:", deviceId);
  });
});

function broadcastDevices() {
  const deviceList = clients.map(c => c.id);

  clients.forEach(c => {
    if (c.ws.readyState === WebSocket.OPEN) {
      c.ws.send(JSON.stringify({
        type: "devices",
        payload: deviceList
      }));
    }
  });
}

console.log("Server running on ws://localhost:3000");