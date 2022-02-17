import mongoose from 'mongoose'

// create a schema
const recipeSchema = new mongoose.Schema({
    title: String,
    description: String,
    duration: Number,
    ingredients: [{
        name: String,
        amount: Number,
        unit: String
    }]
}
)

// create a model with studentSchema
const Recipe = mongoose.model('Recipe', recipeSchema);
export {Recipe};