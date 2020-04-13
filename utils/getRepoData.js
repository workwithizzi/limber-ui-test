// 'GET' data from Github repo. Default gets all files in root.
// Catch errors
// Pass a path param to look at additional file/directory
// Pass a second param ('parse') to decode data from Github

import axios from 'axios'
import { repo, parseYaml, string } from '.'
import { atob } from 'abab'

// This data will eventually come from MongoDB
import { fakeMongo } from '../fakeMongo'

// Let's just make 'url' object easier to read
const _APIbaseURL = `/repos/${fakeMongo.GITHUB_REPO_OWNER}/${fakeMongo.GITHUB_REPO}/contents`
// const _refBranch = `?ref=${fakeMongo.GITHUB_REPO_BRANCH}`


// Create an Axios Client with defaults
const client = axios.create({
	baseURL: repo.GITHUB_API_URL,
})


export async function getRepoData(path, decode) {
	// Get the repo root if there's no path provided
	path = path || ``
	// Remove trailing '/' for the '?ref' at the end for repo branch
	path = string.rtrim(path, `/`)
	decode = decode || false

	// Fallback to Github's default (master) branch if User doesn't
	// provide a branch in their DB settings
	let _branch = ``
	if (fakeMongo.GITHUB_REPO_BRANCH != null && fakeMongo.GITHUB_REPO_BRANCH.length > 1) {
		_branch = `?ref=${fakeMongo.GITHUB_REPO_BRANCH}`
	}


	// Handle Success
	// return encoded/decoded data
	function onSuccess(response) {
		const rawData = response.data

		// Ignore 'decode' param if it's not a file
		if (rawData.type === `file`) {
			const extension = string.extension(rawData.name)
			// Decode yaml and markdown files
			if (decode) {
				if (extension === `yml` || extension === `yaml`) {
					return parseYaml(rawData)

				} else if (extension === `md`) {
					return atob(rawData.content)

				} else {
					// If not yaml or markdown
					return rawData
				}

			} else {
				// If not 'decode'
				return rawData
			}

		// If not a file...
		} else {
			return rawData
		}

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
