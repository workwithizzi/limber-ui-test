import { Header } from '../components'
import { repo, request, parseYaml } from '../utils'


// TODO: Take the array from 'files' and map them with a request so that each file is parsed.


export default function DashboardPage({files}) {
	// console.log(data)
	// data.map(type => {

	// 	console.log(type.name)
	// })
	return (
		<>
			<Header
				title="Dashboard"
				subtitle="This is a subtitle"
			/>
			<pre>This is where we'll eventually have some shortcuts, and maybe some analytics and other dashboard-type things.</pre>

		</>
	)
}


// This data will eventually come from DB
import { fakeMongo } from '../fakeMongo'



function _getContentTypes() {
	return request({
		url: `/repos/${fakeMongo.GITHUB_REPO_OWNER}/${fakeMongo.GITHUB_REPO}/contents/limber/`,
		method: `GET`,
		auth: {
			username: fakeMongo.GITHUB_AUTH_TOKEN,
		},
	})
}



// GET "list of files in limber config directory"
DashboardPage.getInitialProps = async() => {
	const response = await _getContentTypes()

	const files = []
	response.map(type => {
		files.push(type.name)
		// console.log(type.name)
	})
	// console.log(files)
	return { files }
}
