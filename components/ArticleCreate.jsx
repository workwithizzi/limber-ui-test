// Creates a button/dropdown to create new articles
// based on current CTs & Group of CTs
// - Used on 'articles.jsx' page
//
// TODO: Add ability to take User to 'editor.jsx' based on which CT is selected

import React, { useEffect, useState } from 'react'
import PT from "prop-types"

import '../styles/ArticleCreate.scss'

export function ArticleCreate({ data }) {

	const [contentTypes, setContentTypes] = useState([])

	// Create a `contentTypes` state array with unique CT items in it
	useEffect(() => {
		const contentTypes = []
		if (data.length > 1) {
			data.forEach(i => {
				// check whether the `content_type` is not repeated, as some CT's might be duplicated and have different titles, but they still are same content types
				if (i.data.content_type && !contentTypes.includes(i.data.content_type)) {
					return contentTypes.push(i.data.content_type)
				}
			})
		}
		setContentTypes(contentTypes)
	}, [data])

	return (
		<div className="override pure-menu pure-menu-horizontal">
			<ul className="pure-menu-list">

				{/* If there are a group of CTs, show them in a list */}
				{contentTypes && (contentTypes.length > 1) ? (
					<li className="pure-menu-item pure-menu-has-children pure-menu-allow-hover">
						<a href="#" id="menuLink1" className="pure-menu-link">Add New</a>
						<ul className="pure-menu-children">
							{
								contentTypes.map(contentType => {
									return (
										<li key={contentType} className="pure-menu-item"><a href="#" className="pure-menu-link">{contentType}</a></li>
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

ArticleCreate.propTypes = {
	data: PT.arrayOf(PT.object).isRequired,
}
