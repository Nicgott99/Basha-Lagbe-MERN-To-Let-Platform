import mongoose from 'mongoose';
import Location, { popularAreas } from './models/location.model.js';
import User from './models/User.js';

export const initializeDatabase = async () => {
  try {
    console.log('🔄 Initializing database...');
    
    // Check if locations exist, if not seed them
    const locationCount = await Location.countDocuments();
    if (locationCount === 0) {
      console.log('📍 Seeding locations...');
      await Location.insertMany(popularAreas);
      console.log('✅ Locations seeded successfully');
    }
    
    // Check if admin user exists, if not create one
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminExists = await User.findOne({ email: adminEmail });
    
    if (!adminExists) {
      console.log('👑 Creating admin user...');
      
      const adminUser = new User({
        fullName: 'MD HASIB ULLAH KHAN ALVIE',
        email: adminEmail,
        password: 'admin123456', // Will be hashed by pre-save hook
        mobileNumber: '01700000000',
        age: 25,
        role: 'admin',
        isEmailVerified: true
      });
      
      await adminUser.save();
      console.log('✅ Admin user created successfully');
      console.log(`📧 Admin email: ${adminEmail}`);
      console.log('🔑 Admin password: admin123456');
    }
    
    console.log('✅ Database initialization complete');
  } catch (error) {
    console.error('❌ Database initialization error:', error);
  }
};
