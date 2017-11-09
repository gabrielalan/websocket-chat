import { connect } from 'react-redux';
import { activeRoom } from './actions/messages';
import Structure from './components/AppStructure';
import './App.css';

const getRooms = state => {
	const rooms = [];

	for(let key in state) {
		if (key === 'active') {
			continue;
		}

		rooms.push(key);
	}

	return { rooms, active: state.active };
};

const mapStateToProps = state => ({
	isLogged: !!state.users.current,
	active: state.users.active,
	rooms: getRooms(state.messages)
});

const mapDispatchToProps = dispatch => ({
	onRoomSelect: active => dispatch(activeRoom({ active }))
});

const App = connect(mapStateToProps, mapDispatchToProps)(Structure);

export default App;
