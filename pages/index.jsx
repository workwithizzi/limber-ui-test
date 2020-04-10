import { Header } from '../components'
import { SimpleDebug } from '../utils'
import React from 'react'


export default function DashboardPage({ allContentTypes }) {


	return (
		<>
			<Header
				title="Dashboard"
				subtitle="This is a subtitle"
			/>
			<pre>This page will eventually have "Dashboardy" things.</pre>
		</>
	)
}
