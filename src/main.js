var socket = io('127.0.0.1:3000');
socket.emit('welcome');
socket.on('msg-welcome', function(x, y, z) {
    console.log(`${x} ${y} ${z}`);
});
