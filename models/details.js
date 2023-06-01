const mongoose = require('mongoose');
const Schema = mongoose.Schema

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