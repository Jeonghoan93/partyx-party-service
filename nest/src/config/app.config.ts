import { ConfigFactory } from '@nestjs/config';

export const AppConfig: ConfigFactory = () => ({
  database: {
    type: 'mongodb',
    url: process.env.DATABASE_URL,
  },
  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY,
  },
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '60m' },
  },

  // ...other environment variables
});
