require('dotenv').load();
const pg = require('pg');
const Client = pg.Client;
const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
app.use(express.static('public'));
app.use(bodyParser.urlencoded());
app.set('view engine', 'pug');

const client = new Client ({						//Configuring a new database client from PostGres to server.
	user: process.env.POSTGRES_USER,				//Using environment variables to load up the user, database and username.
	host: 'localhost',
	database: process.env.database,
	password: process.env.POSTGRES_PASSWORD,
	port: 5432,
});
								
//Connect to client
client.connect();

/*------------------------Home Page-----------------------------*/		
app.get('/', (req, res) => {
	res.render('index', {
		title: 'Home'
	});
});

/*---------------------Add Bulletin Page------------------------*/

app.get('/addBulletin', (req, res) => {			//GET request to render the addBulletin page as a response.
	res.render('addBulletin', {
		title: 'Add Bulletin'
	});
});

app.post('/addBulletin', (req, res) => {		//POST request to add the submission input of creating a title and message to the database table 'messages'.
	let title = req.body.title;					//The inputs title and message will be stored in the two lets form the input form.
	let message = req.body.message;
	
	
	const addMessage = {						//Declaring the query object that includes the pg command line and user input lets.		
		text: `INSERT INTO messages (title, body) VALUES ('${title}', '${message}');`
	};
			
	client.query(addMessage, (err, res) => {	//The client query addMessage will be executed in order to store the lets into the database table 'messages'   
		if (err){
		console.log(err)
		};
	});
	res.redirect('addBulletin')					//The client browser will be redirected to the addBulletin route.
});


/*---------------------Bulletins Page------------------------*/

app.get('/bulletins', (req, results) => {		//GET request to render the data from the table 'messages'.						
		
	const bulletins = {							//Declaring the bulletins query object and the commandline for selecting all form table 'messages'.
		text: `SELECT * from messages;`	
	};
	
	client.query(bulletins, (err, res) => {		//Executing the bulletins query.
		if (err){
		console.log(err)
		};
		let messageList = res.rows;				//The rows of the selected table will be stored into the messageList let.
		results.render('bulletins', {			//Renders the response as 'results' because the GET request reponse 'res' is already in place to extract the data rows through the client query bulletins. 
			title: 'Bulletins',
			messageList: messageList})
	});
});

/*--------------local server on port 3000--------------------*/
app.listen(3000), () => {
    console.log('Listening to port 3000');
};
