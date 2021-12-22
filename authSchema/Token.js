const {Schema, model} = require('mongoose')

const Token = new Schema({
    userID: {type: String, required: true},
})

module.exports = model('Token', Token)