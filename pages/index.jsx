import { Header } from '../components'
import { SimpleDebug, getRepoData, string} from '../utils'
import React from 'react'
import { atob } from 'abab'

export default function DashboardPage({ data, allContentTypes }) {
	console.log(data)
	// console.log(parseYaml(data))
	// const decoded = atob(data.content)
	// console.log(decoded)
	// console.log(decoded.name)
	return (
		<>
			<SimpleDebug>{data}</SimpleDebug>
		</>
	)
}



DashboardPage.getInitialProps = async function() {
	// The file path is static here just for testing
	const data = await getRepoData(`/content/pages/home.md`)
	return {
		data,
	}
}



{/* <Header
				title="Dashboard"
				subtitle="This is a subtitle"
			/>
			<pre>This page will eventually have "Dashboardy" things.</pre> */}
