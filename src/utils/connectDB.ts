import mongoose from 'mongoose';

//const dbUrl = `mongodb://test:test@123@localhost:6000/jwtAuth?authSource=admin`;
const dbUrl = `mongodb+srv://aashishkatlam:Ashrock_1993@cluster0.1bkdaob.mongodb.net/test`;
const connectDB = async () => {
  try {
    const mongooseOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: false,
      serverSelectionTimeoutMS: 5000,
    };
    await mongoose.connect(dbUrl, {});
    console.log('Database connected...');
  } catch (error: any) {
    console.log(error.message);
    setTimeout(connectDB, 5000);
  }
};

export default connectDB;
