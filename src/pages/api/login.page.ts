import { NextApiRequest, NextApiResponse } from 'next';

import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import connect from './core/connect';
import cookie from 'cookie';

import { User } from './models/userScema';

const login = connect();

login.post(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const user = await User.findOne({ user: req.body.name });

    compare(req.body.password + process.env.SECRET, user.password, function (err, result) {
      if (!err && result) {
        const claims = { sub: user._id, myPersonEmail: user.user };
        const jwt = sign(claims, process.env.SECRET, { expiresIn: '1h' });
        res.setHeader(
          'Set-Cookie',
          cookie.serialize('auth', jwt, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: 3600,
            path: '/',
          }),
        );
        res.json({ message: 'Welcome back to the app!' });
      } else {
        res.json({ message: 'Ups, something went wrong!' });
      }
    });
  } catch (error) {
    console.log(error);
  }
});

export default login;
