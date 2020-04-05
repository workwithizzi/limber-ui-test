import jsyaml from 'js-yaml'
import { atob } from 'abab'


export function parseYaml(file) {
	const fileContent = file.content
	// const fromBase64ToString = window.atob(fileContent)
	const fromBase64ToString = atob(fileContent)
	return jsyaml.load(fromBase64ToString)
}
