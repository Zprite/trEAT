import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

const app = express()
const PORT = 8000

// handle json
app.use(bodyParser.json({ extended: true }))

// origins should be spesified in prod
app.use(cors())

// Connect to mongodb
mongoose
    .connect(
        "mongodb+srv://henrikskog:JYN*yvn1dyk7anx*jmy@cluster0.ycj8k.mongodb.net/Cluster0?retryWrites=true&w=majority",
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

const ingredientSchema = new mongoose.Schema({

});

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

// get documents
app.get('/recipies', (req, res) => {
    Recipe.find({}, (err, found) => {
        if (!err) {
            res.send(found);
        } else {
            console.log(err);
            res.send("Some error occured!")
        }
    });
});

app.post('/recipies', async (req, res) => {
    // Create a new document
    const { body } = req

    const recipe = new Recipe({
        title: body.title,
        description: body.description,
        duration: body.duration,
        ingredients: body.ingredients
    });

    const saveRes = await recipe.save()
    res.json({ data: saveRes })
})


app.delete('/recipies/:id', async (req, res) => {
    // Create a new document
    const { params } = req

    //TODO: split up
    if (!(req.params.id && typeof params.id == "string" && req.params.id.length == 24)) {
        res.json({ data: { error: "Badly formatted id" } })
    }

    const saveRes = await Recipe.deleteOne({ _id: params.id })
    res.json({ data: saveRes })
})

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}...`))