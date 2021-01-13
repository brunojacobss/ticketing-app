import { Request } from 'express';
import { UserDoc } from '../models/user';
import jwt from 'jsonwebtoken';

export const manageJwt = (req: Request, user: UserDoc) => {
  try {
    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!
    );

    // Store it on session object (cookie)
    req.session = {
      jwt: userJwt,
    };
  } catch (err) {
    throw new Error(err.message);
  }
};
