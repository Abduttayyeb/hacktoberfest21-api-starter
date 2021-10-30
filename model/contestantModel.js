const mongoose = require('mongoose')

const contestantSchema = new mongoose.Schema({
    id : {
        type: String
    },
    name:{
        type:String,
    },
    costumeTitle:{
        type:String
    },
    costumeImgUrl:{
        type:String
    },
    city:{
        type:String
    },
    country:{
        type:String
    },
    votes:{
        type:Number
    }
})

const Contestant = mongoose.model('Contestant',contestantSchema)

module.exports = Contestant