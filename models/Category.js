const mongoose = require('mongoose')

mongoose.set("strictQuery", false);

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Le nom de la catégorie est obligatoire."]
    },
}, { timeseries: true, collection: "categories" });

const Category = mongoose.model('Category', CategorySchema)

module.exports = Category