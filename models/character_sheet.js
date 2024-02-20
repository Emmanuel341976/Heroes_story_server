/************************************/
/***Import des modules nécessaires***/
const {DataTypes} = require('sequelize')
const DB = require('../db.config')

/*******************************/
/***Définition du modèle user***/
const Character_sheet = DB.define('Character_sheet',{
	id:{
		type: DataTypes.INTEGER(10),
		primaryKey: true,
		autoIncrement: true
	},
	initial_stamina: {
		type: DataTypes.INTEGER(10),
		defaultValue:0,
		allowNull: false,
	},
	stamina_points: {
		type: DataTypes.INTEGER(10),
		defaultValue:0,
		allowNull: false,
	},
	initial_dexterity: {
		type: DataTypes.INTEGER(10),
		defaultValue:0,
		allowNull: false,
	},
	dexterity_points: {
		type: DataTypes.INTEGER(10),
		defaultValue:0,
		allowNull: false,
	},
	initial_PSI: {
		type: DataTypes.INTEGER(10),
		defaultValue:0,
		allowNull: false,
	},
	PSI_points: {
		type: DataTypes.INTEGER(10),
		defaultValue:0,
		allowNull: false,
	},
	gold_coins: {
		type: DataTypes.INTEGER(10),
		defaultValue:0,
		allowNull: false,
	},
	user_id: {
		type: DataTypes.INTEGER(10),
		allowNull: false,
	},
	book_id: {
		type: DataTypes.INTEGER(10),
		allowNull: false,
	},
},
{paranoid: true})

module.exports = Character_sheet