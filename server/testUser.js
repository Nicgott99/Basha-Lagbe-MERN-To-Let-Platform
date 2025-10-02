import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function createTestUser() {
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email: 'test@example.com' });
    if (existingUser) {
      console.log('Test user already exists:', existingUser.email);
      return existingUser;
    }

    // Create new test user
    const hashedPassword = bcryptjs.hashSync('testpassword', 10);
    
    const testUser = new User({
      email: 'test@example.com',
      password: hashedPassword,
      fullName: 'Test User',
      mobileNumber: '01712345678',
      age: 25,
      address: 'Test Address, Dhaka',
      role: 'user',
      avatar: 'https://via.placeholder.com/150',
      isEmailVerified: true
    });

    await testUser.save();
    console.log('✅ Test user created successfully:', testUser.email);
    console.log('🔑 Password: testpassword');
    
    return testUser;
  } catch (error) {
    console.error('❌ Error creating test user:', error);
  } finally {
    mongoose.disconnect();
  }
}

createTestUser();