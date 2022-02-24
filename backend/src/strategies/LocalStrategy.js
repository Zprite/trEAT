import passport from "passport"
import passportLocal from "passport-local"
import { userSchema } from "../models.js"

const localStrategy = () => {
    const LocalStrategy = passportLocal.Strategy;
    //Called during login/sign up.
    passport.use(new LocalStrategy(userSchema.authenticate()))
    //called while after logging in / signing up to set user details in req.user
    passport.serializeUser(userSchema.serializeUser())
}

export default localStrategy;