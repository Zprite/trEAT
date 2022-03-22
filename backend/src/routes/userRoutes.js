import express from 'express';
import {
  verifyUser,
} from '../authenticate';
import { User } from '../models';

const router = express.Router();

// Get user credentials.
// Checks validity using verifyUser using JwtStrategy (gets JWT from bearer-token header)
router.get('/user/me', verifyUser, async (req, res) => {
  const user = await User
    .findOne({ _id: req.user._id })
    .populate('recipes');

  res.send(user);
});

// Get other user credentials
// get user
// TODO: change to
router.get('/user/id/:id', verifyUser, async (req, res) => {
  const { params } = req;
  let getRes;

  if (!(req.params.id)) {
    getRes = { error: 'Badly formatted ID' };
    res.status(400);
  } else if (typeof params.id !== 'string') {
    getRes = { error: 'ID is not of type string' };
    res.status(400);
  } else if (req.params.id.length !== 24) {
    getRes = { error: 'ID is of wrong length' };
    res.status(400);
  } else {
    getRes = await User.findOne({ _id: params.id }).populate('recipes');
    if (getRes == null) {
      getRes = { error: 'Recipe not found' };
      res.status(204);
    } else {
      res.status(200);
    }
  }
  res.send({ data: getRes });
});

router.get('/user/username/:username', verifyUser, async (req, res) => {
  const { params } = req;
  let getRes;

  console.log(req);

  if (!(req.params.username)) {
    getRes = { error: 'Badly formatted username' };
    res.status(400);
  } else if (typeof params.username !== 'string') {
    getRes = { error: 'username is not of type string' };
    res.status(400);
  } else {
    try {
      getRes = await User.findOne({ username: params.username }).populate('recipes');
    } catch (err) {
      getRes = { error: `There was an error fetching user with username ${params.username}` };
      res.status(400);
    }
    if (getRes == null) {
      res.status(204);
    } else {
      res.status(200);
    }
  }
  res.send({ data: getRes });
});

// get list of all users
router.route('/users').get(async (res) => {
  User.find().populate('recipes').then((users) => {
    res.send(users);
  }).catch((err) => {
    res.send(`There was an error: ${err.message}`);
  });
});

export default router;
