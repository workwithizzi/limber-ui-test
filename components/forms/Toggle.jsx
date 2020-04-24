// Toggle component
// Basically a Checkbox component that outputs a boolean value
// Notes:
// - Does not accept children

import React from 'react'
import PT from 'prop-types'
import stylePT from 'react-style-proptype'
import { Debug } from '../'
import { string } from '../../utils'


export class Toggle extends React.Component {
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
					className = 'toggle__label'
					form      = {form}
					htmlFor   = {id || string.camelCase(label)}
				>
					<div className={this.state.checked ? `toggle isOn` : `toggle`}>
						<input
							defaultChecked = {this.state.checked}
							className = 'toggle__control'
							form      = {form}
							id        = {id || string.camelCase(label)}
							name      = {name}
							onChange  = {this._handleChange}
							type      = 'checkbox'
							value     = {this.state.checked}
							{...props}
						/>
					</div>
					{label}

					{/* Inline styles (will move to .styl before production) */}
					<style jsx>{`
						.toggle__label {
							font-size: 16px;
							font-weight: normal;
							display: flex;
							align-items: center;
						}
						.toggle {
							margin-right: 10px;
							background: #cdd3d5;
							width: 40px;
							height: 24px;
							border-radius: 40px;
							display: inline-block;
							position: relative;
						}
						.toggle.isOn {
							background: #00b0eb;
						}
						.toggle__control {
							appearance: none;
							background: white;
							content: '';
							position: absolute;
							top: 2px;
							left: 2px;
							width: 20px;
							height: 20px;
							border-radius: 20px;
							transition: 0.2s;
							box-shadow: 0 0 2px 0 rgba(10, 10, 10, 0.29);
						}
						.toggle__control:checked {
							left: calc(100% - 2px);
							transform: translateX(-100%);
						}
						.toggle__control:active {
							width: 50px;
						}
						.toggle__control:focus {
							outline: 0;
						}
					`}</style>
				</label>

				{hint && <span className='pure-form-message'>{hint}</span>}


				{debug && (
					<Debug
						debug          = {debug}
						info           = '<CheckBox> Component - State & Props'
						label          = {label}
						// default-state = {checked ? `checked`: `not checked`}
						_default-state = {this.props.checked ? `checked`: `not checked`}
						// isChecked     = {isChecked}
						isChecked      = {this.state.checked}
						onChange       = 'toggle state between checked/un-checked'
						checked        = {checked}
						form           = {form || `not provided`}
						id             = {id || string.camelCase(label)}
						name           = {name || `not provided`}
						type           = 'checkbox'
						{...props}
					/>
				)}

			</>
		)
	}
}


Toggle.propTypes = {
	// Input Props
	checked       : PT.bool,
	className     : PT.string,
	disabled      : PT.bool,
	form          : PT.string,
	id            : PT.string,
	label         : PT.string.isRequired,
	name          : PT.string,
	onChange      : PT.func,
	readOnly      : PT.bool,
	required      : PT.bool,
	style         : stylePT,
	tabIndex      : PT.number,
	value         : PT.string,
	// Hint Text Props
	hint       : PT.string,
}
