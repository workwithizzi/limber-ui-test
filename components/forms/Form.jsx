// Form Component
// Used to wrap form elements so that we don't have to remember
// the appropriate classnames for styling
// Props:
//   title - creates a <legend> for the form
//   children
//   props - all other props are passed as attributes into <form>
//- -----------------------------------------------------------------


export function Form({
	title,
	children,
	...props
}) {
	return (
		<form className="pure-form pure-form-stacked" {...props}>
			<fieldset>
				{title && <legend>{title}</legend>}
				{children}
			</fieldset>
		</form>
	)
}
