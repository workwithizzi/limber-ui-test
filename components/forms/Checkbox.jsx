// Checkbox component
// HTML attributes: https://tinyurl.com/yyr9npa6
// Notes:
// - Includes optional 'debug' prop
// - Includes optional 'hint' prop to output a helpful tip
// - Does not accept children
// - For Checkbox groups, use the same prop.name
//
// Example:
// - <Checkbox
// -   id='checkboxID'
// -   label='Do you like ice cream?'
// -   checked={true} // default state
// -   onChange={event => console.log(event.target.checked)}
// -   debug // optional values: 'log' || 'print'
// -   value='Likes Ice Cream'
// -   hint='This is a hint.'
// - />
//
//- -----------------------------------------------------------------

import { useState } from 'react'
import PT from 'prop-types'
import stylePT from 'react-style-proptype'
import { Debug } from '../'
import { string } from '../../utils'


export function Checkbox({
	onChange,
	checked,
	label,
	form,
	id,
	name,
	hint,
	debug,
	...props
}) {
	// Set the state for the `Checkbox`, based on the `checked` value, i.e. `checked` in this case is the `INITIAL_STATE`
	const [isChecked, setIsChecked] = useState(checked)

	// TODO: Make sure useState, checked/defaultCheck, and _handleChange are correct
	function _handleChange() {
		setIsChecked(!isChecked)
		// If `onChange` prop is passed execute the `onChange` function.
		// also pass an event there, so that inside of `onChange` function that is outside of the current component, it was possible to access the `event` and the state of the checkbox
		onChange && onChange(event)
	}

	return (
		<>
			<label
				className = 'pure-checkbox'
				form      = {form}
				htmlFor   = {id || string.camelCase(label)}
			>
				<input
					// Here we should use the state instead of prop as within the component, we change the related state only when `onChange` event is triggered
					defaultChecked = {isChecked}
					form     = {form}
					id       = {id || string.camelCase(label)}
					name     = {name}
					onChange = {_handleChange}
					type     = 'checkbox'
					style    = {{marginRight:`10px`}}
					{...props}
				/>
				{label}

				{debug && (
					<Debug
						debug          = {debug}
						info           = '<CheckBox> Component - State & Props'
						label          = {label}
						_default-state = {checked ? `checked`: `not checked`}
						isChecked      = {isChecked}
						onChange       = 'toggle state between checked/un-checked'
						checked        = {checked}
						form           = {form || `not provided`}
						id             = {id || string.camelCase(label)}
						name           = {name || `not provided`}
						{...props}
					/>
				)}

			</label>

			{hint && <span className='pure-form-message'>{hint}</span>}
		</>
	)
}

// Add a default prop to make sure that if the `checked` is not provided, we have a default value
Checkbox.defaultProps = {
	checked       : false,
}

Checkbox.propTypes = {
	// Input Props
	checked       : PT.bool,
	className     : PT.string,
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
	// value         : PT.string.isRequired,
}
