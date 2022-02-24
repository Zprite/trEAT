import mongoose from 'mongoose'

// create a schema
const recipeSchema = new mongoose.Schema({
    title: String,
    imagePath: String,
    description: String,
    duration: Number,
    stepsMarkdown: String,
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