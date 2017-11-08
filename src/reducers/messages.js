
const messages = (state = [], action) => {
	switch (action.type) {
		case 'NEW_MESSAGE':
			return [
				...state,
				{
					username: action.data.username,
					message: action.data.message
				}
			];

		default:
			return state;
	}
};

export default messages;