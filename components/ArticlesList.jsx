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
										TODO: it is needed to add `path` to the CT md file (frontmatter part),
										as we have to do a request based on the path and handle further navigation to the needed individual CT.
										Currently, the href is set to `1` for everything.
									*/}
									<a className="pure-g" href={`1`}>
										{/* TODO: make sure that CT frontmatter has title, i.e. make `title` compulsory property for a single `article` CT file */}
										<span className="card-title pure-u-2-5">{i.data.title}</span>
										{/* TODO: make sure that the `content-type` prop at frontmatter is written as `content_type`, because, `content-type` is not a valid property on an Object and is compulsory */}
										<span className="card-meta pure-u-1-5">{i.data.content_type}</span>
										{/* TODO: make sure that CT frontmatter has status, i.e. make `status` compulsory property for a single `article` CT file */}
										<span className="card-meta pure-u-1-5">{i.data.status}</span>
										<span className="card-meta pure-u-1-5">{i.data.date ? moment(i.data.date).format(`LL`) : `No date`}</span>
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

ArticlesList.PT = {
	data: PT.arrayOf(PT.object).isRequired,
}
