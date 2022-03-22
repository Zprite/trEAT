import { Recipe, User } from '../models.js'
import express from 'express'
import { getToken, COOKIE_OPTIONS, getRefreshToken, verifyUser } from "../authenticate.js"
import fs from "fs"
import { getLocalImagePath } from '../utils.js';

const router = express.Router();

// get list of all recipes
router.route('/recipes').get((req, res) => {
  Recipe.find({}, (err, found) => {
    if (!err) {
      res.send(found);
    } else {
      res.send("Some error occured!")
    }
  });
})

router.post('/recipes', verifyUser, (async (req, res, next) => {
  const { body } = req
  const recipe = new Recipe({
    title: body.title,
    description: body.description,
    duration: body.duration,
    stepsMarkdown: body.stepsMarkdown,
    ingredients: body.ingredients,
    imagePath: body.imagePath,
    userID: req.user._id,
    username: req.user.username
  });

  const saveRes = await recipe.save()
  res.json({ data: saveRes })
  User.findByIdAndUpdate({ _id: req.user._id }, { $push: { recipes: saveRes._id } }).exec()
}));

router.put('/recipe/:id', verifyUser, (async (req, res) => {
  const { params, body } = req;
  let putRes;
  let userID = req.user._id;
  let oldRecipe;

  if (!req.params.id) {
    putRes = { error: "Badly formatted ID" };
    res.status(400);
  }

  else if (typeof params.id != "string") {
    console.log(typeof params.id);
    console.log(params.id);
    putRes = { error: "ID is not of type string" };
    res.status(400);
  }

  else if (req.params.id.length != 24) {
    putRes = { error: "ID is of wrong length" };
    res.status(400);
  }
  else {
    oldRecipe = await Recipe.findOne({ _id: params.id })
    if (!oldRecipe) {
      putRes = { error: "Recipe not found" }
      res.status(204);
    }
    else if (userID != oldRecipe.userID) {
      console.log("recipe UID: ", oldRecipe.userID);
      console.log("Logged in user UID: ", userID);
      putRes = { error: "Unauthorized edit request for this recipe." }
      res.status(401);
    }

    else {
      const newRecipe = new Recipe({
        title: body.title,
        description: body.description,
        duration: body.duration,
        stepsMarkdown: body.stepsMarkdown,
        ingredients: body.ingredients,
        imagePath: body.imagePath,
        userID: req.user._id,
      });
      newRecipe._id = req.params.id;
      console.log("new recipe: ", newRecipe);

      await Recipe.findByIdAndUpdate({ _id: params.id }, newRecipe).exec();
      // Delete old image if it gets changed.
      if (oldRecipe.imagePath && newRecipe.imagePath != oldRecipe.imagePath) {
        try {
          let filePath = getLocalImagePath(oldRecipe.imagePath);
          fs.unlinkSync(filePath);
          console.log("File removed:", filePath);
        } catch (err) {
          console.error("Error removing image:", err);
        }
      }
      res.status(200)
    }
  }
  res.json({ data: putRes });
}))

router.get('/recipe/:id', (async (req, res) => {
  const { params } = req
  let getRes;

  if (!req.params.id) {
    putRes = { error: "Badly formatted ID" };
    res.status(400);
  }

  else if (typeof params.id != "string") {
    getRes = { error: "ID is not of type string" };
    res.status(400);
  }

  else if (req.params.id.length != 24) {
    getRes = { error: "ID is of wrong length" };
    res.status(400);
  }
  else {
    getRes = await Recipe.findOne({ _id: params.id })
    if (getRes == null) {
      getRes = { error: "Recipe not found" }
      res.status(204);
    }
    else {
      res.status(200);
    }
  }
  res.send({ data: getRes })
}))

router.delete('/recipe/:id', verifyUser, (async (req, res) => {
  const { params } = req
  let saveRes;

  if (!req.params.id) {
    saveRes = { error: "Badly formatted ID" };
    res.status(400);
  }

  else if (typeof params.id != "string") {
    saveRes = { error: "ID is not of type string" };
    res.status(400);
  }

  else if (req.params.id.length != 24) {
    saveRes = { error: "ID is of wrong length" };
    res.status(400);
  }
  let userID = req.user._id;
  let recipe = await Recipe.findOne({ _id: params.id })
  if (recipe == null) {
    saveRes = { error: "Recipe not found" }
    res.status(204);
  }
  else if (userID != recipe.userID) {
    console.log("recipe UID: ", recipe.userID);
    console.log("Logged in user UID: ", userID);
    saveRes = { error: "Unauthorized delete request for this recipe." }
    res.status(401);
  }
  else {
    saveRes = await Recipe.deleteOne({ _id: params.id })
    // Delete corresponding image from local storage
    if (recipe.imagePath != null) {
      try {
        let filePath = getLocalImagePath(recipe.imagePath);
        fs.unlinkSync(filePath);
        console.log("File removed:", filePath);
      } catch (err) {
        console.error("Error removing image:", err);
      }
    }
    res.status(200);
  }
  res.json({ data: saveRes });
}));

export default router;