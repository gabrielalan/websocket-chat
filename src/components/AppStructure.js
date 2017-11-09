import React from 'react';
import Enter from '../containers/Enter';
import Chat from '../containers/Chat';
import Header from './Header';
import Rooms from './Rooms';

const AppStructure = ({ isLogged, active, rooms, onRoomSelect }) => {
	const container = (
		<div className="rooms-ct">
			<div className="rooms">
				<h1>Wow chat</h1>
				<p>Active users: <span className="badge-primary badge-pill">{active}</span></p>
				<Rooms rooms={rooms.rooms} active={rooms.active} onSelect={onRoomSelect}/>
			</div>
			<div className="chat-container">
				<Header active={active}/>
				<Chat/>
			</div>
		</div>
	);

	const show = !isLogged ? <Enter/> : container;

	return (
		<div className="app">{show}</div>
	);
};

export default AppStructure;