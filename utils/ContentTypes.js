
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


	/**
	 * Check if all the required fields are set in each CT
	 * @param {[String]} filds - An array of required fields.
	 * @returns {[Array, Array]} Content Types wich contains the required fields and Content Types which doesn't have the required fields
	 */
	getTypesWithAndWithoutRequiredFields(requiredFields) {

		// An Array that will containt Content Types which have the required fields
		const _ctWithRequiredFields = []

		// An Array that will contain Content Types which doesn't have the required fields
		const _ctWithoutRequiredFields = []


		// Create a copy of the reference array because I am planning to do modifications and those modifications will mutate the original array
		const _referenceCTs = this.reference.map(i => i)


		_referenceCTs.forEach(contentType => {

			// Track the current content type index
			let _contentTypeIndex = 0

			// Check each content type whether it has all the required fields
			// Return Array of the result where content type is checked for each required field
			// e.g. if we checking for 3 required fields (id, path, label), the `_ctForEachRequiredField` will have the structure [{…}, {…}, {…}], where each Object is the same Content Type
			const _ctForEachRequiredField = requiredFields.map(requiredField => {
				if (contentType !== null) {
					// if the CT doesn't have a required field
					if (!Object.prototype.hasOwnProperty.call(contentType, requiredField)) {
						// Check if we can detect a Menu Item
						const menuItemAffected = contentType.group ? contentType.group : contentType.label
						// Check if Menu Item was detected
						if (menuItemAffected === undefined) {
							// Put error message
							_ctWithoutRequiredFields.push({ content_type_location: contentType.filePath, missing_property: requiredField })
							// erase contentType from the array
							contentType = null
						} else {
							_ctWithoutRequiredFields.push({ content_type_location: contentType.filePath, missing_property: requiredField, menu_item: menuItemAffected })
							contentType = null
						}
						return contentType
					} else {
						// if the CT has a required field, do nothing
						return contentType
					}
				}
			})


			// Check the `_ctForEachRequiredField` with the following structure
			// Each Object there identifies the CT where the required field is set, i.e. if the number of required fields is 3, the array will be of length 3 and so on
			// [
			//   {…},
			//   {…},
			//   {…},
			//   ...
			// ]
			// If the above array has instead of Object a `null` or `undefined`, it means that the required field is not set
			
			// `every` checks whether all the items in an array matches to a condition, in this case, it matches whether an item is not `undefined` or `null`.
			// If there will be at least one, undefined, the result will be false
			const hasRequiredField = _ctForEachRequiredField.every(item => {
				return item !== null && item !== undefined
			})

			// if all the required fields in a CT are set, take the first item in `_ctForEachRequiredField` array (because anyway all the items in that array are identical)
			if (hasRequiredField) {
				_ctWithRequiredFields.push(_ctForEachRequiredField[_contentTypeIndex])
			}
			_contentTypeIndex++
		})
		return [_ctWithRequiredFields, _ctWithoutRequiredFields]
	}


	/**
	 * Get unique and duplicated fields on Content Types
	 * @param {String} field - A field to check for duplications.
	 * @returns {[Array, Array]} Unique and Duplicated fields
	 */
	getUniqueAndDuplicatedFields(prop) {
		const _uniqueProps = []
		const _duplicatedProps = []
		this.reference.forEach(ct => {
			if (ct[prop] && !_uniqueProps.includes(ct[prop])) {
				_uniqueProps.push(ct[prop])
			} else {
				_duplicatedProps.push(ct[prop])
			}
		})
		return [_uniqueProps, _duplicatedProps]
	}

}

export { ContentTypes }
