module.exports = {
	database: {
		connectionLimit: 500,
		host: process.env.DATABASE_HOST || 'localhost',
		user: process.env.DATABASE_USER || 'root',
		password: process.env.DATABASE_PASSWORD || 'faztpassword',
		database: process.env.DATABASE_NAME || 'dblinks',
	},
	port: process.env.PORT || 8080,
};
