import jsyaml from 'js-yaml'
import { atob } from 'abab'
import { string } from '.'

// Decode yaml files from base64
export function parseYaml(file) {
	if (!file.content) {
		console.warn(`The content was not provided.`)
		return {}
	}
	const fromBase64ToString = atob(file.content)
	return jsyaml.safeLoad(fromBase64ToString)
}

//- -----------------------------------------------------------------

// Decode data from base64 unless you tell it not to (w/ 2nd param)
// *Only decodes individual yaml/md files, everything else will
// *be returned as encoded data.
export function decode(file, leaveEncoded) {
	leaveEncoded = leaveEncoded || false
	const rawData = file.data

	// Don't decode data if chosen or if it's not a file
	if (leaveEncoded || rawData.type !== `file`) {
		return rawData

	} else {
		const extension = string.extension(rawData.name)

		// Decode yaml and markdown files
		if (extension === `yml` || extension === `yaml`) {
			return parseYaml(rawData)

		} else if (extension === `md`) {
			return atob(rawData.content)

		// If not yaml or markdown
		} else {
			return rawData
		}

	}
}
