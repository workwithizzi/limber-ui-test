// Basic debug function
// Can be used in a Component to print props to the screen

import React from "react"

// TODO: Replace SimpleDebug, withDebug(), and debug() with the <Debug> component
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
	logInfo && (
		console.log(logTitle),
		children && console.log(children),
		console.log(props ? props : `No Props.`)
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


//- -----------------------------------------------------------------

// export function SimpleDebug({log, children, label}) {
// 	if (log) {
// 		console.log(`-Debug Log-`)
// 		console.log(children)
// 	}
// 	return (
// 		<pre style={{background:`#333`, color:`white`, maring:`20px`, padding:`20px`}}>
// 			<strong style={{color:`#cc0066`}}>Debug: {label}</strong>
// 			<br />
// 			<span style={{color:`#2be8ff`}}>
// 				{JSON.stringify(children, null, 2)}
// 			</span>
// 		</pre>
// 	)
// }


// Original Function from first version of Limber
// export function debug(ctx) {
// 	return (
// 		<pre style={{background:`#333`, color:`white`}}>
// 			<strong style={{color:`#cc0066`}}>Props </strong>
// 			{JSON.stringify(ctx.props, null, 2)}
// 			<br />
// 			<strong style={{color:`#2be8ff`}}>State </strong>
// 			{JSON.stringify(ctx.state, null, 2)}
// 		</pre>
// 	)
// }


// Original Function from first version of Limber
// export function withDebug(WrappedComponent) {
// 	// And return a new anonymous component
// 	// eslint-disable-next-line react/prefer-stateless-function
// 	const functionToClass = class extends React.Component {
// 		render() {
// 			return (
// 				<>
// 					<WrappedComponent {...this.props} />
// 					{debug(this)}
// 				</>
// 			)
// 		}
// 	}

// 	return functionToClass
// }
