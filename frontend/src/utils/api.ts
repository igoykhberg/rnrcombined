import axios from 'axios';
import * as types from './types';
import * as helpers from './helpers';

const endpointFetch = import.meta.env.VITE_ENDPOINT_FETCH;
const endpointSave = import.meta.env.VITE_ENDPOINT_SAVE;
const endpointDelete = import.meta.env.VITE_ENDPOINT_DELETE;
const endpointHistory = import.meta.env.VITE_ENDPOINT_HISTORY;

/** NEW */

const pplFetch = async () => {
  try {
    await helpers.delay(types.TAppUXParams.SEARCH_DELAY_MS);
    const resp = await axios.get(endpointFetch);
    console.dir(
      {
        FROM: 'pplFetch',
        resp: resp,
      },
      { depth: 8 }
    );
    return resp;
  } catch (err) {
    throw {
      ERROR: 'ERROR_API_REQUEST in pplFetch',
      err: err,
    };
  }
};

const pplHistory = async () => {
  try {
    await helpers.delay(types.TAppUXParams.SEARCH_DELAY_MS);
    const resp = await axios.get(endpointHistory);
    console.dir(
      {
        FROM: 'pplFetch',
        resp: resp,
      },
      { depth: 8 }
    );
    return resp;
  } catch (err) {
    throw {
      ERROR: 'ERROR_API_REQUEST in pplFetch',
      err: err,
    };
  }
};

const pplSave = async (person: types.TRandomPerson) => {
  console.dir({
    from: 'pplSave',
    person: person,
  });
  try {
    await helpers.delay(types.TAppUXParams.SEARCH_DELAY_MS);
    const resp = await axios.post(endpointSave, { data: person });
    return resp.data;
  } catch (err) {
    throw {
      ERROR: 'ERROR_API_REQUEST in pplSave',
      err: err,
    };
  }
};

const pplDelete = async (person: types.TRandomPerson) => {
  try {
    await helpers.delay(types.TAppUXParams.SEARCH_DELAY_MS);
    const resp = await axios.delete(endpointDelete, { data: person });
    return resp.data;
  } catch (err) {
    throw {
      ERROR: 'ERROR_API_REQUEST in pplDelete',
      err: err,
    };
  }
};

export { pplFetch, pplSave, pplDelete, pplHistory };
