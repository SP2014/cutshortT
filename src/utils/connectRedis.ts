import { createClient } from 'redis';

const redisUrl = `redis://redis-14706.c16.us-east-1-3.ec2.cloud.redislabs.com:14706`;
const redisClient = createClient({ url: redisUrl });

const connectRedis = async () => {
  try {
    await redisClient.connect();
    console.log('Redis client connected...');
  } catch (error: any) {
    console.log(error.message);
    setTimeout(connectRedis, 5000);
  }
};

connectRedis();
redisClient.on('error', (err) => console.log(err));

export default redisClient;
