const mongoose = require('mongoose')

mongoose.set("strictQuery", false);

const MaintenanceSchema = new mongoose.Schema({
    equipement: {
        type: String,
        required: [true, "Le nom de l'équipement ne peut pas être vide"]
    },
    description: {
        type: String,
        required: [true, "La description de maintenance est obligatoire"]
    },
    tel: {
        type: String,
        validate: {
            validator: function (v) {
                return /^\d{5}$/.test(v);
            },
            message: '{VALUE} n\'est pas une périodicité valide !'
        }
    }
}, { timeseries: true, collection: "maintenance" });

const Maintenance = mongoose.model('Maintenance', MaintenanceSchema)

module.exports = Maintenance