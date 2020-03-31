import { Layout } from '../components/Layout'
import Link from 'next/link'



function PostLink({id}) {
	return (
		<li>
			<Link href="/contents/[id]" as={`/contents/${id}`}>
				<a>{id}</a>
			</Link>
		</li>
	)
}


export default function DashboardPage() {
	return (
		<Layout
			title="Dashboard"
			subtitle="Stuff and things would go here."
		>
			<pre>Dashboard is empty.</pre>

			<ul>
				<PostLink id="hello-nextjs" />
				<PostLink id="learn-nextjs" />
				<PostLink id="deploy-nextjs" />
			</ul>

		</Layout>
	)
}
