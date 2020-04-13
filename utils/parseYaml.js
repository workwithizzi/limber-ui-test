import jsyaml from 'js-yaml'
import { atob } from 'abab'

// Original way that I was parsing
// export function parseYaml(file) {
// 	const fromBase64ToString = atob(file.content)
// 	return jsyaml.load(fromBase64ToString)
// }


// export function parseYaml(file) {
// 	if (!file.content) {
// 		console.warn(`The content wasn't provided.`)
// 		return {}
// 	}
// 	const buff = Buffer.from(file.content, `base64`)
// 	const fromBase64ToString = buff.toString(`ascii`)
// 	return jsyaml.safeLoad(fromBase64ToString)
// }


export function parseYaml(file) {
	if (!file.content) {
		console.warn(`The content was not provided.`)
		return {}
	}
	const fromBase64ToString = atob(file.content)
	return jsyaml.safeLoad(fromBase64ToString)
}
