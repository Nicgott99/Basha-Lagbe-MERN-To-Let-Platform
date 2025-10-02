import mongoose from 'mongoose';
import User from './models/user.model.js';
import bcryptjs from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

async function checkAndCreateAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('✅ Connected to MongoDB');
    
    const adminEmail = 'hasibullah.khan.alvie@g.bracu.ac.bd';
    const adminPassword = 'admin123456';
    
    let adminUser = await User.findOne({ email: adminEmail });
    
    if (adminUser) {
      console.log('✅ Admin user exists');
      console.log('Email:', adminUser.email);
      console.log('Role:', adminUser.role);
      console.log('Name:', adminUser.fullName);
    } else {
      console.log('❌ Admin user does not exist. Creating...');
      
      const hashedPassword = bcryptjs.hashSync(adminPassword, 10);
      
      adminUser = new User({
        fullName: 'Admin - Hasib Ullah Khan Alvie',
        email: adminEmail,
        password: hashedPassword,
        role: 'admin',
        isEmailVerified: true,
        mobileNumber: '+8801234567890'
      });
      
      await adminUser.save();
      console.log('✅ Admin user created successfully');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

checkAndCreateAdmin();