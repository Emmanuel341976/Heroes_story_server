/************************************/
/***Import des modules nécessaires***/
const {DataTypes} = require('sequelize')
const DB = require('../db.config')

/*******************************/
/***Définition du modèle user***/
const Chapter = DB.define('Chapter',{
	id:{
		type: DataTypes.INTEGER(10),
		primaryKey: true,
		autoIncrement: true
	},
	chapter_number: {
		type: DataTypes.INTEGER(100),
		allowNull: false,
	},
	chapter_text: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
	number_choices: {
		type: DataTypes.INTEGER(10),
		allowNull: false,
	},
	book_id: {
		type: DataTypes.INTEGER(10),
		allowNull: false,
	},
},
{paranoid: true})

module.exports = Chapter