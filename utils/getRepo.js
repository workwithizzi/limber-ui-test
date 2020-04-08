// 'GET' data from Github repo. Default gets all files in root.
// Pass a path prop to look at additional file/directory

import { request } from '.'

// This data will eventually come from MongoDB
import { fakeMongo } from '../fakeMongo'

// Let's just make 'url' object easier to read
const _APIbaseURL = `/repos/${fakeMongo.GITHUB_REPO_OWNER}/${fakeMongo.GITHUB_REPO}/contents`
// const _refBranch = `?ref=${fakeMongo.GITHUB_REPO_BRANCH}`


export function getRepo(path) {
	// If no path is chosen, get contents of the root directory
	path = path || ``

	// Use the Github's default branch (master) if no other branch is selected in DB
	let _branch = ``
	if (fakeMongo.GITHUB_REPO_BRANCH != null && fakeMongo.GITHUB_REPO_BRANCH.length > 1) {
		_branch = `?ref=${fakeMongo.GITHUB_REPO_BRANCH}`
	}

	return request({
		url: `${_APIbaseURL}${path}${_branch}`,
		method: `GET`,
		auth: {
			username: fakeMongo.GITHUB_AUTH_TOKEN,
		},
	})
}
