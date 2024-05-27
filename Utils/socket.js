const { Server } = require('socket.io');

const setupWebSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('bid', (data) => {
      io.emit('update', data);
    });

    socket.on('notify', (data) => {
      io.emit('notification', data);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

  return io;
};

module.exports = setupWebSocket;