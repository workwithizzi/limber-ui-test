// 'GET' data from Github repo. Default gets all files in root.
// Catch errors
// Pass a path param to look at additional file/directory
// Pass a second param ('parse') to decode data from Github

import axios from 'axios'
import { repo, parseYaml } from '.'


// This data will eventually come from MongoDB
import { fakeMongo } from '../fakeMongo'

// Let's just make 'url' object easier to read
const _APIbaseURL = `/repos/${fakeMongo.GITHUB_REPO_OWNER}/${fakeMongo.GITHUB_REPO}/contents`
// const _refBranch = `?ref=${fakeMongo.GITHUB_REPO_BRANCH}`


// Create an Axios Client with defaults
const client = axios.create({
	baseURL: repo.GITHUB_API_URL,
})


export async function getRepoData(path, parse = false) {
	// If no path is chosen, get contents of the root directory
	path = path || ``

	// Use the Github's default branch (master) if no other branch is selected in DB
	let _branch = ``
	if (fakeMongo.GITHUB_REPO_BRANCH != null && fakeMongo.GITHUB_REPO_BRANCH.length > 1) {
		_branch = `?ref=${fakeMongo.GITHUB_REPO_BRANCH}`
	}

	// Handle Success
	// return encoded data or parsed/decoded data
	const onSuccess = function(response) {
		if (parse) {
			return parseYaml(response.data)
		} else {
			return response.data
		}
	}

	// Handle Error
	const onError = function(error) {
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

	// Get the data
	try {
		const response = await client({
			url: `${_APIbaseURL}${path}${_branch}`,
			method: `GET`,
			auth: {
				username: fakeMongo.GITHUB_AUTH_TOKEN,
			},
		})
		return onSuccess(response)
	}
	catch (error) {
		return onError(error)
	}
}


//- -----------------------------------------------------------------
//- -----------------------------------------------------------------
// Non-async version of the above function. Remove if not needed

// export function getRepoData(path, parse = false) {
// 	// If no path is chosen, get contents of the root directory
// 	path = path || ``

// 	// Use the Github's default branch (master) if no other branch is selected in DB
// 	let _branch = ``
// 	if (fakeMongo.GITHUB_REPO_BRANCH != null && fakeMongo.GITHUB_REPO_BRANCH.length > 1) {
// 		_branch = `?ref=${fakeMongo.GITHUB_REPO_BRANCH}`
// 	}

// 	// Handle Success
// 	// return encoded data or parsed/decoded data
// 	const onSuccess = function(response) {
// 		if (parse) {
// 			return parseYaml(response.data)
// 		} else {
// 			return response.data
// 		}
// 	}

// 	// Handle Error
// 	const onError = function(error) {
// 		console.error(`Request Failed:`, error.config)
// 		if (error.response) {
// 			// Request was made but server responded with something
// 			// other than 2xx
// 			console.error(`Status:`,  error.response.status)
// 			console.error(`Data:`,    error.response.data)
// 			console.error(`Headers:`, error.response.headers)
// 		} else {
// 			// Something else happened while setting up the request
// 			// triggered the error
// 			console.error(`Error Message:`, error.message)
// 		}

// 		return Promise.reject(error.response || error.message)
// 	}

// 	// Get the data
// 	return client({
// 		url: `${_APIbaseURL}${path}${_branch}`,
// 		method: `GET`,
// 		auth: {
// 			username: fakeMongo.GITHUB_AUTH_TOKEN,
// 		},
// 	})
// 		.then(onSuccess)
// 		.catch(onError)
// }



//- -----------------------------------------------------------------
//- -----------------------------------------------------------------
// Original function. Remove if not needed

import { request } from '.'


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
