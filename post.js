const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Post = new Schema({
    name: {type: String, required: true},
    lastName: {type: String, required: true},
    phone: {type: String, required: true},
    age: {type: Number, required: true},
    gender: {type: String, required: true},
})

module.exports = mongoose.model('Post', Post)