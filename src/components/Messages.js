import React  from 'react';
import PropTypes from 'prop-types';

const Message = (item, key) => {
	if (item.username === 'system') {
		return (
			<tr key={key} className="system-message">
				<td colSpan={2}>{item.message}</td>
			</tr>
		);
	}

	return (
		<tr key={key}>
			<td width={20} className="username">{item.username}</td>
			<td>{item.message}</td>
		</tr>
	);
};

const Messages = ({ messages }) => (
	<div className="messages">
		<table className="table table-striped">
			<tbody>
			{messages.map(Message)}
			</tbody>
		</table>
	</div>
);

Messages.propTypes = {
	messages: PropTypes.arrayOf(
		PropTypes.shape({
			username: PropTypes.string.isRequired,
			message: PropTypes.string.isRequired
		}).isRequired
	).isRequired,
};

export default Messages;