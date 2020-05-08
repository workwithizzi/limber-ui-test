import React from 'react'
import Head from 'next/head'
import PT from 'prop-types'
import { SiteMeta } from './SiteMeta'
import { Menu } from './Menu'


export const Layout = ({ repoSettings, allContentTypes, children }) =>
	<>
		<Head>
			<SiteMeta />

			<title>Limber</title>
		</Head>
		<div id="layout">
			<Menu
				repoSettings={repoSettings} // not currently used
				allContentTypes={allContentTypes} // Used to create menu
			/>

			<main id="main">

				<div className="content">
					{children}
				</div>

			</main>
		</div> {/* layout */}

		{/* For purecss */}
		<script src="/ui.js"></script>

	</>

Layout.propTypes = {
	allContentTypes: PT.arrayOf(PT.object).isRequired,
	children       : PT.node.isRequired,
	repoSettings   : PT.oneOfType([PT.object, PT.array]),
}
