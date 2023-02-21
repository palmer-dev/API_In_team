const mongoose = require('mongoose')

mongoose.set("strictQuery", false);

const SparePartSchema = new mongoose.Schema({
    Number: {
        type: String,
        required: [true, "Le numéro de la pièce doit être renseigné !"]
    },
    Name: {
        type: String,
        required: [true, "Le nom de la pièce doit être renseigné !"]
    },
    Type: {
        type: String,
        required: [true, "Vous n'avez pas défini le type de pièce."]
    },
    Status: {
        type: String,
        default: "Active"
    },
}, { timeseries: true, collection: "spareparts" });

const SparePart = mongoose.model('SparePart', SparePartSchema)

module.exports = SparePart