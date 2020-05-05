// Creates a button/dropdown to create new articles
// based on current CTs & Group of CTs
// - Used on 'articles.jsx' page
//
// TODO: Add ability to take User to 'editor.jsx' based on which CT is selected

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import PT from "prop-types"

import '../styles/ArticleCreate.scss'

export function ArticleCreate({ data }) {

	const [contentTypes, setContentTypes] = useState([])
	const router = useRouter()
	// Create a `contentTypes` state array with unique CT items in it
	useEffect(() => {
		if (data.length > 1) {
			const _relatedCTConfigDataArray = data.filter(function(i){
				if (router.query.group) {
					return router.query.group === i.group
				} else {
					return router.query.type === i.label
				}
			})

			const contentTypes = _relatedCTConfigDataArray.map(ct => ct.id)
			setContentTypes(contentTypes)
		}
	}, [router.query])

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
					<li className="pure-menu-item pure-menu-selected"><a href="#" className="pure-menu-link" onClick={() => alert(JSON.stringify(contentTypes))}>Add New</a></li>
				)}
			</ul>
		</div>
	)
}

ArticleCreate.propTypes = {
	data: PT.arrayOf(PT.object).isRequired,
}
