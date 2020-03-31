// See 'pages/tv.jsx'

import fetch from 'isomorphic-unfetch'

import { Layout } from '../../components/Layout'


export default function Post({show}) {
	return (
		<Layout>
			<h1>{show.name}</h1>
			<p>{show.summary.replace(/<[/]?[pb]>/g, '')}</p>
			{show.image ? <img src={show.image.medium} /> : null}
		</Layout>
	)
}

Post.getInitialProps = async function(context) {
	const { id } = context.query
	const res = await fetch(`https://api.tvmaze.com/shows/${id}`)
	const show = await res.json()

	console.log(`Fetched show: ${show.name}`)

	return { show }
}