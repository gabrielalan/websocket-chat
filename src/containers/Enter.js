import { connect } from 'react-redux';
import { changeCurrentUser } from '../actions/users';
import Socket from '../service/socket';
import Login from '../components/Login';

const mapStateToProps = state => state;

const mapDispathToProps = dispatch => ({
	onSubmit: values => {
		Socket.newUser(values.username);
		dispatch(changeCurrentUser(values.username));
	}
});

const Enter = connect(mapStateToProps, mapDispathToProps)(Login);

export default Enter;