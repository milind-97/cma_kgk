/* eslint-disable camelcase */
const sequelize = require('../db/connection');
const { Sequelize } = require('sequelize');
const pages = sequelize.define(
	'pages',
	{
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			unique: true,
			autoIncrement: true,
		},
		title: {
			type: Sequelize.STRING,
		},
		slug: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true,
			validate: {
				notNull: { args: true, msg: 'slug should not be null' },
			},
		},
		content: {
			type: Sequelize.STRING,
		},
		created_at: Sequelize.DATE,
		updated_at: Sequelize.DATE,
	},
	{
		// timestamps: false
		updatedAt: 'updated_at',
		createdAt: 'created_at',
	}
);
module.exports = pages;
