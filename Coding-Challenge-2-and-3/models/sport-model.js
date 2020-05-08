const mongoose = require( 'mongoose' );
const uuid = require( 'uuid' );

const sportSchema = mongoose.Schema({
    id: {
        type : String,
        required: true,
        unique : true
    },
    name: {
        type : String
    },
    num_players: {
        type : Number
    }
})

const sportsColection = mongoose.model('sports', sportSchema);

const sports = {
    deleteSport: function ( sportsID ){
        return sportsColection
            .deleteOne(sportsID)
            .then (deleteSport =>{
                return deleteSport;
            })
            .catch(err=>{
                return err;
            });
    }
}

module.exports = {
    sports
};