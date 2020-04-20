class ArrayDuplicatesSanitizer {

	/**
	 * 
	 * @param {Array} reference 
	 * @param {String} property 
	 */
	constructor(referenceArray, propertyToCheck) {
		this.reference = referenceArray
		this.property = propertyToCheck
	}

	getUniqueItems() {
		const result = []
		this.reference.forEach(i => {
			if (i[this.property]) {
				if (!result.includes(i[this.property])) {
					return result.push(i[this.property])
				}
			}
			
		})
		return result
	}
}

export default ArrayDuplicatesSanitizer
