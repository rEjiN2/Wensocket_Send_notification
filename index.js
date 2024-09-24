import { WebSocketServer } from 'ws';
import si from "systeminformation";
import express from 'express';

const app = express();
const wss = new WebSocketServer({ port: 8080 });

// Middleware to parse JSON requests
app.use(express.json());

wss.on('connection', function connection(ws) {
  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });

  ws.send('something hi');
  ws.send('da mone');

  // Express POST route to handle incoming data
  app.post('/post', (req, res) => {
    const talk = req.body.talk; // Make sure 'talk' is present in the request body
    if (talk) {
      ws.send(talk); // Send message to the WebSocket
      res.send('Message sent to WebSocket');
    } else {
      res.status(400).send('Missing "talk" in the request body');
    }
  });

  ws.on('close', function close() {
    console.log('disconnected');
  });
});

app.get('/', (req, res) => {
  res.send('hi');
});

app.listen(6300, () => {
  console.log('listening on *:6300');
});
