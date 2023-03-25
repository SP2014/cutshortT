import mongoose from 'mongoose';
import config from 'config';

//const dbUrl = `mongodb://${config.get('dbName')}:${config.get('dbPass')}@${config.get('dbHost')}:${config.get('dbPort')}/cutshort?authSource=admin`;
//const dbUrl = 'mongodb://root:test123@mongo:27017'
const dbUrl = `mongodb+srv://aashishkatlam:Ashrock_1993@cluster0.1bkdaob.mongodb.net/test`;
const connectDB = async () => {
  try {
    const mongooseOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: false,
      serverSelectionTimeoutMS: 5000,
    };
    console.log(dbUrl);
    await mongoose.connect(dbUrl, mongooseOptions);
    console.log('Database connected...');
  } catch (error: any) {
    console.log(error.message);
    setTimeout(connectDB, 5000);
  }
};

export default connectDB;
