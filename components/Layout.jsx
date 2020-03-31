import Head from 'next/head'

import { Menu } from './Menu'


export function Layout({ title, subtitle, children }) {
	return (
		<>
			<Head>
				<meta charset="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />

				<link rel="stylesheet" href="https://unpkg.com/purecss@1.0.1/build/pure-min.css" integrity="sha384-oAOxQR6DkCoMliIh8yFnu25d7Eq/PHS21PClpwjOTeU2jRSq11vu66rf90/cZr47" crossorigin="anonymous" />
				<link rel="stylesheet" href="/side-menu.css"></link>

				<title>UI Test {title && "| "+title} </title>
			</Head>

			<div id="layout">
				<Menu />


				<main id="main">

					<div className="header">
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