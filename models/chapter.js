/************************************/
/***Import des modules nécessaires***/
const {DataTypes} = require('sequelize')
const DB = require('../db.config')

/*******************************/
/***Définition du modèle user***/
const Chapter = DB.define(Chapter,{
	id:{
		type: DataTypes.INTEGER(10),
		primaryKey: true,
		autoIncrement: true
	},
	chapter_number: {
		type: DataTypes.INTEGER(100),
		defaultValue:'',
		allowNull: false,
	},
	chapter_text: {
		type: DataTypes.TEXT,
		defaultValue:'',
		allowNull: false,
	},
	number_choices: {
		type: DataTypes.INTEGER(10),
		defaultValue:'',
		allowNull: false,
	},
	book_id: {
		type: DataTypes.INTEGER(10),
		defaultValue:'',
		allowNull: false,
	},
},
{paranoid: true})

module.exports = Chapter