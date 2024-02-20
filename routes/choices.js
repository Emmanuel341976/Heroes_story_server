/************************************/
/***Import des modules nécessaires***/
const express = require('express');
const Choice = require('../models/choice');

/***************************************/
/***Récupération du routeur d'express***/
let router = express.Router();

/**********************************/
/***Routage de la ressource Choice***/

router.get('', (req,res) => {
	Choice.findAll()
		.then( choice =>res.json({data:choice}))
		.catch(err=>res.status(500).json({message:'Database Error'}))
})

router.get('/:id', (req, res)=>{
	let choiceId = parseInt(req.params.id)

	// Vérification si le champ id est présent et cohérent
	if(!choiceId){
		return res.json(400).json({message:'Missing Parameter'})
	}

	// Récupération du choix
	Choice.findOne({where:{id:choiceId}, raw: true})
		.then(choice =>{
			//Si le chooix n'existe pas
			if((choice === null)){
				return res.status(404).json({message : 'This choice does not exist'})
			}
			// Choix trouvé
			return res.json({data : choice})

		})
		.catch(err=>res.status(500).json({message:'Database Error'}))
})

router.put('', (req, res) =>{
	 const{choice, choice_text, chapter_id} = req.body

	//Validation des données reçues
	if(!choice || !choice_text || !chapter_id){
		return res.status(400).json({message : 'Missing data'})
	}

	Choice.findOne({where : {choice: choice, chapter_id: chapter_id},raw : true})
		.then(choice=>{
			//Vérification si le choix existe déjà
			if(choice !== null){
				return res.status(409).json({message: `The choice ${choice} already exist!`})
			}
					//Création d'un choix
					Choice.create(req.body)
					.then(choice=> res.json({message: 'Choice Created', data:choice}))
					.catch(err=>res.status(500).json({message:'Database Error'}))

		})
		.catch(err=>res.status(500).json({message:'Database Error'}))
})

router.patch('/:id', (req, res) => {
	let choiceId = parseInt(req.params.id)

	// Vérification si le champs id est présent et cohérent
	if (!choiceId){
		return res.status(400).json({message :'Missing parameter'})
	}
	
	//Recherche du choix
	Choice.findOne({where : {id: choiceId}, raw :true})
		.then(choice=>{
			//Vérifier si le choix existe
			if(choice === null){
				return res.status(404).json({message : 'This choice does not exist !' })
			}

			//Miuse à jour du choix
			Choice.update(req.body, {where: {id : choiceId}})
				.then(choice => res.json({message:'Choice updated'}))
				.catch(err=>res.status(500).json({message:'Database Error'}))
		})
	.catch(err=>err.status(500).json({message:'Database Error'}))
})

router.delete('/trash/:id', (req, res)=> {
	let choiceId = parseInt(req.params.id)

	// Vérification si le champs id est présent et cohérent
	if (!choiceId){
		return res.status(400).json({message :'Missing parameter'})
	}
	
	// Suppression du choix
	Choice.destroy({where: {id: choiceId}})
		.then (()=> res.status(204).json({}))
		.catch(err=>res.status(500).json({message:'Database Error'}))
	})

router.post('untrash/:id', (req, res)=>{
	let choiceId = parseInt(req.params.id)

	//Vérification si le champ id est présent et cohérent
	if (!choiceId){
		return res.status(400).json({message :'Missing parameter'})
	}
	Choice.restore({where : {id : choiceId}})
		.then(()=>res.status(204).json({}))
		.catch(err=>res.status(500).json({message:'Database Error'}))
	})

router.delete('/:id', (req, res)=> {
	let choiceId = parseInt(req.params.id)

	// Vérification si le champs id est présent et cohérent
	if (!choiceId){
		return res.status(400).json({message :'Missing parameter'})
	}
	
	// Suppression du choix
	Choice.destroy({where: {id: choiceId}, force: true})
		.then(()=> res.status(204).json({}))
		.catch(err=>res.status(500).json({message:'Database Error'}))
	}) 
module.exports = router