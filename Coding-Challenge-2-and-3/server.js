const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const mongoose = require( 'mongoose' );
const uuid = require('uuid');
const jsonParser = bodyParser.json();
const { DATABASE_URL, PORT } = require( './config' );


const {sports} = require('./models/sport-model');
const app = express();


/* Your code goes here */
app.delete('/sports/delete',jsonParser ,(req,res)=>{
    console.log(req.body);
    sportId = req.query.sportId;
    let {id, name, num_players} = req.body;
    if(!id){
        res.statusMessage("Missing ID in body");
        req.status(406).end();
    }
    if(!sportId){
        res.statusMessage("Missing sport ID in query");
        req.status(406).end();
    }
    if(sportId !== id){
        res.statusMessage("Ids do not match");
        req.status(409).end();
    }
    sports  
        .deleteSport({id})
        .then(result =>{
            if (result.deletedCount === 0){
                res.statusMessage = "The id of the sport was not found";
                return res.status(404).end();
            }
            return res.status(204).json(result);
        })

});

app.listen( PORT, () => {
    console.log( "This server is running on port 8080" );
    new Promise( ( resolve, reject ) => {
        const settings = {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            useCreateIndex: true
        };
        mongoose.connect( DATABASE_URL, settings, ( err ) => {
            if( err ){
                return reject( err );
            }
            else{
                console.log( "Database connected successfully." );
                return resolve();
            }
        })
    })
    .catch( err => {
        console.log( err );
    });
});