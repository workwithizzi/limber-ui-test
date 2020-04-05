import { repo, request } from '.'


export function getRepoSettings() {
	return request({
		url:    `/repos/${repo.GITHUB_REPO_OWNER}/${repo.GITHUB_REPO}/contents/${repo.GITHUB_LIMBER_SETTINGS_PATH}`,
		method: `GET`,
		auth: {
			username: process.env.GITHUB_PRIVATE_TOKEN,
		},
	})
}
