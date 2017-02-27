export default {
	dbHost: process.env.MONGODB_URI,
	secret: 'bang',
  environment: process.env.NODE_ENV || 'development',
  webpackServer: 'http://localhost:8080'
}
