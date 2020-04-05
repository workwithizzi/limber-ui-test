import jsyaml from 'js-yaml'
import { Layout } from '../components'
import { getSettings } from '../utils'


function _parseYaml(file) {
	const fileContent = file.content
	const fromBase64ToString = window.atob(fileContent)
	return jsyaml.load(fromBase64ToString)
}


export default function DashboardPage({settings}) {
	// const data = _parseYaml(settings)
	// console.log(`Start Data`)
	// console.log(data)
	// console.log(`End Data`)
	return (
		<Layout
			title="Dashboard"
			subtitle="Dashboard is empty"
		>
			{/* <p>{data.site_url}</p> */}
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
