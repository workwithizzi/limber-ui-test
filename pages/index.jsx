// App Dashboard Page

import { Header } from '../components'
// import { SimpleDebug, getRepoData, string} from '../utils'


export default function DashboardPage(props) {
	// const { repoSettings, allContentTypes } = props

	return (
		<>

			<Header
				title="Dashboard"
				subtitle="This is a subtitle"
			/>

			<p>
				This page is just a placeholder for now, but at some point in the future,
				this page will eventually have "Dashboard" things. Like:
				Google Analytics, Charts, Shortcuts, or Recent Activity.
			</p>

		</>
	)
}
