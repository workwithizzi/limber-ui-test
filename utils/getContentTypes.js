
// Return the names of content-type Group
function groupNames(array) {
	const result = []

	array.map(i => {
		if (i.group && !result.includes(i.group)) {
			return result.push(i.group)
		}
	})

	return result
}

// Return the names of all content-types that aren't in groups
function soloTypesNames(array) {
	const result = []

	array.map(i => {
		if (!i.group && !result.includes(i.label)) {
			return result.push(i.label)
		}
	})

	return result
}


export const getCT = {
	groupNames,
	soloTypesNames,
}
