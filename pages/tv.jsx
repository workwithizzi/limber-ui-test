// This was me following a next.js tutorial and using the batman api
// I want to save it for reference for now.

import Link from 'next/link'
import fetch from 'isomorphic-unfetch'

import { Layout } from '../components/Layout'


export default function TvPage({shows}) {
	return (
		<Layout>
			<h1>Batman TV Shows</h1>
			<ul>
				{shows.map(show => (
					<li key={show.id}>
						<Link href="/tv/[id]" as={`/tv/${show.id}`}>
							<a>{show.name}</a>
						</Link>
					</li>
				))}
			</ul>
		</Layout>
	)
}


TvPage.getInitialProps = async function() {
	const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
	const data = await res.json()

	console.log(`Show data fetched. Count: ${data.length}`)

	return {
		shows: data.map(entry => entry.show)
	}
}