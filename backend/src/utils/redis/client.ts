import * as redis from 'redis';

export class RedisClientConnection {
    static instance;
    client = undefined;

    constructor() {
        if (RedisClientConnection.instance) {
            return RedisClientConnection.instance;
        } else {
            RedisClientConnection.instance = this;
            this.setupClient();
        }
    }

    setupClient = async () => {
        try {
            const redisHost = process.env.REDIS_HOST || 'localhost';
            const redisPort = process.env.REDIS_PORT || '6379';
            // const redisHost = 'localhost';
            // const redisPort = '6379';

            this.client = redis.createClient({
                url: `redis://${redisHost}:${redisPort}`,
            });
            await this.client.connect().then(() => Promise.resolve());

            this.client.on('connect', () =>
                console.log('Redis client connecting')
            );
            this.client.on('ready', () =>
                console.log('Redis client connected and ready to use')
            );
            this.client.on('error', (err) =>
                console.error('Redis client error', err)
            );
            this.client.on('end', () =>
                console.log('Redis client disconnected')
            );
            this.client.on('reconnecting', () =>
                console.log('Redis client reconnecting')
            );

            return Promise.resolve();
        } catch (err) {
            console.dir({
                ERROR: 'ERROR in setupClient RedisClientConnection',
                err: err,
            });
            // uncomment to crash app in case no redis connection
            // throw {
            //     ERROR: 'ERROR in setupClient RedisClientConnection',
            //     err: err,
            // };
        }
    };

    getClient = () => {
        return this.client;
    };

    killClient = () => {
        this.client.disconnect();
    };
}
