export const generateAuthToken = async (id: string) => {
  return jwt.sign({ _id: id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};
