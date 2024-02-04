/************************************/
/***Import des modules nécessaires***/
const express = require('express');

const User = require('../models/user');


/***************************************/
/***Récupération du routeur d'express***/
let router = express.Router();



/**********************************/
/***Routage de la ressource User***/

router.get('', (req,res) => {
	User.findAll()
		.then( user =>res.json({data:user}))
		.catch(err=>res.status(500).json({message:'Database Error', error: err}))
})

router.get('/:id', (req, res)=>{
	let userId = parseInt(req.params.id)

	// Vérification si le champ id est présent et cohérent
	if(!userId){
		return res.json(400).json({message:'Missing Parameter'})
	}

	// Récupération de l'utilisateur
	User.findOne({where:{id:userId}, raw: true})
		.then(user =>{
			//Si l'utilisateur n'existe pas
			if((user === null)){
				return res.status(404).json({message : 'This user does not exist'})
			}
			// Utilisateur trouvé
			return res.json({data : user})

		})
		.catch(err=>res.status(500).json({message:'Database Error', error: err}))
})

router.put('', (req, res) =>{
	 const{player_name, email, password} = req.body

	//Validation des données reçues
	if(!player_name || !email || !password){
		return res.status(400).json({message : 'Missing data'})
	}

	User.findOne({where : {email: email},raw : true})
		.then(user=>{
			//Vérification si l'utilisateur existe déjà
			if(user !== null){
				return res.status(409).json({message: `The user ${player_name} already exist!`})
			}

			User.create(req.body)
				.then(user=> res.json({message: 'User Created', data:user}))
				.catch(err=>err.status(500).json({message:'Database Error', error: err}))
		})
		.catch(err=>err.status(500).json({message:'Database Error', error: err}))
})

router.patch('/:id')

router.delete('/:id')
