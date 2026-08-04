import { MongoClient, Db } from 'mongodb';

declare global {
  var _mongoClient: MongoClient | undefined;
  var _mongoDb: Db | undefined;
}

export async function getDb(): Promise<Db> {
  const uri = process.env.MONGODB_URI || process.env.DATABASE_URL;
  if (!uri) {
    throw new Error('Please define the MONGODB_URI or DATABASE_URL environment variable inside .env');
  }

  if (global._mongoDb) {
    return global._mongoDb;
  }

  if (!global._mongoClient) {
    global._mongoClient = new MongoClient(uri);
    await global._mongoClient.connect();
  }

  // Extract database name from connection string or default to 'irps_academy'
  const cleanUri = uri.split('?')[0];
  const urlParts = cleanUri.split('/');
  const dbName = urlParts[urlParts.length - 1] || 'irps_academy';

  global._mongoDb = global._mongoClient.db(dbName);
  return global._mongoDb;
}

