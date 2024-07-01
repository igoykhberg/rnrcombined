import { RedisClientConnection } from './client';
import * as redis from 'redis';
import * as types from '../types';

const rcc = new RedisClientConnection();
const redisClient: redis.RedisClientType = rcc.getClient();

enum TRedisPrefix {
    RANDOM_PEOPLE = 'RANDOM_PEOPLE',
}

/** INTERNAL METHODS */
const _set = async (key, value) => {
    try {
        const rsp = await redisClient.SET(key, value);
        console.dir({
            FROM: '_set',
            rsp: rsp,
        });
        return rsp;
    } catch (err) {
        console.dir({
            ERROR: 'REDIS _set',
            err: err,
        });

        throw {
            ERROR: 'REDIS _set',
            err: err,
        };
    }
};

const _get = async (key) => {
    try {
        const value = await redisClient.GET(key);
        console.dir({
            FROM: 'redis _get',
            key: key,
            value: value,
        });
        return value;
    } catch (err) {
        console.dir({
            ERROR: 'REDIS _get',
            err: err,
        });

        throw {
            ERROR: 'REDIS _get',
            err: err,
        };
    }
};

const _exists = async (key) => {
    try {
        const value = await redisClient.EXISTS(key);
        console.dir({
            FROM: 'redis _exists',
            key: key,
            value: value,
        });
        return value;
    } catch (err) {
        console.dir({
            ERROR: 'REDIS _exists',
            err: err,
        });

        throw {
            ERROR: 'REDIS _exists',
            err: err,
        };
    }
};

const _del = async (key) => {
    try {
        const value = await redisClient.DEL(key);
        console.dir({
            FROM: 'redis _del',
            key: key,
            value: value,
        });
        return value;
    } catch (err) {
        console.dir({
            ERROR: 'REDIS _del',
            err: err,
        });

        throw {
            ERROR: 'REDIS _del',
            err: err,
        };
    }
};

const _keys = async (prefix) => {
    try {
        const keys = await redisClient.KEYS(`${prefix}:*`);
        console.dir({
            FROM: 'redis _keys',
            prefix: prefix,
            keys: keys,
        });
        return keys;
    } catch (err) {
        console.dir({
            ERROR: 'REDIS _keys',
            err: err,
        });

        throw {
            ERROR: 'REDIS _keys',
            err: err,
        };
    }
};

const _mget = async (keys: string[]) => {
    try {
        const data = await redisClient.MGET(keys);
        console.dir({
            FROM: 'redis _mget',
            keys: keys,
        });
        return data;
    } catch (err) {
        console.dir({
            ERROR: 'REDIS _mget',
            err: err,
        });

        throw {
            ERROR: 'REDIS _mget',
            err: err,
        };
    }
};

/** EXPOSED METHODS TO MIDDLEWARE*/

const redisKey = (prefix: string, query) => {
    return `${prefix}:${query}`;
};

const redisKeyPerson = (person: types.TRandomPerson) => {
    const username = person.login.username;
    const uuid = person.login.uuid;

    return redisKey(TRedisPrefix.RANDOM_PEOPLE, `${username}__${uuid}`);
};

export const rGetPerson = async (person: types.TRandomPerson) => {
    const key = redisKeyPerson(person);
    const resp = await _get(key);
    return resp;
};

export const rSetPerson = async (person: types.TRandomPerson) => {
    console.dir(
        {
            FROM: 'rSetPerson',
            person: person,
        },
        { depth: 8 }
    );

    const key = redisKeyPerson(person);
    const resp = await _set(key, JSON.stringify(person));
    console.dir(
        {
            FROM: 'rSetPerson',
            key: key,
            resp: resp,
        },
        { depth: 8 }
    );
    return resp;
};

export const rDeletePerson = async (person: types.TRandomPerson) => {
    const key = redisKeyPerson(person);
    const resp = await _del(key);
    return resp;
};

export const rGetByKeyStructure = async (
    prefix = TRedisPrefix.RANDOM_PEOPLE
) => {
    try {
        const keys = await _keys(prefix);

        if (keys.length === 0) {
            return [];
        }

        const values = await _mget(keys);

        const result = keys.map((key, index) => ({
            key,
            value: values[index],
        }));

        console.dir({
            FROM: 'redis getByKeyStructure',
            keysAndValues: result,
        });

        return result;
    } catch (err) {
        console.dir({
            ERROR: 'REDIS getByKeyStructure',
            err: err,
        });

        throw {
            ERROR: 'REDIS getByKeyStructure',
            err: err,
        };
    }
};
