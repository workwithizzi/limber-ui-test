import { repo, getRepoData } from '../../utils'

// `http://localhost:3000/api/allContentTypes` endpont
export default async(req, res) => {

	/**
 * REFERENCE: https://tinyurl.com/yd8wqkwq
 */

	// Handle requests one by one, resolve a request only when the previous one was resolved.
	function series(items, fn) {
		const result = []
		return items.reduce((acc, item) => {
			acc = acc.then(() => {
				return fn(item).then(res => {
					return result.push(res)
				})
			})
			return acc
		}, Promise.resolve())
			.then(() => result)
	}

	// Handle all the requests in parallel and returns a Promise when all the internal `promises` are resolved.
	function all(items, fn) {
		const promises = items.map(item => fn(item))
		return Promise.all(promises)
	}

	// Split the array of files to be fetched into groups with the items inside a group equal to `chunkSize`.
	// So, if the amount of files to be fetched is 50, and we passed `chunkSize` == 10, it means, this funtion will return an array of 5 chunks with 10 files in each.
	function splitToChunks(items, chunkSize = 50) {
		const result = []
		for (let i = 0; i < items.length; i+= chunkSize) {
			result.push(items.slice(i, i + chunkSize))
		}
		return result
	}
	
	// Handle chunks one by one, and resolve the next one only if the previous chunk was resolved.
	function resolveChunks(items, fn, chunkSize = 50) {
		let result = []
		// Split files to chunks
		const chunks = splitToChunks(items, chunkSize)
		// resolve each chunk one by one
		return series(chunks, async chunk => {
			const res = await all(chunk, fn)
			return result = result.concat(res)
		})
			.then(() => result)
	}

	try {

		// Wrapper function to fetch one file
		const fetchFile = async file => await getRepoData(`/${repoSettings.config_path}/${file.name}`)
		
		// Get project settings from repo and decode
		const repoSettings = await getRepoData(repo.GITHUB_LIMBER_SETTINGS_PATH)

		// GET encoded array of contentTypes files
		const _encodedCtData = await getRepoData(`/${repoSettings.config_path}`)
		const allContentTypesData = await resolveChunks(_encodedCtData, fetchFile, 10)
		console.log(`API calls done`)
		return res.status(200).send({ repoSettings, allContentTypesData })
	} catch (error) {
		console.log(`There was an error with fetching the data.`)
		return res.status(500).send()
	}
}
