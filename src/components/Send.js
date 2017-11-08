import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Send extends Component {
	constructor(props) {
		super(props);

		this.state = { message: '' };
	}

	handleSubmit(event) {
		event.preventDefault();
		this.props.onSubmit(this.state.message);
	}

	handleChange(event) {
		this.setState({ message: event.target.value });
	}

	render() {
		return (
			<div className="send-message">
				<form onSubmit={this.handleSubmit.bind(this)}>
					<div className="input-group">
						<input className="form-control form-control-lg"
									 type="text"
									 value={this.state.message}
									 onChange={this.handleChange.bind(this)}/>
						<span className="input-group-btn">
							<button className="btn btn-info btn-lg" type="submit">send</button>
						</span>
					</div>
				</form>
			</div>
		);
	}
}

Send.propTypes = {
	onSubmit: PropTypes.func.isRequired
};

export default Send;