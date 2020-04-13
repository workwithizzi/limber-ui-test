import { Header } from '../components'
import { SimpleDebug, getRepoData, string} from '../utils'
import React from 'react'

export default function DashboardPage({ data, allContentTypes }) {

	// const testString = ``
	// console.log(testString)
	// console.log(string.rtrim(testString, `/`))

	console.log(data)
	return (
		<>
			<SimpleDebug>{data}</SimpleDebug>
		</>
	)
}


DashboardPage.getInitialProps = async function() {
	// The file path is static here just for testing

	// New function that includes the ability to also parseYaml
	// const data = await getRepoData(`/content/pages/home.md`)

	// getRepo is the original (simpler) GET function
	// I'm just using it to make sure it's not an issue with the other function
	// const data = await getRepoData(`limber.yml`, `decode`)
	const data = await getRepoData(`/content/pages/home.md`, `decode`)
	// const data = await getRepoData(`/content/pages`)
	return {
		data,
	}
}



{/* <Header
				title="Dashboard"
				subtitle="This is a subtitle"
			/>
			<pre>This page will eventually have "Dashboardy" things.</pre> */}
