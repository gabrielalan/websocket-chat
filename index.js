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

const rooms = ['General', 'Room #1'];

// Chat
io.on('connection', socket => {
	const NEW_MESSAGE = 'new.message';

	const systemMessage = message => {
		const data = {
			room: rooms[0],
			username: 'system',
			message: message
		};

		socket.emit(NEW_MESSAGE, data);
		socket.broadcast.emit(NEW_MESSAGE, data);
	};

	/**
	 * Listener for new messages
	 */
	socket.on(NEW_MESSAGE, data => {
		console.log(`${NEW_MESSAGE}: ${JSON.stringify(data)}`);
		socket.emit(NEW_MESSAGE, data);
		socket.broadcast.emit(NEW_MESSAGE, data);
	});

	/**
	 * Listener for disconnection/left
	 */
	socket.on('user.left', data => {
		if (!data || !data.username) {
			return;
		}

		console.log(`user.left: ${JSON.stringify(data)}`);

		active--;

		socket.broadcast.emit('user.left', {
			username: data.username,
			active
		});

		systemMessage(`${data.username} left!`);
	});

	/**
	 * Listener for new users
	 */
	socket.on('new.user', username => {
		active++;

		socket.emit('new.user', { active, rooms });
		socket.broadcast.emit('new.user', { active, rooms });

		systemMessage(`New user entered the chat: ${username}`);

		console.log(`new.user: ${username} - ${active}`);
	});
});