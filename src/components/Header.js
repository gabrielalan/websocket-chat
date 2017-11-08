import React  from 'react';
import PropTypes from 'prop-types';

const Header = ({ active }) => {
	return (
		<div className="header">
			<h2>#General</h2>
		</div>
	)
};

Header.propTypes = {
	active: PropTypes.number,
};

export default Header;