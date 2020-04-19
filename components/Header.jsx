// Header component. Brought in each on individual page

export function Header({title, subtitle}) {
	return (
		<div className="override header">
			{title && <h1>{title}</h1>}
			{subtitle && <h2>{subtitle}</h2>}
		</div>
	)
}
