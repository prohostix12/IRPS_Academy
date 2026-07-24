import { neon } from '@neondatabase/serverless';

export const getDb = () => {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error('DATABASE_URL is not set. Please add it to your .env file.');
  }
  return neon(databaseUrl);
};
