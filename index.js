require('dotenv').load();
const pg = require('pg');
const Client = pg.Client;
const express = require('express');
const app = express();

const client = new Client ({
	user: process.env.user,
	host: process.env.host,
	database: process.env.database,
	password: process.env.password,
	post: 5432,
})

// app.post('/postmessage', (req, res) => {
// 	req.body.title
// 	client.connect()
// 	const query = {
// 		text: SELECT etc.
// 	}
// })

//Create route that connects to the database and query all the messages from the webserver to the database and verse versa.


client.connect()


const selectUser = {
	text: `SELECT * FROM users WHERE name = '${process.argv[2]}'`,
}

// const addUser = {
// 	text: `INSERT INTO users VALUES ('${process.argv[2]}', '${process.argv[3]}')`,
// }

// const deleteUser = {
// 	text: `DELETE FROM users WHERE name = '${process.argv[2]}'`,
// }

// const addColumn = {
// 	text: `ALTER TABLE users ADD COLUMN ${process.argv[2]} ${process.argv[3]}`,
// }

// const deleteColumn = {
// 	text: `ALTER TABLE users DROP COLUMN ${process.argv[2]}`,
// }

client.query(selectUser, (err, result) => {
	if (err){
		console.log(err)
	}
	else 
	console.log(result.rows)
	client.end()
})

// client.query(addUser, (err, result) => {
// 	if (err){
// 		console.log(err)
// 	}
// 	else console.log('User inserted')
// 	client.end()
// })


// client.query(deleteUser, (err, result) => {
// 	if (err){
// 		console.log(err)
// 	}
// 	else console.log('User deleted')
// 	client.end()	
// })

// client.query(addColumn, (err, result) => {
// 	if (err){
// 		console.log(err)
// 	}
// 	else console.log('Column Added')
// 	client.end()
// })

// client.query(deleteColumn, (err, result) => {
// 	if (err){
// 		console.log(err)
// 	}
// 	else console.log('Complete')
// 	client.end()
// })




