import jwt from 'jsonwebtoken';

export const signToken = (_id: string, email: string) => {
  if (!process.env.JWT_SECRET_SEED) {
    throw new Error(
      'There is not a JWT Seed - Check your environment variables'
    );
  }

  return jwt.sign(
    //Payload:
    { _id, email },

    //Seed:
    process.env.JWT_SECRET_SEED,

    //Options:
    { expiresIn: '30d' }
  );
};

export const isValidToken = (token: string): Promise<string> => {
  if (!process.env.JWT_SECRET_SEED) {
    throw new Error(
      'There is not a JWT Seed - Check your environment variables'
    );
  }

  return new Promise((resolve, reject) => {
    try {
      jwt.verify(token, process.env.JWT_SECRET_SEED || '', (err, payload) => {
        if (err) return reject('JWT Invalid');

        const { _id } = payload as { _id: string };

        resolve(_id);
      });
    } catch (error) {
      reject('JWT Invalid');
    }
  });
};
