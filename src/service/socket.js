import io from 'socket.io-client';
import { newUser } from '../actions/users';
import { newMessage } from '../actions/messages';

const socket = io('http://localhost:3001');

/**
 * Message event (bidirectional)
 */
export const NEW_MESSAGE = 'new.message';

/**
 * When some other user enters on the chat (not bidirectional)
 */
export const NEW_USER = 'new.user';

/**
 * Public API for components
 */
export default {
	subscribe(store) {
		socket.on(NEW_USER, data => store.dispatch(newUser(data)));
		socket.on(NEW_MESSAGE, data => store.dispatch(newMessage(data)));
	},

  newUser(username) {
		socket.emit(NEW_USER, username);
	},

  sendMessage(username, message) {
    socket.emit(NEW_MESSAGE, { username, message });
  }
};