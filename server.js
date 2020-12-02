//Express and database
const express = require('express'); 
const app = express();
const Database = require('nedb');

require('dotenv').config();

//server init
app.listen(3000, () => console.log('listening in the port 3000!!!'));
app.use(express.static('public'))
app.use(express.json({ limit: '1mb' }))

//database
const database = new Database('database.db');
database.loadDatabase();

//post requests
app.post('/api', (request, response) => {
    const timestamp = Date.now();
    const data = request.body
        data.timestamp = timestamp;

    database.insert(data)

    response.json({
        status: 'success',
        timestamp: data.timestamp,
        mood: data.mood,
        image: data.image
    })
});

//get request
app.get('/api', (request, response) => {
    database.find({}, (err, data) => {
        if ( err ) {
            console.log(err);
        }
        response.json(data); 
        console.log(data)
    })
});