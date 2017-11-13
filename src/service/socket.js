import io from 'socket.io-client';
import { newUser, disconnect } from '../actions/users';
import { newMessage, activeRoom } from '../actions/messages';
import { NEW_MESSAGE, NEW_USER, ACTIVE_ROOM, USER_LEFT } from 'websocket-chat-server/constants';

const hostname = window.location.hostname;

const port = 3001;

const socket = io(`ws://${hostname}:${port}`, {transports: ['websocket']});

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
		const onActiveRoom = data => store.dispatch(activeRoom(data));

		socket.on(NEW_USER, data => store.dispatch(newUser(data)));
		socket.on(USER_LEFT, data => store.dispatch(disconnect(data)));
		socket.on(NEW_MESSAGE, maybe(logged, onNewMessage));
		socket.on(ACTIVE_ROOM, maybe(logged, onActiveRoom));

		window.addEventListener('beforeunload', () => {
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