import { connect } from '../config/db.js';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';

const createAdminUser = async () => {
  try {
    await connect(); // Connect to database

    // Check if admin exists
    const adminExists = await User.findOne({ email: 'admin@email.com' });
    
    if (adminExists) {
      console.log('Admin user already exists');
      process.exit();
    }

    // Create admin user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('123456', salt);
    
    const adminUser = new User({
      username: 'admin',
      email: 'admin@email.com',
      password: hashedPassword,
      isAdmin: true
    });

    await adminUser.save();
    console.log('Admin user created successfully');
    process.exit();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

createAdminUser();