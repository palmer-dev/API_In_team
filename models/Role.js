const mongoose = require('mongoose')

mongoose.set("strictQuery", false);

const RoleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Le nom du rôle est nécessaire"]
    },
    access: {
        type: mongoose.Schema.Types.Mixed
    }
}, { timeseries: true });

const Role = mongoose.model('Role', RoleSchema)

module.exports = Role