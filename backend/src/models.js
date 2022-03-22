import mongoose from 'mongoose'
import passportLocalMongoose from 'passport-local-mongoose'

const Schema = mongoose.Schema;

const Session = new Schema({
    refreshToken: {
        type: String,
        default: "",
    },
})

const userSchema = new Schema({
    fullName: {
        type: String,
        default: "",
    },
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

//Remove refreshToken from the response
userSchema.set("toJSON", {
    transform: function (doc, ret, options) {
        delete ret.refreshToken
        return ret
    },
})

userSchema.plugin(passportLocalMongoose)

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
    }],
    userID: String,
    username: String,
}
)

// create a model with studentSchema
export const Recipe = mongoose.model('Recipe', recipeSchema);
export const User = mongoose.model("User", userSchema);