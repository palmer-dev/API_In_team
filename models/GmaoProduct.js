const mongoose = require('mongoose')
const Category = require("./Category")
mongoose.set("strictQuery", false);

const GmaoProductSchema = new mongoose.Schema({
    Category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', autopopulate: true },
    SKU: {
        type: String,
        required: [true, "Le SKU doit être renseigné !"]
    },
    Description: {
        type: String,
        required: [true, "Vous devez renseigner une description."]
    }
}, { timeseries: true, collection: "gmaoproducts" });

GmaoProductSchema.plugin(require('mongoose-autopopulate'));

const GmaoProduct = mongoose.model('GmaoProduct', GmaoProductSchema)

module.exports = GmaoProduct