const express = require('express');
const app = express();
const path = require('path');
const socketio = require('socket.io');

const port = process.env.PORT || 3001;

app.use('/', express.static(path.join(__dirname, '../dist')));
app.get('*', (_request, response) =>
  response.sendFile(path.resolve(`${__dirname}/../dist/index.html`)),
);
const server = app.listen(port, () => console.log(`Listening on port ${port}...`));
const io = socketio(server);

io.on('connection', socket => {
  console.log('new client connected');

  socket.emit('messageFromServer', { data: 'message from server' });
  socket.on('messageFromClient', msg => {
    console.log(msg);
  });

  socket.on('disconnect', socket => {
    console.log('a user disconnected');
  });
});
