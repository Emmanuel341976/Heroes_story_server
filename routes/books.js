/************************************/
/***Import des modules nécessaires***/
const express = require('express');
const Book = require('../models/book');

/***************************************/
/***Récupération du routeur d'express***/
let router = express.Router();

/**********************************/
/***Routage de la ressource Book***/

router.get('',(req,res)=>{
	Book.findAll()
		.then(book=>res.json({data:book}))
		.catch(err=>res.status(500).json({message:'Database Error'}))

})

router.get('/:id', (req, res)=>{
	let bookId = parseInt(req.params.id)
	
	// Vérification si le champ id est présent et cohérent
	if(!bookId){
		return res.json(400).json({message:'Missing Parameter'})
	}

	// Récupération du livre
	Book.findOne({where:{id:bookId}, raw: true})
		.then(book =>{
			//Si l'utilisateur n'existe pas
			if((book === null)){
				return res.status(404).json({message : 'This book does not exist'})
			}
			// Utilisateur trouvé
			return res.json({data : book})

		})
		.catch(err=>res.status(500).json({message:'Database Error'}))

})

router.put('', (req, res) =>{
	const{title} = req.body

   //Validation des données reçues
   if(!title){
	   return res.status(400).json({message : 'Missing data'})
   }

   Book.findOne({where : {title: title},raw : true})
	   .then(book=>{
		   //Vérification si l'utilisateur existe déjà
		   if(book !== null){
			   return res.status(409).json({message: `The book ${title} already exist!`})
		   }

				//Création d'un livre
				Book.create(req.body)
				.then(user=> res.json({message: 'Book Created', data:book}))
				.catch(err=>res.status(500).json({message:'Database Error'}))
			   
	   })
	   .catch(err=>res.status(500).json({message:'Database Error'}))
})

router.patch('/:id', (req, res) => {
	let bookId = parseInt(req.params.id)

	// Vérification si le champs id est présent et cohérent
	if (!bookId){
		return res.status(400).json({message :'Missing parameter'})
	}
	
	//Recherche de l'utilisateur
	Book.findOne({where : {id: bookId}, raw :true})
		.then(book=>{
			//Vérifier si l'utilisateur existe
			if(book === null){
				return res.status(404).json({message : 'This book does not exist !' })
			}

			//Miuse à jour de l'utilisateur
			Book.update(req.body, {where: {id : bookId}})
				.then(user => res.json({message:'Book updated'}))
				.catch(err=>res.status(500).json({message:'Database Error'}))
		})
	.catch(err=>err.status(500).json({message:'Database Error'}))
})

router.delete('/trash/:id', (req, res)=> {
	let bookId = parseInt(req.params.id)

	// Vérification si le champs id est présent et cohérent
	if (!bookId){
		return res.status(400).json({message :'Missing parameter'})
	}
	
	// Suppression de l'utilisateur
	Book.destroy({where: {id: bookId}})
		.then (()=> res.status(204).json({}))
		.catch(err=>res.status(500).json({message:'Database Error'}))
	})

router.post('untrash/:id', (req, res)=>{
	let bookId = parseInt(req.params.id)

	//Vérification si le champ id est présent et cohérent
	if (!bookId){
		return res.status(400).json({message :'Missing parameter'})
	}
	Book.restore({where : {id : userId}})
		.then(()=>res.status(204).json({}))
		.catch(err=>res.status(500).json({message:'Database Error'}))
	})

router.delete('/:id', (req, res)=> {
	let bookId = parseInt(req.params.id)

	// Vérification si le champs id est présent et cohérent
	if (!bookId){
		return res.status(400).json({message :'Missing parameter'})
	}
	
	// Suppression de l'utilisateur
	Book.destroy({where: {id: userId}, force: true})
		.then(()=> res.status(204).json({}))
		.catch(err=>res.status(500).json({message:'Database Error'}))
	}) 
module.exports = router