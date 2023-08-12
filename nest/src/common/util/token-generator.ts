import jwt from 'jsonwebtoken';

export const generateAuthToken = async (id: string) => {
  return jwt.sign({ _id: id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

export const decodeAuthToken = async (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
