import Brute from 'express-brute';
import BruteRedis from 'express-brute-redis';

import redisConfig from '../config/redis';

const bruteStore = new BruteRedis(redisConfig);

export default new Brute(bruteStore);
