function disconnect(socket, io, user, users) {
  socket.on('disconnect', () => {
    user.isOnline = false;

    users.forEach((socketUser) => {
      io.to(socketUser.id).emit('contacts', users);
    });
  });
};

module.exports = disconnect;
