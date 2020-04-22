import axios from "axios"
import { repo, getRepoData } from '../../utils'

export default async(req, res) => {

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

	function all(items, fn) {
		const promises = items.map(item => fn(item))
		return Promise.all(promises)
	}

	function splitToChunks(items, chunkSize = 50) {
		const result = []
		for (let i = 0; i < items.length; i+= chunkSize) {
			result.push(items.slice(i, i + chunkSize))
		}
		return result
	}
	
	function chunks(items, fn, chunkSize = 50) {
		let result = []
		const chunks = splitToChunks(items, chunkSize)
		return series(chunks, async chunk => {
			const res = await all(chunk, fn)
			return result = result.concat(res)
		})
			.then(() => result)
	}

	try {
		const fetchFile = file => {
			const url = `/${repoSettings.config_path}/${file.name}`
			return getRepoData(url)
				.then(res => res)
		}
		// Get project settings from repo and decode
		const repoSettings = await getRepoData(repo.GITHUB_LIMBER_SETTINGS_PATH)

		// GET encoded array of contentTypes files
		const _encodedCtData = await getRepoData(`/${repoSettings.config_path}`)
		const allContentTypesData = await chunks(_encodedCtData, fetchFile)
		console.log(`done`)
		return res.status(200).send({ repoSettings, allContentTypesData })
	} catch (error) {
		return res.status(500).send()
	}
}
