import Head from 'next/head'
import { SiteMeta } from './SiteMeta'
import { Menu } from './Menu'


export function Layout({ title, subtitle, children, settings }) {
	return (
		<>
			<Head>
				<SiteMeta />

				<title>UI Test {title && `| `+title} </title>
			</Head>
			<div id="layout">
				<Menu settings={settings} />


				<main id="main">

					<div className="override header">
						{title && <h1>{title}</h1>}
						{subtitle && <h2>{subtitle}</h2>}
					</div>

					<div className="content">
						{children}
					</div>

				</main>
			</div> {/* layout */}

			<script src="/ui.js"></script>

		</>
	)
}
