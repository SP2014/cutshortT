import { createClient } from 'redis';

const redisUrl = `redis://localhost:6379`;
const redisClient = createClient({ url: process.env.REDIS_URL });

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
