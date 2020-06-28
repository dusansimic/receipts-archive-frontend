// Handles error in case of an invalid or expired session
const handleInvalidSession = async (_request, _options, response) => {
	if (response.status >= 400) {
		const data = {
			status: response.status,
			json: await response.json(),
		};

		if (data.status === 401 && data.json.message === 'session has expired or is invalid') {
			location.href = `${process.env.VUE_APP_FRONTEND_URL}/login`;
		}
	}
};

export const prefixApiOptions = {
	prefixUrl: '/api',
};

export const credentialsOptions = {
	credentials: 'include',
	throwHttpErrors: false,
	hooks: {
		afterResponse: [handleInvalidSession],
	},
};
