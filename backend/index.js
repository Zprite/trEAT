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
    process.env.MONGODB_URI, 
    {useNewUrlParser: true, useUnifiedTopology: true}
)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

// create a schema
const recipeSchema = new mongoose.Schema({
    title: String,
    description: String
});

// create a model with studentSchema
const Recipe = mongoose.model('Recipe', recipeSchema);

// Create a new document
const recipe = new Recipe({
    title: "Recipe 1",
    description: 'Recipe description'
    
});
// Add the document to Collections
recipe.save().then(() => console.log("One entry added")).catch(error => console.log(error));

// get documents
app.get('/', (req, res) => {
    Recipe.find({}, (err, found) => {
        if (!err) {
            res.send(found);
        } else {
            console.log(err);
            res.send("Some error occured!")
        } 
    });
});


app.listen(PORT, () => console.log(`Example app listening on port ${PORT}...`))
