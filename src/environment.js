const ENV = {
	dev: {
		API: 'https://api.pokemontcg.io',
		API_VERSION: 'v1',
	},
	staging: {
		API: 'https://api.pokemontcg.io',
		API_VERSION: 'v1',
	},
	prod: {
		API: 'https://api.pokemontcg.io',
		API_VERSION: 'v1',
	}
};

const getEnv = (env = process.env.REACT_APP_ENV || process.env.NODE_ENV) => {
	if (env === 'staging') {
		return ENV.staging;
	} else if (env === 'production') {
		return ENV.prod;
	}

	// development
	return ENV.dev;
};

export default getEnv;
