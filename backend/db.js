const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log('⚡ Using existing MongoDB connection');
    return;
  }

  const uri = process.env.MONGODB_URI || process.env.MONGO_URI;

  if (!uri) {
    throw new Error('Neither MONGODB_URI nor MONGO_URI is defined in environment variables.');
  }

  try {
    const conn = await mongoose.connect(uri, {
      // Mongoose 7+ uses these by default, but explicit for clarity
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000,         // Close sockets after 45s of inactivity
      maxPoolSize: 10,                // Maintain up to 10 socket connections
    });

    isConnected = true;

    console.log(`✅ MongoDB Atlas connected: ${conn.connection.host}`);
    console.log(`📦 Database: ${conn.connection.name}`);
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    // Exit process with failure so the host (e.g., Railway/Render) restarts it
    process.exit(1);
  }
};

// Graceful shutdown — close connection when the process exits
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('🔌 MongoDB connection closed due to app termination');
  process.exit(0);
});

module.exports = connectDB;
