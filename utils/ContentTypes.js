/**
 * Class that unites the methods for Sanitization of the content types data.
 * Identical to the `getContentTypes.js`, but better structured.
 */

class ContentTypes {
	/**
	 * @param {Array} referenceArray - a reference content types array which needs to be edited
	 */
	constructor(referenceArray) {
		this.reference = referenceArray
	}

	// Return a list of CTs in a Group
	getGroupNames() {
		const result = []
		this.reference.forEach(i => {
			if (i.group && !result.includes(i.group)) {
				return result.push(i.group)
			}
		})
		return result
	}

	// Return a list of ALL Cts that aren't in groups
	getSoloTypesNames() {
		const result = []
		this.reference.forEach(i => {
			if (!i.group && !result.includes(i.label)) {
				return result.push(i.label)
			}
		})
		return result
	}

	// Returns a list of only the content directories ('path') from the config array
	getPaths() {
		const result = []
		// CHANGED `map` to `forEach`, as `forEach` doesn't return anything after the execution.
		this.reference.forEach(i => {
			if (i.path && !result.includes(i.path)) {
				return result.push(i.path)
			// eg: ["content/posts"]
			}
		})
		return result
	}

}

export { ContentTypes }
