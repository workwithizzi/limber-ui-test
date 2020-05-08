
// Return a list of CTs in a Group
function groupNames(allCTDataArray) {
	const result = []

	allCTDataArray.forEach(i => {
		if (i.group && !result.includes(i.group)) {
			return result.push(i.group)
		}
	})

	return result
}

// Return a list of ALL Cts that aren't in groups
function soloTypesNames(allCTDataArray) {
	const result = []

	allCTDataArray.forEach(i => {
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
