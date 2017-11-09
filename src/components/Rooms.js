import React from 'react';
import PropTypes from 'prop-types';

const Rooms = ({ rooms, active, onSelect }) => (
	<ul className="nav nav-pills flex-column">
	{rooms.map((item, key) => (
		<li key={key} className="nav-item">
			<a className={'nav-link' + (item === active ? ' active' : '')}
				 href={`#${key}`}
				 onClick={onSelect.bind(null, item)}>{item}</a>
		</li>
	))}
	</ul>
);

Rooms.propTypes = {
	rooms: PropTypes.arrayOf(PropTypes.string).isRequired,
	active: PropTypes.string.isRequired,
	onSelect: PropTypes.func.isRequired,
};

export default Rooms;