import React  from 'react';
import { connect } from 'react-redux';
import Socket from '../service/socket';
import Send from '../components/Send';
import Messages from '../components/Messages';

const ChatStructure = ({ sendMessage, username, messages }) => {
	return (
		<div className="chat">
			<Messages messages={messages}/>
			<Send onSubmit={sendMessage.bind(null, username)}/>
		</div>
	);
};

const mapStateToProps = state => ({
	messages: state.messages,
	username: state.users.current,
});

const mapDispatchToProps = dispatch => ({
	sendMessage: (username, message) => Socket.sendMessage(username, message)
});

const Chat = connect(mapStateToProps, mapDispatchToProps)(ChatStructure);

export default Chat;