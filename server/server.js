const express =require('express');
const socket =require('socket.io');
const http =require('http');
const app =express();
const server =http.createServer(app);
const io =socket(server);

/// helper functions
const { addUser, removeUser, getUser, getUsersInRoom } =require('./helpers/users');

const PORT =process.env.PORT || 5000;

/// Socket.IO
io.on('connection', (socket) => {

    socket.on('join', ({ name, room }, callback) => {
        const { error, user } =addUser({id: socket.id, name, room });
        if(error) return callback(error);

        socket.emit('message', { user: 'admin', text:`${user.name} welcome to ${user.room}` });
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text:`${user.name}, has Joined` });

        socket.join(user.room);

        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

        callback();

    });
    
    socket.on('sendMessage', (message, callback) => {
        const user =getUser(socket.id);

        io.to(user.room).emit('message', { user: user.name, text: message });
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

        callback();
    });
    
    socket.on('disconnect', () => {
        const user =removeUser(socket.id);
        if(user){
            io.to(user.room).emit('message', { user: 'admin', text:`${user.name}, has Left` });
        }
    });

});


/// Router
const router =require('./router');

app.use(router);

server.listen(PORT, () => console.log(`Your Server Is Running On Port ${PORT}`));