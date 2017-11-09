
export const changeCurrentUser = username => ({
	type: 'CHANGE_CURRENT_USER',
	username
});

export const newUser = data => ({
	type: 'NEW_USER',
	data
});

export const disconnect = data => ({
	type: 'DISCONNECT',
	data
});