/************************************/
/***Import des modules nécessaires***/
const {DataTypes} = require('sequelize')
const DB = require('../db.config')

/*******************************/
/***Définition du modèle user***/
const Inventory = DB.define('Inventory',{
	id:{
		type: DataTypes.INTEGER(10),
		primaryKey: true,
		autoIncrement: true
	},
	object_name: {
		type: DataTypes.STRING(100),
		allowNull: false,
	},
	object_description: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
	character_sheet_id:{
		type: DataTypes.INTEGER(10),
		allowNull: false
	}
},
{paranoid: true})

module.exports = Inventory
