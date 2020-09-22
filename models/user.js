const mongoose = require('mongoose')
const crypto = require('crypto')
const uuidv1 = require('uuid/v1')
const {
    ObjectId
} = mongoose.Schema;

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Please tell us your name!']
    },
    lastname: {
        type: String,

    },
    email: {
        type: String,
        required: [true, 'Please provide your email!'],
        unique: true,
        lowercase: true,
    },
    run: {
        type: String,
        required: [true, 'Please provide your Run'],
        unique: true,
        lowercase: true
    },

    hashed_password: {
        type: String,
        required: true,
    },
    role: {
        type: Number,
        default: 0
    },
    photo: String,
    phone: {
        type: String,
        lowercase: true
    },
    business: {
        type: ObjectId,
        ref: 'Business',
        required: true
    },
    departament: {
        type: ObjectId,
        ref: 'Departament',
        required: true
    },
    salt: String,

}, {
    timestamps: true
})

//Virtual field

userSchema
    .virtual('password')
    .set(function (password) {
        this.salt = uuidv1()
        this.hashed_password = this.encryptPassword(password)
    })
    .get(function () {
        return this._password;
    });

userSchema.methods = {
    authenticate: function (plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },
    encryptPassword: function (password) {
        if (!password) return "";
        try {
            return crypto
                .createHmac("sha1", this.salt)
                .update(password)
                .digest("hex");
        } catch (err) {
            return "";
        }
    },
};
module.exports = mongoose.model('User', userSchema)