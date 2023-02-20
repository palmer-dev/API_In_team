const mongoose = require('mongoose')

mongoose.set("strictQuery", false);

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: [true, "email already exists in database!"],
        lowercase: true,
        trim: true,
        required: [true, "email not provided"],
        validate: {
            validator: function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: '{VALUE} n\'est pas un email valide!'
        }

    },
    roles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }],
    firstname: {
        type: String,
        required: [true, "Le prénom est nécessaire"]
    },
    lastname: {
        type: String,
        uppercase: true,
        required: [true, "Le nom de famille est nécessaire"]
    },
    password: {
        type: String,
        required: [true, "Le mdp est nécessaire"]
    },
    username: {
        type: String,
        unique: [true, "Nom d'utilisateur déjà éxistant."],
        required: [true, "Le nom d'utilisateur est nécessaire"]
    },
    tel: {
        type: String,
        validate: {
            validator: function (v) {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
            },
            message: '{VALUE} n\'est pas un numéro de téléphone valide!'
        }
    },
    school: [{ type: mongoose.Schema.Types.ObjectId, ref: 'School' }]
}, { timeseries: true });

const User = mongoose.model('User', UserSchema)

module.exports = User