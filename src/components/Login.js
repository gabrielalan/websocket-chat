import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Login extends Component {
	constructor(props) {
		super(props);

		this.state = { username: '' };
	}

	handleSubmit(event) {
		event.preventDefault();

		if (!this.state.username) {
			return false;
		}

		this.props.onSubmit(Object.assign({}, this.state));
	}

	handleChange(event) {
		this.setState({ username: event.target.value });
	}

	render() {
		return (
			<div className="login">
				<form onSubmit={this.handleSubmit.bind(this)}>
					<div className="form-group">
						<label htmlFor="username">Type your username</label>
						<input className="form-control form-control-lg"
									 type="text" id="username"
									 value={this.state.username}
									 onChange={this.handleChange.bind(this)}/>
					</div>
					<button type="submit" className="btn btn-lg btn-primary" disabled={!this.state.username}>enter</button>
				</form>
			</div>
		);
	}
}

Login.propTypes = {
	onSubmit: PropTypes.func.isRequired
};

export default Login;