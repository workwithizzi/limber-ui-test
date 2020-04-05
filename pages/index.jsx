import { Layout } from '../components'
import { getSettings, parseYaml } from '../utils'


export default function DashboardPage({settings}) {
	const data = parseYaml(settings)
	console.log(data)
	return (
		<Layout
			title="Dashboard"
			subtitle="Dashboard is empty"
			settings={data}
		>
		</Layout>
	)
}



// GET "limber/settings.yml" file
DashboardPage.getInitialProps = async() => {
	const response = await getSettings({
		auth: {
			username: process.env.GITHUB_PRIVATE_TOKEN,
		},
	})
	return { settings: response }
}
