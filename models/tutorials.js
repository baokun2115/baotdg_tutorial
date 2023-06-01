const mongoose = require('mongoose')
const Schema = mongoose.Schema

require('mongoose-currency').loadType(mongoose)
const Currency = mongoose.Types.Currency

const detailSchema = new Schema({
    publisher: {
        type: String,
        require: true
    },
    publication_year: {
        type: Number,
        require: true
    },
    'ibsn-13': {
        type: Number,
        require: true
    },
    language: {
        type: String, 
        require: true
    },
    pages: {
        type: Number,
        require: true
    }
})
const priceSchema = new Schema({
    type: {
        type: String,
        require: true
    },
    price: {
        type: Currency,
        require: true
    }
})
const tutorialSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    author: {
        type: String,
        require: true
    },
    genre: {
        type: String,
        require: true
    },
    details: [detailSchema],
    prices: [priceSchema]
})
var Tutorials = mongoose.model('Turorial', tutorialSchema)
module.exports = Tutorials