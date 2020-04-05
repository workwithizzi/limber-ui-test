import { repo, request } from '.'

// This data will eventually come from DB
import { fakeMongo } from '../fakeMongo'

export function getRepoSettings() {
	return request({
		url: `/repos/${fakeMongo.GITHUB_REPO_OWNER}/${fakeMongo.GITHUB_REPO}/contents/${repo.GITHUB_LIMBER_SETTINGS_PATH}`,
		method: `GET`,
		auth: {
			username: fakeMongo.GITHUB_AUTH_TOKEN,
		},
	})
}
