module.exports = {
	name: `posts`,
	label: `Posts`,
	description: `Description of the content-type. Displayed below the title when viewing the types page.`,
	group: `Posts`,
	path: `data/content/posts`,
	create: `true`,
	delete: `true`,
	repeat: `true`,

	fields: [{
		label: `Title`,
		name: `title`,
		widget: `string`,
		required: `true`,
	}, {
		label: `Slug`,
		name: `slug`,
		widget: `string`,
		required: `true`,
	}],
}
