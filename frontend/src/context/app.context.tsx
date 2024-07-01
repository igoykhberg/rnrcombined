import React, { useReducer, createContext, useEffect } from 'react';
import * as types from '../utils/types.ts';
import { produce } from 'immer';
import { v4 as uuidv4 } from 'uuid';

const reducerApp = (
  state: types.TAppData,
  action: { type: types.TAppActions; payload: any }
) => {
  const { type, payload } = action;
  console.log(
    `[>>>] reducerApp -- type: ${type} -- payload: ${JSON.stringify(payload)}`
  );
  switch (type) {
    case types.TAppActions.ACTION_APP_ADD_SYSTEM_LOG:
      const { ...args } = payload;
      const now = new Date();
      const iso = now.toISOString();
      const guid = uuidv4();
      const _log = { ...args, iso: iso, guid: guid };
      return produce(state, (draft: types.TAppData): any => {
        if (_log) draft.systemLogs.push(_log);
      });
    case types.TAppActions.ACTION_APP_TOGGLE_MODAL:
      return produce(state, (draft: types.TAppData): any => {
        draft.isModalOpen = payload.isModalOpen;
        draft.modified = payload.isModalOpen ? payload.modified : {};
      });

    default:
      return state;
  }
};
const initialAppState: types.TAppData = {
  systemLogs: [
    { message: 'System messages will appear here...' },
  ] as unknown as types.TSystemLog & any[],
  isModalOpen: false,
  modified: {} as types.TModifiedData,
};

const initialAppStore: types.TAppStore = {
  state: initialAppState,
  dispatch: undefined,
};

export const AppContext = createContext(initialAppStore);

export const WithAppData = (props: any) => {
  const [state, dispatch] = useReducer(reducerApp, initialAppState);
  return (
    <AppContext.Provider value={{ state: state, dispatch: dispatch }}>
      {props.children}
    </AppContext.Provider>
  );
};
