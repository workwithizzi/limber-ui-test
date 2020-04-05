import { repo, request } from '../utils'


export function getSettings({ auth }) {
	return request({
		url:    `/repos/${repo.GITHUB_REPO_OWNER}/${repo.GITHUB_REPO}/contents/${repo.GITHUB_LIMBER_SETTINGS_PATH}`,
		method: `GET`,
		data: {
			auth,
		},
	})
}
