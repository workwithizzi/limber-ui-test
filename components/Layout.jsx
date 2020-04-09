import Head from 'next/head'
import { SiteMeta } from './SiteMeta'
import { Menu } from './Menu'
import { Header } from './Header'

// import settings from "../db/limber.yaml"

export function Layout({ repoSettings, children }) {
	return (
		<>
			<Head>
				<SiteMeta />

				<title>Limber UI Test</title>
			</Head>
			<div id="layout">
				<Menu repoSettings={repoSettings} />


				<main id="main">

					<div className="content">
						{children}
					</div>

				</main>
			</div> {/* layout */}

			<script src="/ui.js"></script>

		</>
	)
}
