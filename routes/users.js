/************************************/
/***Import des modules nécessaires***/
const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');

/***************************************/
/***Récupération du routeur d'express***/
let router = express.Router();

/**********************************/
/***Routage de la ressource User***/

router.get('', (req,res) => {
	User.findAll()
		.then( user =>res.json({data:user}))
		.catch(err=>res.status(500).json({message:'Database Error'}))
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
		.catch(err=>res.status(500).json({message:'Database Error'}))
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

			// Hashage du mot de passe utilisateur
			bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUNDS))
				.then(has=>{
					req.body.password = hash

					//Création de l'utilisateur
					User.create(req.body)
					.then(user=> res.json({message: 'User Created', data:user}))
					.catch(err=>err.status(500).json({message:'Database Error'}))

				})
				.catch(err=> res.status(500).json({message : 'Database error'}))
		})
		.catch(err=>err.status(500).json({message:'Database Error'}))
})

router.patch('/:id', (req, res) => {
	let userId = parseInt(req.params.id)

	// Vérification si le champs id est présent et cohérent
	if (!userId){
		return res.status(400).json({message :'Missing parameter'})
	}
	
	//Recherche de l'utilisateur
	User.findOne({where : {id: userId}, raw :true})
		.then(user=>{
			//Vérifier si l'utilisateur existe
			if(user === null){
				return res.status(404).json({message : 'This user does not exist !' })
			}

			//Miuse à jour de l'utilisateur
			User.update(req.body, {where: {id : userId}})
				.then(user => res.json({message:'User updated'}))
				.catch(err=>err.status(500).json({message:'Database Error'}))
		})
	.catch(err=>err.status(500).json({message:'Database Error'}))
})

router.delete('/trash/:id', (req, res)=> {
	let userId = parseInt(req.params.id)

	// Vérification si le champs id est présent et cohérent
	if (!userId){
		return res.status(400).json({message :'Missing parameter'})
	}
	
	// Suppression de l'utilisateur
	User.destroy({where: {id: userId, force: tr}})
		.then (()=> res.status(204).json({}))
		.catch(err=>err.status(500).json({message:'Database Error'}))
	})

router.post('untrash/:id', (req, res)=>{
	let userId = parseInt(req.params.id)

	//Vérification si le champ id est présent et cohérent
	if (!userId){
		return res.status(400).json({message :'Missing parameter'})
	}
	User.restore({where : {id : userId}})
		.then(()=>res.status(204).json({}))
		.catch(err=>err.status(500).json({message:'Database Error'}))
	})

router.delete('/:id', (req, res)=> {
	let userId = parseInt(req.params.id)

	// Vérification si le champs id est présent et cohérent
	if (!userId){
		return res.status(400).json({message :'Missing parameter'})
	}
	
	// Suppression de l'utilisateur
	User.destroy({where: {id: userId, force: true}})
		.then (()=> res.status(204).json({}))
		.catch(err=>err.status(500).json({message:'Database Error'}))
	}) 
module.exports = router