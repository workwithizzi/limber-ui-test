// Button Component
// Accepts all standard button attributes as props
// Props:
//   block: forces button to fill width of container
//   primary: uses primary color
//   active: forces button to appear in active state
//   caution: uses caution color
//   label: Add text to button without using children prop
//   children: Add text to button the standard way
//- -----------------------------------------------------------------

import PT from 'prop-types'
import stylePT from 'react-style-proptype'

import '../styles/Button.scss'


export function Button({
	block,
	primary,
	active,
	label,
	caution,
	children,
	...props
}) {
	// Classes
	let bClass = `pure-button`
	if (active) {
		bClass = `${bClass} pure-button-active`
	}
	if (primary) {
		bClass = `${bClass} pure-button-primary`
	} else if (caution) {
		bClass = `${bClass} override-button-caution`
	}


	// Styles
	const bStyle = props.style ? props.style : {}
	if (block) {
		bStyle.display = `block`
		bStyle.width = `100%`
	}

	return (
		<button
			className={bClass}
			type={props.type || `button`}
			style={bStyle}
			{...props}
		>
			{label}
			{children}
		</button>
	)
}


Button.propTypes = {
	// Attributes
	autoFocus   : PT.bool,
	className   : PT.string,
	defaultValue: PT.string,
	disabled    : PT.bool,
	form        : PT.string,
	id          : PT.string,
	name        : PT.string,
	onClick     : PT.func,
	style       : stylePT,
	type        : PT.oneOf([`button`, `submit`, `reset`]),
	value       : PT.string,
	// Submit-Button props
	formAction  : PT.string,
	formEncType : PT.oneOf([
		`application/x-www-form-urlencoded`,
		`multipart/form-data`,
		`text/plain`,
	]),
	formMethod    : PT.oneOf([`get`, `post`]),
	formNoValidate: PT.bool,
	formTarget    : PT.oneOf([
		`_blank`,
		`_self`,
		`_parent`,
		`_top`,
		`framename`,
	]),
	// Custom props
	active : PT.bool,
	block  : PT.bool,
	caution: PT.bool,
	label  : PT.string,
	primary: PT.bool,
}
