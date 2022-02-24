import mongoose from 'mongoose'
import passportLocalMongoose from 'passport-local-mongoose'

const Schema = mongoose.Schema;

const Session = new Schema({
    refreshToken: {
        type: String,
        default: "",
    },
})

const User = new Schema({
    username: {
        type: String,
        default: "",
    },
    authStrategy: {
        type: String,
        default: "local",
    },
    recipes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe'
    }],
    refreshToken: {
        type: [Session],
    },
})

const recipeSchema = new Schema({
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
export { Recipe };