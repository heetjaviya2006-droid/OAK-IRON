import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB Atlas');

    // Delete any existing admin first
    await User.deleteMany({ email: 'admin@admin.com' });

    // Create via User model so the pre-save bcrypt hook runs
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@admin.com',
      password: '123456',
      role: 'admin',
    });

    console.log('\n✅ Admin user created successfully!');
    console.log('\n--- Admin Credentials ---');
    console.log('Email:    admin@admin.com');
    console.log('Password: 123456');
    console.log('Role:    ', admin.role);
    console.log('ID:      ', admin._id.toString());
    console.log('-------------------------\n');

    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

createAdmin();
