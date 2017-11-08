import React  from 'react';
import { connect } from 'react-redux';
import Enter from './containers/Enter';
import Chat from './containers/Chat';
import Header from './components/Header';
import './App.css';

const Structure = ({ isLogged, active }) => {
	const container = (
		<div className="rooms-ct">
			<div className="rooms">
				<h1>Wow chat</h1>
				<p>Active users: <span className="badge-primary badge-pill">{active}</span></p>
				<ul className="nav nav-pills flex-column">
					<li className="nav-item"><a className="nav-link active" href="#general">General</a></li>
					<li className="nav-item"><a className="nav-link" href="#1">Room #1</a></li>
					<li className="nav-item"><a className="nav-link" href="#2">Room #2</a></li>
					<li className="nav-item"><a className="nav-link" href="#3">Room #3</a></li>
					<li className="nav-item"><a className="nav-link" href="#4">Room #4</a></li>
				</ul>
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

const mapStateToProps = state => ({
	isLogged: !!state.users.current,
	active: state.users.active,
});

const mapDispatchToProps = () => ({});

const App = connect(mapStateToProps, mapDispatchToProps)(Structure);

export default App;
