const express = require('express');
const cors = require('cors');

const app = express();
const server = require("http").createServer(app);

const { addUser } = require('./action.js');
const { removeUser } = require('./action.js');
const { getUsersInRoom } = require('./action.js');

const io = require('socket.io')(server, {
    cors: {
        origin: '*'
    }
});
const port = process.env.PORT || 2000;

app.use(express.static('./build'));

io.on("connection", socket => {
    // For Users in Room
    const { room } = socket.handshake.query;
    const { user } = addUser({ id: socket.id, room: room });
    if (room) {
        // console.log(user.id)
        console.log(room);
        socket.join(room);
        io.in(room).emit('allUsersData', {
            room: room,
            users: getUsersInRoom(room)
        });
    }
    socket.on("send message", (data) => {
        io.in(user.room).emit("send message", data);
    });
    socket.on("disconnect", () => {
        if (room) {
            removeUser(socket.id);
            io.in(room).emit("user leave room", user.id);
            socket.leave(room);
        }
    });

});
server.listen(port, () => {
    console.log(port)
});