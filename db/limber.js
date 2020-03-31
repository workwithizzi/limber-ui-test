module.exports = {
	// Required Settings
	site_url: `example.com`,

	// Optional Settings
	config_path: `limber`,
	status: `published`,
	site_title: `Example Web Site`,
	groups: [{
		label: `Pages`,
		path: `pages`,
		description: `Description of the group. Displayed on the Group page in the UI.`
		}, {
		label: `Posts`,
		path: `posts`
		}, {
		label: `Globals`,
		path: `globals`
	}],

	// Custom settings added by user
	custom: [{
		name: `favicon`,
		label: `Site Favicon`,
		type: `string`,
		default: `images/favicon.png`
	}]

}
