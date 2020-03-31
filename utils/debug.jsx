// Basic debug function
// Can be used in a Component to print props to the screen

import React from "react";


// TODO: Find out if there's a way to also use this same component for stateless components
// TODO: Find out if there's a way to include default props/states


const debug = (ctx) => {
	return (
		<pre style={{background:"#333", color:"white"}}>
			<strong style={{color:"#cc0066"}}>Props </strong>
			{JSON.stringify(ctx.props, null, 2)}
			<br />
			<strong style={{color:"#2be8ff"}}>State </strong>
			{JSON.stringify(ctx.state, null, 2)}
		</pre>
	)
}

export { debug }



// import { debug } from "content-designer/utils";

export function withDebug(WrappedComponent) {
	// And return a new anonymous component
	// eslint-disable-next-line react/prefer-stateless-function
	const functionToClass = class extends React.Component {
		render() {
			return (
				<>
					<WrappedComponent {...this.props} />
					{debug(this)}
				</>
			);
		}
	};

	return functionToClass;
}


//* --------------------------
//* Example Usage
//* --------------------------
// Set up your component from the file that's using it
// const RadioWithDebug = withDebug(Radio);
//
// Use the component with the new name and props like normal
//
//   <RadioWithDebug
//     label="Test Radio"
//     value="radioTest"
//   />
