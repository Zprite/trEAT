import passport from 'passport'
import passportJwt from 'passport-jwt'
import { User } from '../models.js'

const jwtStrategy = () => {
  const JwtStrategy = passportJwt.Strategy;
  const ExtractJwt = passportJwt.ExtractJwt;

  const opts = {}
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = process.env.JWT_SECRET;

  // Used by the authenticated requests to deserialize the user,
  // i.e., to fetch user details from the JWT.
  passport.use(
    new JwtStrategy(opts, function (jwt_payload, done) {
      // Check against the DB only if necessary.
      // This can be avoided if you don't want to fetch user details in each request.
      User.findOne({ _id: jwt_payload._id }, function (err, user) {
        if (err) {
          console.log(err)
          return done(err, false)
        }
        if (user) {
          return done(null, user)
        } else {
          return done(null, false)
          // or you could create a new account
        }
      })
    })
  )
}

export default jwtStrategy;

