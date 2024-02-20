/************************************/
/***Import des modules nécessaires***/
const {DataTypes} = require('sequelize')
const DB = require('../db.config')

/*******************************/
/***Définition du modèle user***/
const User = DB.define('User',{
	id:{
		type: DataTypes.INTEGER(10),
		primaryKey: true,
		autoIncrement: true
	},
	player_name: {
		type: DataTypes.STRING(100),
		allowNull: false,
		unique: true
	},
	email:{
		type: DataTypes.STRING,
		unique: true,
		validate:{
			isEmail: true
		}
	},
	password:{
		type: DataTypes.STRING(64),
		is: /^[0-9a-f]{64}$/i
	},
	is_admin:{
		type: DataTypes.BOOLEAN,
		defaultValue: false
	},
	book_id:{
		type: DataTypes.INTEGER(10),
	},
	chapter_id:{
		type: DataTypes.INTEGER(10),
	}
},
{paranoid: true})

module.exports = User
