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


/************************************/
/***Import des modules de routage ***/
const user_router = require('./routes/users');
const character_sheet_router = require('./routes/characters_sheets');
const inventory_router = require('./routes/inventories');
const book_router = require('./routes/books');
const chapter_router = require('./routes/chapters');
const choice_router = require('./routes/choices');


/******************************/
/***Mise en place du routage***/
app.get('/',(req,res) => res.send(`I'm online. Welldone. :))`));

app.use('/users', user_router);
app.use('/characters_sheets', character_sheet_router);
app.use('/inventories', inventory_router);
app.use('/books', book_router);
app.use('/chapters', chapter_router);
app.use('/choices', choice_router);

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
	.catch(err => console.log('Database Error', err));