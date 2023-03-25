import mongoose from 'mongoose';
import config from 'config';

//const dbUrl = `mongodb://${config.get('dbName')}:${config.get('dbPass')}@${config.get('dbHost')}:${config.get('dbPort')}/cutshort?authSource=admin`;
const dbUrl = `mongodb+srv://aashishkatlam:Ashrock_1993@cluster0.1bkdaob.mongodb.net/test`;
const connectDB = async () => {
  try {
    const mongooseOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: false,
      serverSelectionTimeoutMS: 5000,
    };
    //console.log(dbUrl);
    mongoose.connect(dbUrl, mongooseOptions).then(()=> {
      console.log('Database connected...');
    });
    
  } catch (error: any) {
    console.log(error.message);
    setTimeout(connectDB, 5000);
  }
};

export default connectDB;
