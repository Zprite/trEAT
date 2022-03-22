import passport from 'passport';
import passportJwt from 'passport-jwt';
import { User } from '../models';

const jwtStrategy = () => {
  const JwtStrategy = passportJwt.Strategy;
  const { ExtractJwt } = passportJwt;

  const opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = process.env.JWT_SECRET;

  // Used by the authenticated requests to deserialize the user,
  // i.e., to fetch user details from the JWT.
  passport.use(
    new JwtStrategy(opts, ((jwtPayload, done) => {
      // Check against the DB only if necessary.
      // This can be avoided if you don't want to fetch user details in each request.
      User.findOne({ _id: jwtPayload._id }, (err, user) => {
        if (err) {
          console.log(err);
          return done(err, false);
        }
        if (user) {
          return done(null, user);
        }
        return done(null, false);
        // or you could create a new account
      });
    })),
  );
};

export default jwtStrategy;
