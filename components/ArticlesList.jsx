// Creates a list of articles for a specific content-group

import '../styles/ArticlesList.scss'

export function ArticlesList({data}) {
	return (
		<>
			{(data.articles) ? (
				<>
					<div className="pure-g article-grid-header">
						<span className="pure-u-2-5">Page Title</span>
						<span className="card-meta pure-u-1-5">Content-Type</span>
						<span className="card-meta pure-u-1-5">Status</span>
						<span className="card-meta pure-u-1-5">Date</span>
					</div>

					<ul className="article-grid">
						{data.articles.map(i => {
							return (
								<li key={i.path} className="article-card">
									<a className="pure-g" href={i.path}>
										<span className="card-title pure-u-2-5">{i.title}</span>
										<span className="card-meta pure-u-1-5">{i.content_type}</span>
										<span className="card-meta pure-u-1-5">{i.status}</span>
										<span className="card-meta pure-u-1-5">{i.date}</span>
									</a>
								</li>
							)
						})}
					</ul>
				</>
			):(
				<h2>You haven't added any content yet. Get on it!</h2>
			)}
		</>
	)
}
