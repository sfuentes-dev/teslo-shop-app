import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';

import { db } from '@/database';
import { User } from '@/models';
import { jwt, validations } from '@/utils';

type Data =
  | {
      message: string;
    }
  | {
      token: string;
      user: {
        email: string;
        name: string;
        role: string;
      };
    };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'POST':
      return registerUser(req, res);

    default:
      res.status(400).json({
        message: 'Bad Request',
      });
  }
}
const registerUser = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const {
    email = '',
    password = '',
    name = '',
  } = req.body as { email: string; password: string; name: string };

  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: 'The password must be of minimum 6 characters' });
  }

  if (name.length < 2) {
    return res
      .status(400)
      .json({ message: 'The name must be of minimum 2 characters' });
  }

  if (!validations.isValidEmail(email)) {
    return res.status(400).json({
      message:
        'The entered email does not contain the correct format of an email',
    });
  }

  await db.connect();
  const user = await User.findOne({ email });

  if (user) {
    return res.status(400).json({
      message: 'There is already an account created with this email',
    });
  }

  const newUser = new User({
    email: email.toLowerCase(),
    password: bcrypt.hashSync(password),
    role: 'client',
    name,
  });

  try {
    await newUser.save({ validateBeforeSave: true });
  } catch (error) {
    return res.status(500).json({
      message: 'Review server logs',
    });
  }

  const { role, _id } = newUser;

  const token = jwt.signToken(_id, email);

  return res.status(200).json({
    token,
    user: {
      email,
      role,
      name,
    },
  });
};
