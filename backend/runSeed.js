require('dotenv').config();
const mongoose = require('mongoose');
const { seedTestData } = require('./services/seedData');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/psi-music-collection';

(async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB — running seed...');
    const result = await seedTestData();
    console.log('Seed result:', JSON.stringify(result, null, 2));
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Seed failed:', err && err.message ? err.message : err);
    process.exit(1);
  }
})();
