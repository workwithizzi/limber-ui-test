// 'GET' data from Github repo. Default gets all files in root.
// Pass a path prop to look at additional file/directory

import { request } from '.'

// This data will eventually come from DB
import { fakeMongo } from '../fakeMongo'


export function getRepo(path) {
	path = path || ``
	return request({
		url: `/repos/${fakeMongo.GITHUB_REPO_OWNER}/${fakeMongo.GITHUB_REPO}/contents/${path}`,
		method: `GET`,
		auth: {
			username: fakeMongo.GITHUB_AUTH_TOKEN,
		},
	})
}
