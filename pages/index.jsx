import { Header } from '../components'
import { parseYaml, getRepo } from '../utils'



// Demo Arrays
const array1 = {
	name: `fileOne`,
	path: `content/one`,
}
const array2 = {
	path: `content/two`,
	name: `fileTwo`,
}

// TODO: Need to replace this with the 'config_dir from settings
const replaceThisConst = `limber/`

export default function DashboardPage({fileList, props}) {
	const data = []
	async function _parseContentTypes(pram) {
		// Get the data from a content-type's file
		const rawData = await getRepo(`${replaceThisConst}${pram}`)
		// Convert data to yaml, and add to 'data' array
		data.push(parseYaml(rawData))
	}

	// For each file in config directory
	fileList.map(file => {
		_parseContentTypes(file)
	})

	// TODO: The array is printing to the console, but I'm not able to pull an individual key/value from it.
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


// GET "list of files in limber config directory"
DashboardPage.getInitialProps = async() => {
	// Create an array using each config file's name
	const allFiles = await getRepo(replaceThisConst)
	const fileList = []
	allFiles.map(singleFile => {
		fileList.push(singleFile.name)

	})
	return { fileList }
}
