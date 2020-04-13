import { Header } from '../components'
import { SimpleDebug, getRepoData, string} from '../utils'
import React from 'react'
import { parseYaml } from '.'
import { atob } from 'abab'

export default function DashboardPage({ data, allContentTypes }) {

	return (
		<>
			<SimpleDebug>{data}</SimpleDebug>
		</>
	)
}

import { testGetRepo } from '../utils/getRepoData'


DashboardPage.getInitialProps = async function() {
	// The file path is static here just for testing

	// New function that includes the ability to also parseYaml
	// const data = await getRepoData(`/content/pages/home.md`)

	// getRepo is the original (simpler) GET function
	// I'm just using it to make sure it's not an issue with the other function
	const data = await getRepoData(`limber.yml`, `decode`)
	// const data = await getRepoData(`/content/package.json`)
	// const data = await getRepoData(`/content/pages`)

	// const data = await testGetRepo(`/package.json`)
	return {
		data,
	}
}



{/* <Header
				title="Dashboard"
				subtitle="This is a subtitle"
			/>
			<pre>This page will eventually have "Dashboardy" things.</pre> */}
