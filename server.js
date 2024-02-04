/************************************/
/***Import des modules nécessaires***/
const express = require('express');
const cors = require('cors');


/************************************/
/***Import de la connexion à la DB***/
let DB = require('./db.config');


/******************************/
/***Initialisation de l'API ***/
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


/******************************/
/***Mise en place du routage***/
app.get('/',(req,res) => res.send(`I'm online. Welldone. :))`));

app.get('*', (req,res) => res.status(501).send('Something goes wrong man!!! o.O'));


/*******************************/
/***Start server avec test DB***/
DB.authenticate()
	.then(()=> console.log('Database connexion OK'))
	.then(() => {
		app.listen(process.env.SERVER_PORT, () => {
			console.log(`Server running on port ${process.env.SERVER_PORT}. Let's Go!!`)
		})
	})
	.catch(err => console.log('Database Error', err))