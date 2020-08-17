const mongoose = require('mongoose')


const businesSchema = new mongoose.Schema({
    rut: {
        type: String,
        trim: true,
        required: [true, 'Please provide Rut'],
        maxlength: 12,
        unique: true
    },
    name: {
        type: String,
        trim: true,
        required: [true, 'Please provide Name'],
        maxlength: 32
    },
    direction: {
        type: String,
        trime: true,
        required: [true, 'Please provide Direction']
    }
}, {
    timestamps: true,
})


module.exports = mongoose.model('Business', businesSchema)