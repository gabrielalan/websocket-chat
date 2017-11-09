const initial = {
	active: "General",
	"General": {
		messages: []
	}
};

const updateRooms = (state, rooms) => {
	const newRooms = rooms.reduce((result, item) => {
		if (item in state) {
			return result;
		}

		result[item] = {
			messages: []
		};

		return result;
	}, {});

	return Object.assign({}, state, newRooms);
};

const messages = (state = initial, action) => {
	switch (action.type) {
		case 'NEW_USER':
			return updateRooms(state, action.data.rooms);

		case 'ACTIVE_ROOM':
			const nextState = action.data.rooms ? updateRooms(state, action.data.rooms) : state;

			return Object.assign({}, nextState, {
				active: action.data.active
			});

		case 'NEW_MESSAGE':
			state[action.data.room] = Object.assign({}, state[action.data.room], {
				messages: [
					...state[action.data.room].messages,
					{
						username: action.data.username,
						message: action.data.message
					}
				]
			});

			return Object.assign({}, state);

		default:
			return state;
	}
};

export default messages;