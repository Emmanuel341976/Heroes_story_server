/************************************/
/***Import des modules nécessaires***/
const express = require('express');
const Chapter = require('../models/chapter');

/***************************************/
/***Récupération du routeur d'express***/
let router = express.Router();

/**********************************/
/***Routage de la ressource Chapter***/

router.get('', (req,res) => {
	Chapter.findAll()
		.then( chapter =>res.json({data:chapter}))
		.catch(err=>res.status(500).json({message:'Database Error'}))
})

router.get('/:id', (req, res)=>{
	let chapterId = parseInt(req.params.id)

	// Vérification si le champ id est présent et cohérent
	if(!chapterId){
		return res.json(400).json({message:'Missing Parameter'})
	}

	// Récupération du chapitre
	Chapter.findOne({where:{id:chapterId}, raw: true})
		.then(chapter =>{
			//Si le chapitre n'existe pas
			if((chapter === null)){
				return res.status(404).json({message : 'This chapter does not exist'})
			}
			// Chapitre trouvé
			return res.json({data : chapter})

		})
		.catch(err=>res.status(500).json({message:'Database Error'}))
})

router.put('', (req, res) =>{
	 const{chapter_number, chapter_text, number_choices, book_id} = req.body

	//Validation des données reçues
	if(!chapter_number || !chapter_text || !number_choices || !book_id){
		return res.status(400).json({message : 'Missing data'})
	}

	Chapter.findOne({where : {chapter_number : chapter_number, book_id : book_id},raw : true})
		.then(chapter=>{
			//Vérification si le chapitre existe déjà
			if(chapter !== null){
				return res.status(409).json({message: `The chapter ${chapter_number} already exist!`})
			}
					//Création du chapitre
					Chapter.create(req.body)
					.then(chapter=> res.json({message: 'Chapter Created', data:chapter}))
					.catch(err=>res.status(500).json({message:'Database Error'}))	
		})
		.catch(err=>res.status(500).json({message:'Database Error'}))
})

router.patch('/:id', (req, res) => {
	let chapterId = parseInt(req.params.id)

	// Vérification si le champs id est présent et cohérent
	if (!chapterId){
		return res.status(400).json({message :'Missing parameter'})
	}
	
	//Recherche du chapitre
	Chapter.findOne({where : {id: chapterId}, raw :true})
		.then(chapter=>{
			//Vérifier si le chapitre existe
			if(chapter === null){
				return res.status(404).json({message : 'This chapter does not exist !' })
			}

			//Mise à jour du chapitre
			Chapter.update(req.body, {where: {id : chapterId}})
				.then(chapter => res.json({message:'Chapterupdated'}))
				.catch(err=>res.status(500).json({message:'Database Error'}))
		})
	.catch(err=>err.status(500).json({message:'Database Error'}))
})

router.delete('/trash/:id', (req, res)=> {
	let chapterId = parseInt(req.params.id)

	// Vérification si le champs id est présent et cohérent
	if (!chapterId){
		return res.status(400).json({message :'Missing parameter'})
	}
	
	// Suppression du chapitre
	Chapter.destroy({where: {id: chapterId}})
		.then (()=> res.status(204).json({}))
		.catch(err=>res.status(500).json({message:'Database Error'}))
	})

router.post('untrash/:id', (req, res)=>{
	let chapterId = parseInt(req.params.id)

	//Vérification si le champ id est présent et cohérent
	if (!chapterId){
		return res.status(400).json({message :'Missing parameter'})
	}
	Chapter.restore({where : {id : chapterId}})
		.then(()=>res.status(204).json({}))
		.catch(err=>res.status(500).json({message:'Database Error'}))
	})

router.delete('/:id', (req, res)=> {
	let chapterId = parseInt(req.params.id)

	// Vérification si le champs id est présent et cohérent
	if (!chapterId){
		return res.status(400).json({message :'Missing parameter'})
	}
	
	// Suppression du chapitre
	Chapter.destroy({where: {id: chapterId}, force: true})
		.then(()=> res.status(204).json({}))
		.catch(err=>res.status(500).json({message:'Database Error'}))
	}) 
module.exports = router