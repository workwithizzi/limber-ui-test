// Creates a list of articles for a CT or Group of CTs
// Used on `articles.jsx`

import moment from 'moment'
import PT from 'prop-types'

import '../styles/ArticlesList.scss'

export function ArticlesList({ data }) {
	let key = Math.random(100) + 1

	return (
		<>
			{data ? (
				<>
					<div className="pure-g article-grid-header">
						<span className="pure-u-2-5">Page Title</span>
						<span className="card-meta pure-u-1-5">Content-Type</span>
						<span className="card-meta pure-u-1-5">Status</span>
						<span className="card-meta pure-u-1-5">Date</span>
					</div>

					<ul className="article-grid">
						{data.map(i => {
							key++
							return (
								<li key={key} className="article-card">
									{/*
										TODO: add `path` to `data` prop,
										as we have to do a request based on the path and handle further navigation to the needed individual CT.
										Currently, the href is set to `#` for everything.
									*/}
									<a className="pure-g" href={`#`}>
										<span className="card-title pure-u-2-5">{i.data.title ? i.data.title : i.data.name}</span>
										<span className="card-meta pure-u-1-5">{i.data.content_type ? i.data.content_type : `Not set`}</span>
										<span className="card-meta pure-u-1-5">{i.data.status ? i.data.status : `Not set`}</span>
										<span className="card-meta pure-u-1-5">{i.data.date ? moment(i.data.date).format(`LL`) : `No date set`}</span>
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

ArticlesList.propTypes = {
	data: PT.arrayOf(PT.object).isRequired,
}
