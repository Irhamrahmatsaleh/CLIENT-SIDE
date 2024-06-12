import { RedisClientType, createClient } from 'redis';

export let redisClient : RedisClientType<any,any,any>;
export async function InitializeRedis(){
    redisClient = await createClient({
        url: `${process.env.REDIS_URL}`,
      })
    .on('error', err => console.log('Redis Client Error', err))
    .connect();

    console.log("Redis Connected!");
}
