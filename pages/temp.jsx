import { Header } from '../components'
import { parseYaml, getRepo } from '../utils'

// TODO: Replace w/ 'config_dir' from settings
const replaceThisConst = `limber/`


export default function TempPage({ allFiles }) {
	const data = []
	async function _parseContentTypes(fileName) {
		// Get the data from a content-type's file
		const rawData = await getRepo(`${replaceThisConst}${fileName}`)
		// Add decoded data to 'data' array
		data.push(parseYaml(rawData))
	}

	// For each file in config directory
	allFiles.map(file => {
		_parseContentTypes(file.name)
	})

	// console.log(data)

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
TempPage.getInitialProps = async() => {
	// Create an array using each config file's name
	const allFiles = await getRepo(replaceThisConst)
	return { allFiles }
}
