const express = require('express');
const app = express();
const socketIO = require('socket.io');

const path = require('path');

const port = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, '../dist')));
app.get('*', (_request, response) =>
  response.sendFile(path.resolve(`${__dirname}/../dist/index.html`)),
);
const server = app.listen(port, () => console.log(`server listening on ${port}.`));
const io = socketIO(server);

const players = [];
io.on('connection', socket => {
  console.log('new client connected');
  socket.on('newPlayer', playerName => {
    const playerObject = {
      name: playerName,
      id: socket.id,
    };
    players.push(playerObject);
    io.emit('updatePlayers', players);
  });

  socket.on('disconnect', sckt => {
    for (let i = 0; i < players.length; i++) {
      if (players[i].id === socket.id) {
        players.splice(i, 1);
        break;
      }
    }
    io.emit('updatePlayers', players);
    console.log('a user disconnected');
  });
});
