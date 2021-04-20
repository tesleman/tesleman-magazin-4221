import { NextApiRequest, NextApiResponse } from 'next';
import connect from './core/connect';
import cookie from 'cookie';
import { UserScemaInterface } from './models/userScema';
import { passport } from './core/passport';
const login = connect();
interface NextApiRequestExtendes extends NextApiRequest {
  user: { user: UserScemaInterface; token: string };
}
login.post(passport.authenticate('local'), async (req: NextApiRequestExtendes, res) => {
  try {
    if (req.user) {
      res.setHeader(
        'Set-Cookie',
        cookie.serialize('Bearer', req.user.token, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development',
          sameSite: 'strict',
          maxAge: 3600,
          path: '/',
        }),
      );
      res.json({ message: 'Welcome back to the app!' });
    }
    res.json({ message: 'Ups, something went wrong!' });
  } catch (error) {
    console.log(error);
  }
});

login.get(
  passport.authenticate('jwt', { session: false }),
  async (req: NextApiRequestExtendes, res: NextApiResponse) => {
    try {
      if (req.user) res.status(200).json({ message: req.user });
      res.status(401).json({
        message: 'unautorize',
      });
    } catch (error) {
      res.status(401);
    }
  },
);

export default login;
