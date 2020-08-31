const mongoose = require('mongoose')

const departamentSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Please provide departament'],
        maxlength: 16,
        unique: true
    }

}, {
    timestamps: true
})


module.exports = mongoose.model('Departament', departamentSchema)