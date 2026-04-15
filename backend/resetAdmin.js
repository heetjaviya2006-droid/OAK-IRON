import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/heet_project_db')
  .then(async () => {
    const db = mongoose.connection.db;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash('123456', salt);
    await db.collection('users').updateOne({ email: 'admin@admin.com' }, { $set: { password: hash } });
    console.log('Password reset to 123456');
    process.exit(0);
  });
