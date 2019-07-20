const env = process.env.NODE_ENV || 'development';

const baseConfig = {
    env,
    isDev: env === 'development',
    isTest: env === 'testing',
    port: 3000,
    MONGODB_URI: 'mongodb://localhost:27017/tsnode',
};

export default baseConfig;
