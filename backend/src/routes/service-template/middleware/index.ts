import * as dotenv from 'dotenv';
dotenv.config();
import axios from 'axios';
import * as redis from '../../../utils/redis/helpers';
import * as types from '../../../utils/types';
import * as mock from '../../../utils/mock.json';

const EXTERNAL_API_RANDOM_PEOPLE_GENERATOR_ENDPOINT =
    process.env.EXTERNAL_API_RANDOM_PEOPLE_GENERATOR_ENDPOINT;

console.dir({
    FROM: 'MIDDLEWARE',
    EXTERNAL_API_RANDOM_PEOPLE_GENERATOR_ENDPOINT:
        EXTERNAL_API_RANDOM_PEOPLE_GENERATOR_ENDPOINT,
});

const fetchFromExternalApi = async () => {
    try {
        const options = {
            method: 'GET',
            url: EXTERNAL_API_RANDOM_PEOPLE_GENERATOR_ENDPOINT,
            params: { results: 10 },
        };
        const resp = await axios.request(options);
        console.dir({
            FROM: 'EXTERNAL_API_RANDOM_PEOPLE_GENERATOR_ENDPOINT',
            status: resp.status,
            statusText: resp.statusText,
        });
        return resp.data;
    } catch (err) {
        console.dir({
            ERROR: 'EXTERNAL_API_RANDOM_PEOPLE_GENERATOR_ENDPOINT',
            err: err,
        });
        throw {
            ERROR: 'EXTERNAL_API_RANDOM_PEOPLE_GENERATOR_ENDPOINT',
            err: err,
        };
    }
};

const mwFetch = async function (req: any, res, next) {
    try {
        const resp: types.TInfoRandomPeopleAPIResponse =
            await fetchFromExternalApi();
        req.resp = resp || [];
        next();
    } catch (err) {
        console.dir(
            {
                ERROR: 'mwFetch',
                err: err,
            },
            { depth: 8 }
        );
        res.status(500).send(err);
    }
};

const mwSave = async function (req: any, res, next) {
    try {
        console.dir(
            {
                FROM: 'mwSave',
                reqBody: req.body,
            },
            { depth: 8 }
        );

        const resp = await redis.rSetPerson(
            req.body.data as types.TRandomPerson
        );
        req.resp = { response: resp } || {};
        next();
    } catch (err) {
        console.dir(
            {
                ERROR: 'mwSave',
                err: err,
            },
            { depth: 8 }
        );
        res.status(500).send(err);
    }
};

const mwDelete = async function (req: any, res, next) {
    try {
        const resp = await redis.rDeletePerson(req.body as types.TRandomPerson);
        console.dir({
            FROM: 'mwDelete',
            reqBody: req.body,
            resp: resp,
        });
        req.resp = { response: resp } || {};
        next();
    } catch (err) {
        console.dir(
            {
                ERROR: 'mwDelete',
                err: err,
            },
            { depth: 8 }
        );
        res.status(500).send(err);
    }
};

const helperFormatHistoryResults = (history) => {
    return history.map((rec) => JSON.parse(rec.value));
};
const mwHistory = async function (req: any, res, next) {
    try {
        console.dir({
            FROM: 'rGetByKeyStructure',
        });

        const resp = await redis.rGetByKeyStructure();
        const formatted = helperFormatHistoryResults(resp);
        // console.dir({
        //     FROM: 'mwHistory after format',
        //     formatted: formatted,
        // });
        req.resp = { results: formatted } || {};
        next();
    } catch (err) {
        console.dir(
            {
                ERROR: 'mwHistory',
                err: err,
            },
            { depth: 8 }
        );
        res.status(500).send(err);
    }
};
export { mwFetch, mwSave, mwDelete, mwHistory };
