import Head from 'next/head'
import { SiteMeta } from './SiteMeta'
import { Menu } from './Menu'


export function Layout({ repoSettings, allContentTypes, children }) {
	return (
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
	)
}
