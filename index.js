const express = require('express');
const path = require('path');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const port = 3001;

server.listen(port, () => console.log(`Listening on *:${port}`));

// Routing
app.use(express.static(path.join(__dirname, 'build')));

// Active users
let active = 0;

// Chat
io.on('connection', socket => {
	const newUserMessage = username => ({
		username: 'system',
		message: `New user entered the chat: ${username}`
	});

	socket.on('new.message', data => {
		console.log(`new.message: ${JSON.stringify(data)}`);
		socket.emit('new.message', data);
		socket.broadcast.emit('new.message', data);
	});

	socket.on('new.user', username => {
		active++;

		socket.emit('new.user', { active });
		socket.broadcast.emit('new.user', { active });

		socket.emit('new.message', newUserMessage(username));
		socket.broadcast.emit('new.message', newUserMessage(username));

		console.log(`new.user: ${username} - ${active}`);
	});
});