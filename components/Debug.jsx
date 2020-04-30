// Basic debug function
// Can be used in a Component to print props to the screen

import React from "react"

// TODO: Add better documentation for the component

function _countProps(obj) {
	let result = 0
	for(const prop in obj) {
		if (Object.prototype.hasOwnProperty.call(obj, prop)) {
			result++
		}
	}
	return result
}


// Prints all relevant data about a component to the screen
// - To only print info to console, use: debugType="log"
// - To only print info to the DOM, use: debugType="print"

export function Debug({debug, info, children, ...props}) {
	// If 'debug' is passed as a boolean, then log AND print data
	const logInfo = debug !== `print`
	const printInfo = debug !== `log`

	const logTitle = info ? `-- Debug: ${info} --` : `-- Debug --`
	// Check whether `props` were passed into the component
	const arePropsEmpty = Object.keys(props).length === 0 && props.constructor === Object

	logInfo && (
		console.log(logTitle),
		children && console.log(children),
		// props are coming into the `Debug` component as an object, so it is needed to check whether the Object is empty or not,
		// as otherwise the check `props ? props : `No Props.` will result `true` as even if there're no properties passed into the debug, the `props` is an empty Object.
		console.log(arePropsEmpty ? `No Props.` : props)
	)

	// Make sure there are properties (from spread)
	const hasProps = _countProps(props) > 0

	return (
		printInfo && (
			<>
				<pre style={{ background:`#333`, color:`white`, maring:`20px`, padding:`20px` }}>
					<strong style={{color:`#cc0066`}}>Debug: {info}</strong>

					{children && (
						<span style={{color:`#2be8ff`}}>
							<br />
							Children:
							{JSON.stringify(children, null, 2)}
						</span>
					)}

					{hasProps && (
						<span style={{color:`#2be8ff`}}>
							<br />
							Props:
							{JSON.stringify(props, null, 2)}
						</span>
					)}

				</pre>
			</>
		)
	)
}
