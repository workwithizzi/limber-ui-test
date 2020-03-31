// Radio component
// HTML attributes: https://t.ly/yR2b2
// Notes:
//   Does not accept children
//   For Checkbox groups, use the same prop.name

import PT from "prop-types"
import stylePT from "react-style-proptype"

import { camelCase } from "../../utils/strings"


export function Radio({
	label,
	form,
	id,
	name,
	className,
	style,
	hint,
	...props
}) {

	return (
		<>
			<label
				className = "pure-radio"
				form      = {form}
				htmlFor   = {id || camelCase(label)}
			>
				<input
					form  = {form}
					id    = {id || camelCase(label)}
					name  = {name}
					style = {style || {marginRight:"10px"} }
					type  = "radio"
					{...props}
				/>
				{label}
			</label>

			{hint && <span className="pure-form-message">{hint}</span>}
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