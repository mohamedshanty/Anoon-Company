import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise;

if (!process.env.MONGODB_URI && process.env.NODE_ENV === 'production') {
  console.warn('Warning: MONGODB_URI is missing. Database features will be disabled.');
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else if (uri) {
  try {
    client = new MongoClient(uri, options);
    clientPromise = client.connect().catch(err => {
      console.error('MongoDB connection failed:', err.message);
      return null;
    });
  } catch (err) {
    clientPromise = Promise.resolve(null);
  }
} else {
  clientPromise = Promise.resolve(null);
}

export default clientPromise;
