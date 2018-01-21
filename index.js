const express = require('express');
const socket = require('socket.io');

const app = express();

app.use(express.static('public'));

const server = app.listen(3111, () => {
  console.log('good');
});

const io = socket(server);
io.on('connection', socket => {
  console.log('socket connection', socket.id);
  socket.on('chat', data => {
    io.sockets.emit('chat', data);
  });
  socket.on('typing', data => {
    // io.sockets.emit('typing', data);
    socket.broadcast.emit('typing', data);
  });
  socket.on('losing_typing', data => {
    // io.sockets.emit('typing', data);
    socket.broadcast.emit('losing_typing', data);
  });
});
