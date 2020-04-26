// 'GET' data from Github repo.
// By default, gets all files in root.
// Catch errors
// Pass a path param to look for specific file/directory
// Pass a second param to tell the function not to decode data from Github
// If getting a directory, it will not try to decode the data

import axios from 'axios'
import { repo, decode, string } from '.'

// This data will eventually come from MongoDB
import { fakeMongo } from '../fakeMongo'

// Let's just make 'url' object easier to read
const _APIbaseURL = `/repos/${fakeMongo.GITHUB_REPO_OWNER}/${fakeMongo.GITHUB_REPO}/contents`
// const _refBranch = `?ref=${fakeMongo.GITHUB_REPO_BRANCH}`


// Create an Axios Client with defaults
const client = axios.create({
	baseURL: repo.GITHUB_API_URL,
})


export async function getRepoData(path, leaveEncoded, signal) {
	// Get the repo root if there's no path provided
	path = path || ``
	// Remove trailing '/' for the '?ref' at the end for repo branch
	path = string.rtrim(path, `/`)

	// Fallback to Github's default (master) branch if User doesn't
	// provide a branch in their DB settings
	let _branch = ``
	if (fakeMongo.GITHUB_REPO_BRANCH != null && fakeMongo.GITHUB_REPO_BRANCH.length > 1) {
		_branch = `?ref=${fakeMongo.GITHUB_REPO_BRANCH}`
	}


	// Handle Success
	// return encoded/decoded data
	function onSuccess(response) {

		// Parse/decode data if it can be decoded
		return decode(response, leaveEncoded)

	}

	// Handle Error
	function onError(error) {
		console.error(`Request Failed:`, error.config)
		if (error.response) {
			// Request was made but server responded with something
			// other than 2xx
			console.error(`Status:`,  error.response.status)
			console.error(`Data:`,    error.response.data)
			console.error(`Headers:`, error.response.headers)
		} else {
			// Something else happened while setting up the request
			// triggered the error
			console.error(`Error Message:`, error.message)
		}

		return Promise.reject(error.response || error.message)
	}

	// NOTE-YG
	// That's OK to use the the only `getRepoData` if you ONLY doing GET requests, and that's OK for now
	// BUT, how would you handle the others PUT, DELETE requests which we will have in the future, keeping in mind the DRY approach? :)

	// Get the data
	
	try {
		const response = await client({
			url: `${_APIbaseURL}${path}${_branch}`,
			method: `GET`,
			auth: {
				username: fakeMongo.GITHUB_AUTH_TOKEN,
			},
			cancelToken: signal ? signal.token : null, // pass signal's cancel token to the request, so it can detect a needed request to cancel on the Component unmount
		})
		return onSuccess(response)
	}
	catch (error) {
		if (axios.isCancel(error)) {
			console.log(`Error: ${error.message}`)
		} else {
			return onError(error)
		}
	}
}


//- ------------------------------------
//- Adding the simple one back in for temporary testing
//- ------------------------------------

// import { request } from '.'

// export function testGetRepo(path) {
// 	// Get the repo root if there's no path provided
// 	path = path || ``
// 	// Remove trailing '/' for the '?ref' at the end for repo branch
// 	path = string.rtrim(path, `/`)

// 	// Use the Github's default branch (master) if no other branch is selected in DB
// 	let _branch = ``
// 	if (fakeMongo.GITHUB_REPO_BRANCH != null && fakeMongo.GITHUB_REPO_BRANCH.length > 1) {
// 		_branch = `?ref=${fakeMongo.GITHUB_REPO_BRANCH}`
// 	}

// 	return request({
// 		url: `${_APIbaseURL}${path}${_branch}`,
// 		method: `GET`,
// 		auth: {
// 			username: fakeMongo.GITHUB_AUTH_TOKEN,
// 		},
// 	})
// }
