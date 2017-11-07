const express = require('express');
const path = require('path');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const port = 3001;

server.listen(port, () => console.log(`Listening on *:${port}`));

// Routing
app.use(express.static(path.join(__dirname, 'build')));

// Chat
io.on('connection', socket => {
	socket.on('new.message', message => {
		console.log(message);
		io.emit('new.message', { message });
	});
});