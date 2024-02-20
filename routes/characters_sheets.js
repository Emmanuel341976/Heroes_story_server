/************************************/
/***Import des modules nécessaires***/
const express = require('express');
const Character_sheet = require('../models/character_sheet');

/***************************************/
/***Récupération du routeur d'express***/
let router = express.Router();

/**********************************/
/***Routage de la ressource User***/

router.get('', (req,res) => {
	Character_sheet.findAll()
		.then( character_sheet =>res.json({data:character_sheet}))
		.catch(err=>res.status(500).json({message:'Database Error'}))
})

router.get('/:id', (req, res)=>{
	let character_sheetId = parseInt(req.params.id)

	// Vérification si le champ id est présent et cohérent
	if(!character_sheetId){
		return res.json(400).json({message:'Missing Parameter'})
	}

	// Récupération de l'utilisateur
	Character_sheet.findOne({where:{id:character_sheetId}, raw: true})
		.then(character_sheet =>{
			//Si l'utilisateur n'existe pas
			if((character_sheet === null)){
				return res.status(404).json({message : 'This character_sheet does not exist'})
			}
			// Utilisateur trouvé
			return res.json({data : character_sheet})

		})
		.catch(err=>res.status(500).json({message:'Database Error'}))
})

router.put('', (req, res) =>{
	 const{initial_stamina, stamina_points, initial_dexterity, dexterity_points, initial_PSI, PSI_points, gold_coins, book_id, user_id} = req.body

	//Validation des données reçues
	if(!initial_stamina ||!stamina_points || !initial_dexterity || !dexterity_points || !initial_PSI || !PSI_points || !gold_coins || !book_id || !user_id){
		return res.status(400).json({message : 'Missing data'})
	}

	Character_sheet.findOne({where : {book_id: book_id, user_id: user_id},raw : true})
		.then(character_sheet=>{
			//Vérification si l'utilisateur existe déjà
			if(character_sheet !== null){
				return res.status(409).json({message: `The character sheet for this story and player already exists!`})
			}
		})
		.catch(err=>res.status(500).json({message:'Database Error'}))
})

router.patch('/:id', (req, res) => {
	let character_sheetId = parseInt(req.params.id)

	// Vérification si le champs id est présent et cohérent
	if (!character_sheetId){
		return res.status(400).json({message :'Missing parameter'})
	}
	
	//Recherche de l'utilisateur
	Character_sheet.findOne({where : {id: character_sheetId}, raw :true})
		.then(character_sheet=>{
			//Vérifier si l'utilisateur existe
			if(character_sheet === null){
				return res.status(404).json({message : 'This character sheet does not exist !' })
			}

			//Miuse à jour de l'utilisateur
			Character_sheet.update(req.body, {where: {id : character_sheetId}})
				.then(character_sheet => res.json({message:'Character sheet updated'}))
				.catch(err=>res.status(500).json({message:'Database Error'}))
		})
	.catch(err=>err.status(500).json({message:'Database Error'}))
})

router.delete('/trash/:id', (req, res)=> {
	let character_sheetId = parseInt(req.params.id)

	// Vérification si le champs id est présent et cohérent
	if (!character_sheetId){
		return res.status(400).json({message :'Missing parameter'})
	}
	
	// Suppression de l'utilisateur
	Character_sheet.destroy({where: {id: character_sheetId}})
		.then (()=> res.status(204).json({}))
		.catch(err=>res.status(500).json({message:'Database Error'}))
	})

router.post('untrash/:id', (req, res)=>{
	let character_sheetId = parseInt(req.params.id)

	//Vérification si le champ id est présent et cohérent
	if (!character_sheetId){
		return res.status(400).json({message :'Missing parameter'})
	}
	Character_sheet.restore({where : {id : inventoryId}})
		.then(()=>res.status(204).json({}))
		.catch(err=>res.status(500).json({message:'Database Error'}))
	})

router.delete('/:id', (req, res)=> {
	let character_sheetId = parseInt(req.params.id)

	// Vérification si le champs id est présent et cohérent
	if (!character_sheetId){
		return res.status(400).json({message :'Missing parameter'})
	}
	
	// Suppression de l'utilisateur
	Character_sheet.destroy({where: {id: character_sheetId}, force: true})
		.then(()=> res.status(204).json({}))
		.catch(err=>res.status(500).json({message:'Database Error'}))
	}) 
module.exports = router