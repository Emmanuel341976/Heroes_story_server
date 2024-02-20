/************************************/
/***Import des modules nécessaires***/
const {DataTypes} = require('sequelize')
const DB = require('../db.config')

/*******************************/
/***Définition du modèle user***/
const Book = DB.define('Book',{
	id:{
		type: DataTypes.INTEGER(10),
		primaryKey: true,
		autoIncrement: true
	},
	title: {
		type: DataTypes.STRING(100),
		allowNull: false,
		unique: true
	}
},
{paranoid: true})

module.exports = Book