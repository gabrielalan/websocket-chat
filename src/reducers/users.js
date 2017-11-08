const initial = {
	current: '',
	active: 0
};

const users = (state = initial, action) => {
	switch (action.type) {
		case 'NEW_USER':
			return Object.assign({}, state, {
				active: action.data.active
			});

		case 'CHANGE_CURRENT_USER':
			return Object.assign({}, state, {
				current: action.username
			});

		default:
			return state;
	}
};

export default users;