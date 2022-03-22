import express from 'express';
import 'dotenv/config';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import { getPublicDirPath } from './utils/pathUtils';
import connectToDB from './utils/connectdb';

// Routers
import userRouter from './routes/userRoutes';
import authRouter from './routes/authRoutes';
import recipeRouter from './routes/recipeRoutes';
import imageRouter from './routes/fileUploadRoutes';

// Strategies
import jwtStrategy from './strategies/JwtStrategy';
import localStrategy from './strategies/LocalStrategy';

const app = express();

// Call to setup passport strategies
jwtStrategy();
localStrategy();

// handle json
app.use(bodyParser.json({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));

// Add the client URL to the CORS policy
const whitelist = process.env.WHITELISTED_DOMAINS
  ? process.env.WHITELISTED_DOMAINS.split(',')
  : [];

const corsOptions = {
  origin(origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

// Set public folder, mainly for image uploads
// console.log(getPublicDirPath())
app.use(express.static(getPublicDirPath()));

app.use(passport.initialize());

app.use('/auth', authRouter);
app.use('/', userRouter);
app.use('/', imageRouter);
app.use('/', recipeRouter);

app.get('/', (req, res) => res.send('This is the root of the express api. '));

connectToDB();

app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}...`));
