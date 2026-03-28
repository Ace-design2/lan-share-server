# LAN Share Server (LAN-S)

A robust, minimal WebSocket-based file and message sharing server for local networks.

## Features

- **Real-Time Device Discovery**: Automatically informs connected clients about other peers in the network.
- **Bi-Directional Messaging**: Securely broadcasts JSON-based text messages between connected devices.
- **Binary File Transfers**: Efficiently handles and broadcasts binary data for fast file sharing.
- **Lightweight Architecture**: Driven by the high-performance `ws` library for Node.js.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [npm](https://www.npmjs.com/) (usually bundled with Node.js)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Ace-design2/lan-share-server.git
   ```
2. Navigate into the directory:
   ```bash
   cd lan-share-server
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Server

Start the WebSocket server on port 3000:
```bash
node server.js
```

The server will be accessible at: `ws://localhost:3000` (or your local IP address for LAN access).

## Protocol Specification

### 1. Device Discovery
When a device connects, the server calculates a unique device ID and broadcasts the updated list of connected IDs to all clients:
```json
{
  "type": "devices",
  "payload": ["device-id-1", "device-id-2", ...]
}
```

### 2. Messaging
To send a message, transmit a JSON object with the following structure:
```json
{
  "type": "message",
  "payload": "Your message here"
}
```

### 3. File Transfer
Send raw binary data through the WebSocket. The server will automatically broadcast this data to all other connected peers.

## License
Distributed under the ISC License.
