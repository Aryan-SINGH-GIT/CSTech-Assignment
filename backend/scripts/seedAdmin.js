const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();



const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected for Seeding');

        const adminEmail = 'admin@example.com';
        const adminPassword = 'admin123';

        // Check if admin exists
        const userExists = await User.findOne({ email: adminEmail });

        if (userExists) {
            console.log('Admin user already exists. Updating password...');
            userExists.password = adminPassword; // Pre-save hook will hash this
            await userExists.save();
            console.log('Admin password updated to: admin123');
        } else {
            console.log('Creating new admin user...');
            const user = await User.create({
                email: adminEmail,
                password: adminPassword,
                isAdmin: true
            });
            console.log('Admin user created successfully');
        }

        console.log('-----------------------------------');
        console.log('Login Credentials:');
        console.log(`Email: ${adminEmail}`);
        console.log(`Password: ${adminPassword}`);
        console.log('-----------------------------------');

        process.exit();
    } catch (error) {
        console.error('Error seeding admin:', error);
        process.exit(1);
    }
};

seedAdmin();
