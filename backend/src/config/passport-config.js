import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { OAuth2Strategy as GoogleStrategy } from "passport-google-oauth";
import { User } from "../models/user.model.js";

import dotenv from "dotenv";

dotenv.config({
    path: "./.env",
  });

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

export default (passport) => {
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        const user = await User.findById(jwt_payload.id);
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      } catch (error) {
        return done(error, false);
      }
    })
  );

    passport.use(
        new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "/api/auth/google/callback",
        }, async (accessToken, refreshToken, profile, done) => {
            try {
                const existingUser = await User.findOne({ googleId: profile.id });
                if (existingUser) {
                    return done(null, existingUser);
                }
                const newUser = await User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    googleId: profile.id,
                    profilepic: profile.photos ? profile.photos[0].value : null,
                    password: null,
                });
                const user = {
                    _id: newUser._id,
                    username: newUser.name,
                    email: newUser.email,
                    profilepic: newUser.profilepic,
                };
                done(null, user);
            } catch (error) {
              console.log("passport google strategy error: ", error.message);
                done(error);
            }
        })
    
  );
};
