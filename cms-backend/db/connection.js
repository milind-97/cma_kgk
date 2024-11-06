/* eslint-disable n/handle-callback-err */
const dotenv = require('dotenv');
dotenv.config();
const Sequelize = require('sequelize');
const sequelize = new Sequelize(
	process.env.db_name,
	process.env.db_user,
	process.env.db_password,
	{
		host: process.env.db_host,
		port: process.env.db_port,
		dialect: 'postgres',
		dialectOptions: {
			supportBigNumbers: true,
			multipleStatements: true,
			logging: true,
		},
		// logging: true,
		pool: {
			max: 10,
			min: 0,
			acquire: 800000,
			idle: 10000,
		},
	}
);
sequelize
	.authenticate()
	.then(function (err) {
		console.log('DB Connection has been established successfully');
	})
	.catch((err) => {
		console.log('There is connection in ERROR', err);
	});

	sequelize.sync({force: false, alter: true })
module.exports = sequelize;
