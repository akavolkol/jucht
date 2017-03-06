export default {
	dbHost: process.env.MONGODB_URI,
	secret: 'bang',
  environment: process.env.NODE_ENV || 'development',
  webpackServer: 'http://localhost:8080',
  appHost: process.env.APP_HOST || 'http://localhost:9000'
}
