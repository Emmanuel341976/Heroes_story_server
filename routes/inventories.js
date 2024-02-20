/************************************/
/***Import des modules nécessaires***/
const express = require('express');
const Inventory = require('../models/inventory');

/***************************************/
/***Récupération du routeur d'express***/
let router = express.Router();

/**********************************/
/***Routage de la ressource User***/

router.get('', (req,res) => {
	Inventory.findAll()
		.then( inventory =>res.json({data:inventory}))
		.catch(err=>res.status(500).json({message:'Database Error'}))
})

router.get('/:id', (req, res)=>{
	let inventoryId = parseInt(req.params.id)

	// Vérification si le champ id est présent et cohérent
	if(!inventoryId){
		return res.json(400).json({message:'Missing Parameter'})
	}

	// Récupération de l'utilisateur
	Inventory.findOne({where:{id:inventoryId}, raw: true})
		.then(inventory =>{
			//Si l'utilisateur n'existe pas
			if((inventory === null)){
				return res.status(404).json({message : 'This inventory does not exist'})
			}
			// Utilisateur trouvé
			return res.json({data : inventory})

		})
		.catch(err=>res.status(500).json({message:'Database Error'}))
})

router.put('', (req, res) =>{
	 const{object_name, description, sheet_id} = req.body

	//Validation des données reçues
	if(!object_name ||!description || !sheet_id){
		return res.status(400).json({message : 'Missing data'})
	}

	Inventory.findOne({where : {sheet_id: sheet_id},raw : true})
		.then(inventory=>{
			//Vérification si l'utilisateur existe déjà
			if(inventory !== null){
				return res.status(409).json({message: `The inventory for this story and player already exists!`})
			}
		})
		.catch(err=>res.status(500).json({message:'Database Error'}))
})

router.patch('/:id', (req, res) => {
	let inventoryId = parseInt(req.params.id)

	// Vérification si le champs id est présent et cohérent
	if (!inventoryId){
		return res.status(400).json({message :'Missing parameter'})
	}
	
	//Recherche de l'utilisateur
	Inventory.findOne({where : {id: inventoryId}, raw :true})
		.then(inventory=>{
			//Vérifier si l'utilisateur existe
			if(inventory === null){
				return res.status(404).json({message : 'This inventory does not exist !' })
			}

			//Miuse à jour de l'utilisateur
			Inventory.update(req.body, {where: {id : inventoryId}})
				.then(inventory => res.json({message:'Inventory updated'}))
				.catch(err=>res.status(500).json({message:'Database Error'}))
		})
	.catch(err=>err.status(500).json({message:'Database Error'}))
})

router.delete('/trash/:id', (req, res)=> {
	let inventoryId = parseInt(req.params.id)

	// Vérification si le champs id est présent et cohérent
	if (!inventoryId){
		return res.status(400).json({message :'Missing parameter'})
	}
	
	// Suppression de l'utilisateur
	Inventory.destroy({where: {id: inventoryId}})
		.then (()=> res.status(204).json({}))
		.catch(err=>res.status(500).json({message:'Database Error'}))
	})

router.post('untrash/:id', (req, res)=>{
	let inventoryId = parseInt(req.params.id)

	//Vérification si le champ id est présent et cohérent
	if (!inventoryId){
		return res.status(400).json({message :'Missing parameter'})
	}
	Inventory.restore({where : {id : inventoryId}})
		.then(()=>res.status(204).json({}))
		.catch(err=>res.status(500).json({message:'Database Error'}))
	})

router.delete('/:id', (req, res)=> {
	let inventoryId = parseInt(req.params.id)

	// Vérification si le champs id est présent et cohérent
	if (!inventoryId){
		return res.status(400).json({message :'Missing parameter'})
	}
	
	// Suppression de l'utilisateur
	Inventory.destroy({where: {id: inventoryId}, force: true})
		.then(()=> res.status(204).json({}))
		.catch(err=>res.status(500).json({message:'Database Error'}))
	}) 
module.exports = router