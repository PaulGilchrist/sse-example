const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const guid = require('guid');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const PORT = 3000;

let clients = [];

function sendData(data) {
  clients.forEach(client => client.res.write(`data: ${JSON.stringify(data)}\n\n`))
}

app.get('/topic', (req, res, next) => {
  const headers = {
    'Content-Type': 'text/event-stream',
    'Connection': 'keep-alive',
    'Cache-Control': 'no-cache'
  };
  res.writeHead(200, headers);
  const clientId = guid.create().value;
  const newClient = {
    id: clientId,
    res
  };
  clients.push(newClient);
  req.on('close', () => {
    console.log(`${clientId} Connection closed`);
    clients = clients.filter(client => client.id !== clientId);
  });  
});

app.post('/topic', async (req, res, next) => {
  const data = req.body;
  res.json(data)
  return sendData(data);
});

app.get('/status', (req, res) => {
  response.json({ clients: clients.length })
});

app.listen(PORT, () => {
  console.log(`Message Broker listening at http://localhost:${PORT}`)
})