import passport from 'passport';
import jwt from 'jsonwebtoken';

// const dev = process.env.NODE_ENV !== 'production';

export const COOKIE_OPTIONS = {
  httpOnly: true,
  // Since localhost is not having https protocol,
  // secure cookies do not work correctly (in postman)
  secure: true,
  signed: true,
  maxAge: Number(process.env.REFRESH_TOKEN_EXPIRY) * 1000,
  sameSite: 'none',
};

export const getToken = (user) => jwt.sign(user, process.env.JWT_SECRET, {
  expiresIn: Number(process.env.SESSION_EXPIRY),
});

export const getRefreshToken = (user) => jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
  expiresIn: Number(process.env.REFRESH_TOKEN_EXPIRY),
});

export const verifyUser = passport.authenticate('jwt', { session: false });
