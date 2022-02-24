import { userSchema } from '../models.js'
import express from 'express'
import { getToken, COOKIE_OPTIONS, getRefreshToken } from "../authenticate.js"
import passport from "passport";

const router = express.Router();

router.post("/login", passport.authenticate('local'), (req, res, next) => {
  const token = getToken({ _id: req.user._id })
  const refreshToken = getRefreshToken({ _id: req.user._id })
  userSchema.findById(req.user._id).then(
    user => {
      user.refreshToken.push({ refreshToken })
      user.save((err, user) => {
        if (err) {
          res.statusCode = 500
          res.send(err)
        } else {
          res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
          res.send({ success: true, token })
        }
      })
    }
  )
})

router.post("/signup", (req, res, next) => {
  // Verify that first name is not empty
  if (!req.body.fullName) {
    res.statusCode = 500
    res.send({
      name: "FullNameError",
      message: "Full Name is required",
    })
  } else {
    userSchema.register(
      new userSchema({ username: req.body.username, fullName: req.body.fullName }),
      req.body.password,
      (err, user) => {
        if (err) {
          console.log(err)
          res.statusCode = 500
          res.send(err)
        } else {
          user.fullName = req.body.fullName;
          const token = getToken({ _id: user._id })
          const refreshToken = getRefreshToken({ _id: user._id })
          user.refreshToken.push({ refreshToken })
          user.save((err, user) => {
            if (err) {
              res.statusCode = 500
              res.send(err)
            } else {
              res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
              res.send({ sucess: true, token })
            }
          })
        }
      }
    )
  }
})

// get list of all users
router.route('/users').get(async (req, res) => {
  userSchema.find().populate("recipes").then(users => {
    res.send(users)
  }).catch(err => {
    res.send("there was an error")
  })
})

// get user
router.route('/user/:id').get(async (req, res) => {
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
    getRes = await userSchema.findOne({ _id: params.id }).populate('recipes')
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

export default router;