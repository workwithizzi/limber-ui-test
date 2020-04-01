// Checkbox component
// HTML attributes: https://tinyurl.com/yyr9npa6
// Notes:
// - Does not accept children
// - For Checkbox groups, use the same prop.name

import React from "react"
import PT from "prop-types"
import stylePT from "react-style-proptype"

import { debug, camelCase } from "../../utils"


export class Checkbox extends React.Component {
	static defaultProps = {
		checked: false,
	}

	state = {
		checked: this.props.checked,
	}

	_handleChange = () => {
		this.setState({checked: !this.state.checked})
		// If onChange is passed
		if (this.props.onChange) {
			this.props.onChange()
		}
	}

	render() {
		const { checked, label, form, id, name, hint, debug, ...props} = this.props

		return (
			<>
				<label
					className = "pure-checkbox"
					form      = {form}
					htmlFor   = {id || camelCase(label)}
				>
					<input
						defaultChecked = {this.state.checked}
						form     = {form}
						id       = {id || camelCase(label)}
						name     = {name}
						onChange = {this._handleChange}
						type     = "checkbox"
						style    = {{marginRight:"10px"}}
						{...props}
					/>
					{label}

					{/* Debugger */}
					{debug && debug(this)}
				</label>

				{hint && <span className="pure-form-message">{hint}</span>}
			</>
		)
	}
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
