// Adds the functionality to create new articles to a group page

import '../styles/ArticleCreate.scss'

export function ArticleCreate({data}) {
	return (
		<div className="override pure-menu pure-menu-horizontal">
			<ul className="pure-menu-list">
				{(data.content_types.length > 1) ? (
					// If there are multiple content-types, show the list
					<li className="pure-menu-item pure-menu-has-children pure-menu-allow-hover">
						<a href="#" id="menuLink1" className="pure-menu-link">Add New</a>
						<ul className="pure-menu-children">
							{data.content_types.map(i => {
								return (
									<li key={i.label} className="pure-menu-item"><a href="#" className="pure-menu-link">{i.label}</a></li>
								)
							})}
						</ul>
					</li>
				):(
					// If there's only one content type, just show the one
					<li className="pure-menu-item pure-menu-selected"><a href="#" className="pure-menu-link">Add New</a></li>
				)}
			</ul>
		</div>
	)
}
