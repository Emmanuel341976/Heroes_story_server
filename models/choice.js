/************************************/
/***Import des modules nécessaires***/
const {DataTypes} = require('sequelize')
const DB = require('../db.config')

/*******************************/
/***Définition du modèle user***/
const Choice = DB.define('Choice',{
	id:{
		type: DataTypes.INTEGER(10),
		primaryKey: true,
		autoIncrement: true
	},
	choice: {
		type: DataTypes.INTEGER(100),
		allowNull: false,
	},
	choice_text: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
	chapter_id: {
		type: DataTypes.INTEGER(10),
		allowNull: false,
	},
},
{paranoid: true})

module.exports = Choice