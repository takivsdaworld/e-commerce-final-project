import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI);
        console.log(`Successfully Connected to MongoDB`);
    } catch (error) {
        console.error(`ERROR: ${error.message}`);
        process.exit(1);
    }
}; 

export default connectDB;
