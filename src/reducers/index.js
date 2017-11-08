import { combineReducers } from 'redux';
import users from './users';
import messages from './messages';

const chatApp = combineReducers({
	users,
	messages,
});

export default chatApp;