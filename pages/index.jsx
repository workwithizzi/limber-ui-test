import { Header } from '../components'
import { repo, request, parseYaml } from '../utils'

// This data will eventually come from DB
import { fakeMongo } from '../fakeMongo'


// TODO: Move this to utils once it's working properly
function _getContentTypeFile(file) {
	return request({
		url: `/repos/${fakeMongo.GITHUB_REPO_OWNER}/${fakeMongo.GITHUB_REPO}/contents/limber/${file}`,
		method: `GET`,
		auth: {
			username: fakeMongo.GITHUB_AUTH_TOKEN,
		},
	})
}


// Demo Arrays
const array1 = {
	name: `fileOne`,
	path: `content/one`,
}
const array2 = {
	path: `content/two`,
	name: `fileTwo`,
}


export default function DashboardPage({fileList}) {
	const data = []
	async function _parseContentTypes(pram) {
		const rawData = await _getContentTypeFile(pram)
		data.push(parseYaml(rawData))
	}

	fileList.map(file => {
		_parseContentTypes(file)
	})
	console.log(data)
	const mapData = data.map(x => x.name)
	console.log(mapData)

	// const arrayData = []
	// arrayData.push(array1)
	// arrayData.push(array2)
	// console.log(arrayData)
	// const mapArrayData = arrayData.map(x => x.name)
	// console.log(mapArrayData)

	return (
		<>
			<Header
				title="Dashboard"
				subtitle="This is a subtitle"
			/>
			<pre>This is where we'll eventually have some shortcuts, and maybe some analytics and other dashboard-type things.</pre>
			{data.map(type => {
				return (
					<p key={type.label}>{type.label}</p>
				)
			})}

		</>
	)
}

//- -----------------------------------------------------------------
//- -----------------------------------------------------------------

// TODO: Move this to utils once it's working properly
function _getAllContentTypeFiles() {
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
	// Create an array with from config filenames
	const allFiles = await _getAllContentTypeFiles()
	const fileList = []
	allFiles.map(singleFile => {
		fileList.push(singleFile.name)

	})
	return { fileList }
}
