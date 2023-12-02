import redis from 'redis';
import { promisify } from 'util';

/**
 * Class for Redis operations
 */

class RedisClient {
	constructor() {
		this.client = redis.createClient();
		this.getAsync = promisify(this.client.get).bind(this.client);

		this.client.on('error', (error) => {
			console.log(`Redis client not connected to the server: ${error.message}`);
		});

		this.client.on('connect', () => {
		});
	}

	/**
	 * Check if Redis connection is alive
	 * @return {boolean} true is connection is successful and false if not
	 */
	isAlive() {
		return this.client.connected;
	}

	async get(key) {
		const value = await this.getAsync(key);
		return value;
	}

	/**
	 * Create new key in redis with a TTL
	 * @key {string} key to be saved in redis
	 * @value {string} value to be assigned to the key
	 * @duration {number} key TTL
	 * @return {undefined} Null
	 */

	async set(key, value, duration) {
		this.client.setex(key, value, duration);
	}

	/**
	 * Deletes a key in redis
	 * @key {string} key to be deleted
	 * @return {undefined} Null
	 */

	async del(key) {
		this.client.del(key);
	}
}
const redisClient = new RedisClient();

export default redisClient;

