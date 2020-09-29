const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const port = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, '../dist')));
app.get('*', (_request, response) =>
  response.sendFile(path.resolve(`${__dirname}/../dist/index.html`)),
);

io.on('connection', socket => {
  console.log('new client connected');

  io.on('disconnect', socket => {
    console.log('a user disconnected');
  });

  socket.emit('message', 'welcome!');

  io.on('connected', () => {
    console.log('success');
  });
});

server.listen(port, () => console.log(`server listening on ${port}.`));
