import { Strategy as JWTstrategy, ExtractJwt } from 'passport-jwt';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { User, UserScemaInterface } from '../models/userScema';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

interface UserScemaInterfaceExtends {
  user: UserScemaInterface;
  token: string;
}

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET || 'asdasdqw',
};

passport.use(
  'jwt',
  new JWTstrategy(opts, (jwt_payload, done) => {
    done(null, jwt_payload);
  }),
);
passport.use(
  new LocalStrategy(
    async (username, password, done): Promise<void> => {
      try {
        const user = await User.findOne({ user: username });
        if (!user) {
          done(null, false);
        }
        if (user && (await compare(password + process.env.SECRET, user.password))) {
          const claims = { id: user._id, name: user.user };
          const jwt = sign(claims, process.env.SECRET, { expiresIn: '1h' });
          const userData = user.toJSON();
          done(null, { ...userData, token: jwt });
        } else {
          done(null, false, { message: 'Email or password is incorrect' });
        }
      } catch (error) {
        // done(error, false);
      }
    },
  ),
);

passport.serializeUser(function (user: UserScemaInterface, done) {
  // serialize the username into session

  done(null, user._id);
});

passport.deserializeUser(async (req, id, done) => {
  // deserialize the username back into user object
  const user = await User.findById(id);
  done(null, user);
});

export { passport };
