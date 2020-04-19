// Numberfield (<input type="number">) component
// HTML attributes: https://tinyurl.com/y6e5nykx
// Notes:
// - Does not accept children
// - Currently only set up for full-width text inputs

import PT from "prop-types"
import stylePT from "react-style-proptype"

import { debug, string } from "../../utils"


// Disabling this temporarily
export function Numberfield({
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
					form = {form}
					id   = {id || string.camelCase(label)}
					name = {name || string.camelCase(label)}
					type = "number"
					{...props}
				/>

				{/* Debugger */}
				{debug && debug(this)}
			</label>

			{hint && <span className="pure-form-message">{hint}</span>}
		</>
	)
}


Numberfield.propTypes = {
	// Input Props
	className   : PT.string,
	defaultValue: PT.string,
	disabled    : PT.bool,
	form        : PT.string,
	id          : PT.string,
	label       : PT.string.isRequired,
	max         : PT.number,
	min         : PT.number,
	name        : PT.string,
	onChange    : PT.func,
	placeholder : PT.number,
	readOnly    : PT.bool,
	required    : PT.bool,
	step        : PT.number,
	style       : stylePT,
	tabIndex    : PT.number,
	title       : PT.string,
	value       : PT.number,
	// Hint Text Props
	hint        : PT.string,
}
