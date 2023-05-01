import merge from 'lodash.merge';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const stage = process.env.STAGE || 'local';

let envConfig;

if (stage === 'production') {
    envConfig = require('./prod').default;
} else if (stage === 'testing') {
    envConfig = require('./testing').default;
} else if (stage === 'staging') {
    envConfig = require('./staging').default;
} else {
    envConfig = require('./local').default;
}

const defaultConfig = {
	stage,
	jwt: process.env.JWT_SECRET,
	dbUrl: process.env.DATABASE_URL,
	port: process.env.PORT,
	logging: false,
}

export default merge(
	defaultConfig,
    envConfig
);