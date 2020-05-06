// Header component. Brought in each on individual page

import React from 'react'
import PT from 'prop-types'


export const Header = ({ title, subtitle }) => 
	<div className="override header">
		{title && <h1>{title}</h1>}
		{subtitle && <h2>{subtitle}</h2>}
	</div>

Header.propTypes = {
	subtitle: PT.string,
	title: PT.string,
}
