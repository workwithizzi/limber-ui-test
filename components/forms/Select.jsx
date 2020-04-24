// Select component
// HTML attributes: https://t.ly/yR2b2
// Notes:
//   <options> can be added as children or as an array on the 'options' attribute
// TODO: Test actually saving data from this
// TODO: See if there's a way to use list array in addition to regular object array


import PT from 'prop-types'
import stylePT from 'react-style-proptype'
import { Debug } from '../'
import { string } from '../../utils'


export function Select({
	label,
	form,
	id,
	name,
	options,
	children,
	hint,
	debug,
	...props
}) {

	return (
		<>
			<label
				form      = {form}
				htmlFor   = {id || string.camelCase(label)}
			>
				{label}

				<select
					form  = {form}
					id    = {id || string.camelCase(label)}
					name  = {name}
					type  = 'radio'
					{...props}
				>
					{children}

					{options && (
						options.map(op => {
							return (
								<option key={op.value} value={op.value}>{op.label}</option>
							)
						})
					)}
				</select>

			</label>

			{hint && <span className='pure-form-message'>{hint}</span>}

			{debug && (
				<Debug
					debug   = {debug}
					info    = '<Select> Component - Props'
					label   = {label}
					form    = {form || `not provided`}
					id      = {id || string.camelCase(label)}
					name    = {name || `not provided`}
					options = {options || `not provided`}
					{...props}
				/>
			)}
		</>
	)
}

Select.propTypes = {
	// Input Props
	checked       : PT.bool,
	disabled      : PT.bool,
	form          : PT.string,
	id            : PT.string,
	label         : PT.string.isRequired,
	name          : PT.string,
	onBlur        : PT.func,
	onChange      : PT.func,
	// onChange      : PT.func.isRequired,
	readOnly      : PT.bool,
	required      : PT.bool,
	style         : stylePT,
	tabIndex      : PT.number,
	value         : PT.string,
	// value         : PT.string.isRequired,
	// Hint Text Props
	hint          : PT.string,
}
