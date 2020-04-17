import { Header } from '../components'
import { SimpleDebug, getRepoData, string} from '../utils'
import React from 'react'
import { atob } from 'abab'
import matter from 'gray-matter'


export default function DashboardPage({ data, allContentTypes }) {
	const page = {}

	// console.log(data)
	const file = matter(data)
	page[`content`] = file.content
	page[`data`] = file.data
	console.log(page)

	return (
		<>
			<h1>{page.data.title}</h1>
			<pre>{page.data.status}</pre>
			{/* <pre>{temp.content}</pre> */}
			<SimpleDebug label="page">{page}</SimpleDebug>
			{/* <SimpleDebug label="temp.data">{file.data}</SimpleDebug> */}
			{/* <SimpleDebug label="temp.content">{file.content}</SimpleDebug> */}
			{/* <SimpleDebug label="temp.data">{file}</SimpleDebug> */}
			{/* {temp.content} */}
			{/* <div>{data}</div> */}
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
