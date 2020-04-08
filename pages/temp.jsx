import { Header } from '../components'
import { parseYaml, getRepo, SimpleDebug } from '../utils'
import React, { useState, useEffect } from 'react'


// TODO: Replace w/ 'config_dir' from settings
const replaceThisConst = ``


export default function TempPage({ _data }) {

	console.log(_data)

	return (
		<>
			<Header
				title="TempPage"
				subtitle="This is a testing page"
			/>
			<pre>This is the page content.</pre>
			<SimpleDebug>{_data}</SimpleDebug>
		</>
	)
}


// GET list of files in limber config directory
// and add them to the 'allFiles' array to be used by page component
TempPage.getInitialProps = async() => {
	const _data = await getRepo(`/limber`)
	return { _data }
}
