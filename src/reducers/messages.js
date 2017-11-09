const initial = {
	active: "General",
	"General": {
		messages: []
	}
};

const messages = (state = initial, action) => {
	switch (action.type) {
		case 'NEW_USER':
			const newRooms = action.data.rooms.reduce((result, item) => {
				if (item in state) {
					return result;
				}

				result[item] = {
					messages: []
				};

				return result;
			}, {});

			return Object.assign({}, state, newRooms);

		case 'ACTIVE_ROOM':
			return Object.assign({}, state, {
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