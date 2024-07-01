import React, { useReducer, createContext, useEffect, useContext } from 'react';
import { produce } from 'immer';
import { AppContext } from './app.context';
import * as api from '../utils/api';
import * as types from '../utils/types';

type TSearchStore = {
  state: types.TSearchState;
  dispatch:
    | React.Dispatch<{ type: types.TFetchActions; payload: any }>
    | undefined;
};

export const reducerSearch = (
  state: types.TSearchState,
  action: { type: types.TFetchActions; payload: any }
): types.TSearchState => {
  const { type, payload } = action;
  console.log(
    JSON.stringify({
      FROM: '>>> reducerSearch',
      type: type,
      payload: payload,
    })
  );
  switch (type) {
    case types.TFetchActions.ACTION_SEARCH_RESULTS_RECEIVED:
      return produce(state, (draft: types.TSearchState): any => {
        draft.isLoading = false;
        draft.searchResults = payload.searchResults;
      });

    case types.TFetchActions.ACTION_SEARCH_RESULTS_RECEIVED_HISTORY:
      return produce(state, (draft: types.TSearchState): any => {
        draft.isLoadingHistory = false;
        draft.searchResultsHistory = payload.searchResults;
      });

    case types.TFetchActions.ACTION_SEARCH_START_PROCESS:
      return produce(state, (draft: types.TSearchState): any => {
        draft.searchResults = [];
        draft.isLoading = true;
        draft.isEmptyResults = false;
      });

    case types.TFetchActions.ACTION_SEARCH_START_PROCESS_HISTORY:
      return produce(state, (draft: types.TSearchState): any => {
        draft.searchResultsHistory = [];
        draft.isLoadingHistory = true;
        draft.isEmptyResultsHistory = false;
      });

    case types.TFetchActions.ACTION_SEARCH_NO_RESULTS_FOUND:
      return produce(state, (draft: types.TSearchState): any => {
        draft.isEmptyResults = true;
      });

    case types.TFetchActions.ACTION_SEARCH_NO_RESULTS_FOUND_HISTORY:
      return produce(state, (draft: types.TSearchState): any => {
        draft.isEmptyResultsHistory = true;
      });

    case types.TFetchActions.ACTION_UPDATE_SEARCH_RESULTS:
      const uuidToSearch = payload.person.data.login.uuid;
      const indexToChange = state.searchResults.findIndex(
        (sr) => sr.login.uuid === uuidToSearch
      );
      const newFirstName = payload.nameEditted.split(' ')[0];
      const newLastName = payload.nameEditted.split(' ')[1];

      return produce(state, (draft: types.TSearchState): any => {
        draft.searchResults[indexToChange].name.first = newFirstName;
        draft.searchResults[indexToChange].name.last = newLastName;
      });

    case types.TFetchActions.ACTION_SEARCH_TERM:
      return produce(state, (draft: types.TSearchState): any => {
        draft.searchTerm = payload.searchTerm;
      });

    case types.TFetchActions.ACTION_SEARCH_TERM_HISTORY:
      return produce(state, (draft: types.TSearchState): any => {
        draft.searchTermHistory = payload.searchTermHistory;
      });

    default:
      return state;
  }
};
const initialSearchState: types.TSearchState = {
  isLoading: false,
  isLoadingHistory: false,

  searchResults: [],
  searchResultsHistory: [],

  isEmptyResults: false,
  isEmptyResultsHistory: false,

  searchTerm: '',
  searchTermHistory: '',
};

const initialSearchStore: TSearchStore = {
  state: initialSearchState,
  dispatch: undefined,
};

export const FetchContext = createContext(initialSearchStore);

export const WithFetchData = (props: any) => {
  const ac = useContext(AppContext);

  const [state, dispatch] = useReducer(reducerSearch, initialSearchState);

  const helperApiCall = async (dataSource = 'live') => {
    let resp,
      apiRunner,
      messageErrorStatusPrefix,
      actionSearchResultsReceived,
      actionNoResults,
      messageNoResults,
      messageSuccess;

    if (dataSource === 'live') {
      apiRunner = api.pplFetch;
      messageErrorStatusPrefix = 'ERROR_STATUS_';
      actionSearchResultsReceived =
        types.TFetchActions.ACTION_SEARCH_RESULTS_RECEIVED;
      actionNoResults = types.TFetchActions.ACTION_SEARCH_NO_RESULTS_FOUND;
      messageNoResults = 'NO_RESULTS_FOUND';
      messageSuccess = 'SUCCESS_FINDING_RESULTS';
    } else {
      apiRunner = api.pplHistory;
      messageErrorStatusPrefix = 'ERROR_STATUS_HISTORY';
      actionSearchResultsReceived =
        types.TFetchActions.ACTION_SEARCH_RESULTS_RECEIVED_HISTORY;
      actionNoResults =
        types.TFetchActions.ACTION_SEARCH_NO_RESULTS_FOUND_HISTORY;
      messageNoResults = 'NO_RESULTS_FOUND_HISTORY';
      messageSuccess = 'SUCCESS_FINDING_RESULTS_HISTORY';
    }

    try {
      resp = (await apiRunner()) as unknown as any;

      if (resp.status >= 400) {
        if (ac.dispatch)
          ac.dispatch({
            type: types.TAppActions.ACTION_APP_ADD_SYSTEM_LOG,
            payload: {
              severity: types.TSeverity.SEVERITY_ERROR,
              message: messageErrorStatusPrefix + resp.status,
            },
          });
      } else if (resp.data.results.length === 0) {
        dispatch({
          type: actionSearchResultsReceived,
          payload: {
            searchResults: [],
          },
        });
        dispatch({
          type: actionNoResults,
          payload: {},
        });
        if (ac.dispatch)
          ac.dispatch({
            type: types.TAppActions.ACTION_APP_ADD_SYSTEM_LOG,
            payload: {
              severity: types.TSeverity.SEVERITY_ERROR,
              message: messageNoResults,
            },
          });
      } else {
        dispatch({
          type: actionSearchResultsReceived,
          payload: {
            searchResults: resp.data.results,
          },
        });

        if (ac.dispatch)
          ac.dispatch({
            type: types.TAppActions.ACTION_APP_ADD_SYSTEM_LOG,
            payload: {
              severity: types.TSeverity.SEVERITY_SUCCESS,
              message: messageSuccess,
            },
          });
      }
    } catch (err) {
      if (ac.dispatch)
        ac.dispatch({
          type: types.TAppActions.ACTION_APP_ADD_SYSTEM_LOG,
          payload: {
            severity: types.TSeverity.SEVERITY_ERROR,
            message: 'ERROR_API_ERROR_CONTEXT',
            err: err,
          },
        });
    }
  };

  useEffect(() => {
    if (state.isLoading) {
      helperApiCall(types.TDataSource.LIVE);
    }

    if (state.isLoadingHistory) {
      helperApiCall(types.TDataSource.HISTORY);
    }
  }, [state.isLoading, state.isLoadingHistory]);

  return (
    <FetchContext.Provider value={{ state: state, dispatch: dispatch }}>
      {props.children}
    </FetchContext.Provider>
  );
};
