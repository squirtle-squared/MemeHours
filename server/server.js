const express = require('express');
const app = express();
const path = require('path');

const socket = require('socket.io');

const port = process.env.PORT || 3001;

const server = app.listen(port, () => console.log(`server listening on ${port}.`));

app.use('/', express.static(path.join(__dirname, '../dist')));
app.get('*', (_request, response) =>
  response.sendFile(path.resolve(`${__dirname}/../dist/index.html`)),
);

const io = socket(server);

io.on('connection', socket => {
  console.log('new client connected');

  io.on('disconnect', socket => {
    console.log('a user disconnected');
  });
});
