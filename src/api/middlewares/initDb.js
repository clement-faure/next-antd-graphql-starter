import mongoose from 'mongoose';

// Initialize mongoose models
import '~/api/models';

export async function connectToDb() {
  if (![1, 2].includes(mongoose.connection.readyState)) {
    return mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
    });
  }
  return null;
}

async function initDb(req, res, next) {
  try {
    mongoose.set('useUnifiedTopology', true);

    // Connect to database
    await connectToDb();

    // Db connection close should happen on lambda destruction
    next();
  } catch (err) {
    res.status(500).send('Unable to connect to the database');
  }
}

export default initDb;
