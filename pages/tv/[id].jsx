// See 'pages/tv.jsx'

import fetch from 'isomorphic-unfetch'
import { Header } from '../../components'


export default function Post({show}) {
	return (
		<>
			<Header
				title={show.name}
			/>
			<p>{show.summary.replace(/<[/]?[pb]>/g, ``)}</p>
			{show.image ? <img src={show.image.medium} /> : null}
		</>
	)
}

Post.getInitialProps = async function(context) {
	const { id } = context.query
	const res = await fetch(`https://api.tvmaze.com/shows/${id}`)
	const show = await res.json()

	console.log(`Fetched show: ${show.name}`)

	return { show }
}
