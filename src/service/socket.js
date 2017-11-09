import io from 'socket.io-client';
import { newUser, disconnect } from '../actions/users';
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
 * When users close chat
 */
export const USER_LEFT = 'user.left';

/**
 * Check if there is a user logged
 * @param state State from store (store.getState())
 */
export const isLogged = state => !!state().users.current;

/**
 * Execute some function if the check is true
 * @param check  {function(...[*]=): null}
 * @param execute  {function(...[*]=): null}
 * @returns {function(...[*]=): null}
 */
export const maybe = (check, execute) => {
	return (...args) => check() ? execute.apply(null, args) : null;
};

/**
 * Public API for components
 */
export default {
	subscribe(store) {
		const logged = isLogged.bind(null, store.getState.bind(store));
		const onNewMessage = data => store.dispatch(newMessage(data));

		socket.on(NEW_USER, data => store.dispatch(newUser(data)));
		socket.on(USER_LEFT, data => store.dispatch(disconnect(data)));
		socket.on(NEW_MESSAGE, maybe(logged, onNewMessage));

		window.addEventListener('beforeunload', (e) => {
			const username = store.getState().users.current;

			socket.emit(USER_LEFT, { username });
		});
	},

  newUser(username) {
		socket.emit(NEW_USER, username);
	},

  sendMessage(username, message, room) {
    socket.emit(NEW_MESSAGE, { username, message, room });
  }
};