import { Recipe, User } from '../models.js'
import express from 'express'
import { getToken, COOKIE_OPTIONS, getRefreshToken, verifyUser } from "../authenticate.js"
import passport from "passport"
import jwt from "jsonwebtoken"

const router = express.Router();

// Get user credentials. 
// Checks validity using verifyUser using JwtStrategy (gets JWT from bearer-token header) 
router.get("/user/me", verifyUser, async (req, res, next) => {
  const user = await User
    .findOne({ _id: req.user._id })
    .populate('recipes')

  res.send(user)
})

// Get other user credentials
// get user
// TODO: change to 
router.get("/user/id/:id", verifyUser, async (req, res, next) => {
  const { params } = req
  let getRes;

  if (!(req.params.id)) {
    getRes = { error: "Badly formatted ID" };
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
    getRes = await User.findOne({ _id: params.id }).populate('recipes')
    if (getRes == null) {
      getRes = { error: "Recipe not found" }
      res.status(204);
    }
    else {
      res.status(200);
    }
  }
  res.send({ data: getRes })
})

router.get("/user/username/:username", verifyUser, async (req, res, next) => {
  const { params } = req
  let getRes;

  console.log(req)

  if (!(req.params.username)) {
    getRes = { error: "Badly formatted username" };
    res.status(400);
  }

  else if (typeof params.username != "string") {
    getRes = { error: "username is not of type string" };
    res.status(400);
  }
  else {
    try {
      getRes = await User.findOne({ username: params.username }).populate('recipes')
    } catch (err) {
      getRes = { error: `There was an error fetching user with username ${username}` }
      res.status(400);
    }
    if (getRes == null) {
      res.status(204)
    }
    else {
      res.status(200)
    }
  }
  res.send({ data: getRes })
})

// get list of all users
router.route('/users').get(async (req, res) => {
  User.find().populate("recipes").then(users => {
    res.send(users)
  }).catch(err => {
    res.send("there was an error")
  })
})

export default router;