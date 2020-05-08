// Textarea component
// HTML attributes: https://t.ly/lgD2E
// Note: Does not accept children
//
// Example Output
//   <label htmlFor='example'>This is a textarea</label>
//   <textarea id='example' className='pure-input-1' />
//   <span className='pure-form-message'>This is a Hint</span>
//- -----------------------------------------------------------------

import React from 'react'
import PT from 'prop-types'
import stylePT from 'react-style-proptype'
import { Debug } from '../'
import { string } from '../../utils'


export class Textarea extends React.Component {
	static defaultProps = {
		value: ``,
	};

	static propTypes = {
		// Textarea Props
		cols       : PT.number,
		disabled   : PT.bool,
		form       : PT.string,
		id         : PT.string,
		label      : PT.string.isRequired,
		maxLength  : PT.number,
		name       : PT.string, // id is used for name if one isn't provided
		onBlur     : PT.func,
		onChange   : PT.func,
		placeholder: PT.string,
		readOnly   : PT.bool,
		required   : PT.bool,
		rows       : PT.number,
		spellCheck : PT.bool,
		style      : stylePT,
		tabIndex   : PT.number,
		value      : PT.string,
		wrap       : PT.oneOf([`hard`, `soft`]),
		// Hint Text Props
		hint       : PT.string,
		// Debug Prop
		debug      : PT.bool,
	}

	state = {
		value: this.props.value,
	};

	_handleChange = event => {
		this.setState({value: event.target.value})
		// If onChange is passed
		if (this.props.onChange) {
			this.props.onChange()
		}
	}

	render() {
		const { label, form, id, name, hint, debug, ...props} = this.props

		return (
			<>
				<label
					form      = {form}
					htmlFor   = {id || string.camelCase(label)}
				>
					{label}
					<textarea
						className   = 'pure-input-1'
						form        = {form}
						id          = {id || string.camelCase(label)}
						name        = {name || string.camelCase(label)}
						onChange    = {this._handleChange}
						{...props}
					/>
				</label>

				{hint && <span className='pure-form-message'>{hint}</span>}

				{debug && (
					<Debug
						debug    = {debug}
						info     = '<Textarea> Component - Props & State'
						label    = {label}
						// TODO: Figure this out when converting component to function
						// _default-value={this.props.value}
						// _current-value={this.state}
						form     = {form || `not provided`}
						id       = {id || string.camelCase(label)}
						name     = {name || string.camelCase(label)}
						onChange = {this._handleChange}
						{...props}
					/>
				)}
			</>
		)
	}
}
