import React  from 'react';
import { connect } from 'react-redux';
import Socket from '../service/socket';
import Send from '../components/Send';
import Messages from '../components/Messages';

const ChatStructure = ({ sendMessage, username, room, messages }) => {
	return (
		<div className="chat">
			<Messages messages={messages}/>
			<Send onSubmit={sendMessage.bind(null, username, room)}/>
		</div>
	);
};

const getActiveRoomMessages = state => state.messages[state.messages.active].messages;

const mapStateToProps = state => ({
	messages: getActiveRoomMessages(state),
	username: state.users.current,
	room: state.messages.active,
});

const mapDispatchToProps = dispatch => ({
	sendMessage: (username, room, message) => Socket.sendMessage(username, message, room)
});

const Chat = connect(mapStateToProps, mapDispatchToProps)(ChatStructure);

export default Chat;