export const credentialsOptions = {
	credentials: 'include',
	throwHttpErrors: false,
	hooks: {
		afterResponse: [
			async (_request, _options, response) => {
				const data = {
					status: response.status,
					text: await response.text()
				};

				if (data.status === 401 && data.text === 'Session has expired or is invalid!') {
					location.href = `${process.env.VUE_APP_FRONTEND_URL}/login`;
				}
			}
		]
	}
};
