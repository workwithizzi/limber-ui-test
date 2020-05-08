import React from 'react'
import PT from 'prop-types'
import stylePT from 'react-style-proptype'
import { Debug } from '../'
import { string } from '../../utils'


export function Textfield({
	label,
	form,
	id,
	name,
	hint,
	debug,
	...props
}) {
	return (
		<>
			<label
				form    = {form}
				htmlFor = {id || string.camelCase(label)}
			>
				{label}
				<input
					className = 'pure-input-1'
					form      = {form}
					id        = {id || string.camelCase(label)}
					name      = {name || string.camelCase(label)}
					type      = 'text'
					{...props}
				/>
			</label>

			{hint && <span className='pure-form-message'>{hint}</span>}

			{debug && (
				<Debug
					debug = {debug}
					info  = '<Textfield> Component - Props'
					label = {label}
					form  = {form || `not provided`}
					id    = {id || string.camelCase(label)}
					name  = {name || string.camelCase(label)}
					type  = 'text'
					{...props}
				/>
			)}

		</>
	)
}


Textfield.propTypes = {
	// Input Props
	autoComplete: PT.string,
	defaultValue: PT.string,
	value       : PT.string,
	disabled    : PT.bool,
	form        : PT.string,
	id          : PT.string,
	label       : PT.string.isRequired,
	list        : PT.string,
	maxLength   : PT.number,
	name        : PT.string,
	onBlur      : PT.func,
	onChange    : PT.func,
	placeholder : PT.string,
	readOnly    : PT.bool,
	required    : PT.bool,
	size        : PT.number,
	style       : stylePT,
	tabIndex    : PT.number,
	title       : PT.string,
	// Hint Text Props
	hint        : PT.string,
	// Debug Prop
	debug       : PT.bool,
}
