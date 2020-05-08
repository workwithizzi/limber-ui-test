// Radio component
// HTML attributes: https://t.ly/yR2b2
// Notes:
//   Does not accept children
//   For Checkbox groups, use the same prop.name

import React from 'react'
import PT from 'prop-types'
import stylePT from 'react-style-proptype'
import { Debug } from '../'
import { string } from '../../utils'


export function Radio({
	label,
	form,
	id,
	name,
	style,
	hint,
	debug,
	...props
}) {

	return (
		<>
			<label
				className = 'pure-radio'
				form      = {form}
				htmlFor   = {id || string.camelCase(label)}
			>
				<input
					form  = {form}
					id    = {id || string.camelCase(label)}
					name  = {name}
					style = {style || {marginRight:`10px`} }
					type  = 'radio'
					{...props}
				/>
				{label}
			</label>

			{hint && <span className='pure-form-message'>{hint}</span>}

			{debug && (
				<Debug
					debug = {debug}
					info  = '<Radio> Component - Props'
					label = {label}
					form  = {form || `not provided`}
					id    = {id || string.camelCase(label)}
					name  = {name || `not provided`}
					type  = 'radio'
					{...props}
				/>
			)}

		</>
	)
}

Radio.propTypes = {
	// Input Props
	checked       : PT.bool,
	disabled      : PT.bool,
	form          : PT.string,
	id            : PT.string,
	label         : PT.string.isRequired,
	name          : PT.string,
	onBlur        : PT.func,
	onChange      : PT.func,
	readOnly      : PT.bool,
	required      : PT.bool,
	style         : stylePT,
	tabIndex      : PT.number,
	value         : PT.string,
	// Hint Text Props
	hint          : PT.string,
	// Debug Prop
	debug         : PT.string,
}
