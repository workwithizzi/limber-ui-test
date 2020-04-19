// Creates a button/dropdown to create new articles
// based on current CTs & Group of CTs
// - Used on 'articles.jsx' page
//
// TODO: Add ability to take User to 'editor.jsx' based on which CT is selected

import '../styles/ArticleCreate.scss'

export function ArticleCreate({data}) {
	return (
		<div className="override pure-menu pure-menu-horizontal">
			<ul className="pure-menu-list">

				{/* If there are a group of CTs, show them in a list */}
				{(data.content_types.length > 1) ? (
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

				// If there's only one CT, just show the one
				):(
					<li className="pure-menu-item pure-menu-selected"><a href="#" className="pure-menu-link">Add New</a></li>
				)}
			</ul>
		</div>
	)
}
