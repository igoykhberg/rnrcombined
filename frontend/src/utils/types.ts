export enum TAppActions {
  ACTION_APP_ADD_SYSTEM_LOG = 'ACTION_APP_ADD_SYSTEM_LOG',
  ACTION_APP_TOGGLE_MODAL = 'ACTION_APP_TOGGLE_MODAL',
  ACTION_APP_MODIFIY = 'ACTION_APP_MODIFIY',
}

export enum TSeverity {
  SEVERITY_ERROR = 'error',
  SEVERITY_SUCCESS = 'success',
  SEVERITY_INFO = 'info',
}

export enum TAppUXParams {
  PLAYER_SEARCH_DEBOUNCE_MS = 3000,
  SEARCH_DELAY_MS = 3000,
}

export enum TThemes {
  LIGHT = 'LIGHT',
  DARK = 'DARK',
}

export type TSystemLog = {
  iso: string;
  guid: string;
  severity: TSeverity;
  message: string;
};
export type TAppData = {
  systemLogs: TSystemLog & any[];
  isModalOpen: boolean;
  modified: TModifiedData;
};

export type TAppStore = {
  state: TAppData;
  dispatch: React.Dispatch<{ type: TAppActions; payload: any }> | undefined;
};

export enum TLayoutParameters {
  MARGIN_TOP_PX = 65,
  FOOTER_HEIGHT_PX = 80,
  PANEL_TOP_PX = 64,
}

export type TSearchState = {
  isLoading: boolean;
  isLoadingHistory: boolean;

  searchResults: TRandomPerson[];
  searchResultsHistory: TRandomPerson[];

  isEmptyResults: boolean;
  isEmptyResultsHistory: boolean;

  searchTerm: string;
  searchTermHistory: string;
};

export enum TFetchActions {
  ACTION_SEARCH_INPUT_CHANGE = 'ACTION_SEARCH_INPUT_CHANGE',
  ACTION_SEARCH_RESULTS_RECEIVED = 'ACTION_SEARCH_RESULTS_RECEIVED',
  ACTION_SEARCH_RESULTS_RECEIVED_HISTORY = 'ACTION_SEARCH_RESULTS_RECEIVED_HISTORY',
  ACTION_SEARCH_RESET_HISTORY = 'ACTION_SEARCH_RESET_HISTORY',
  ACTION_SEARCH_START_PROCESS = 'ACTION_SEARCH_START_PROCESS',
  ACTION_SEARCH_START_PROCESS_HISTORY = 'ACTION_SEARCH_START_PROCESS_HISTORY',
  ACTION_SEARCH_NO_RESULTS_FOUND = 'ACTION_SEARCH_NO_RESULTS_FOUND',
  ACTION_SEARCH_NO_RESULTS_FOUND_HISTORY = 'ACTION_SEARCH_NO_RESULTS_FOUND_HISTORY',
  ACTION_UPDATE_SEARCH_RESULTS = 'ACTION_UPDATE_SEARCH_RESULTS',
  ACTION_SEARCH_TERM = 'ACTION_SEARCH_TERM',
  ACTION_SEARCH_TERM_HISTORY = 'ACTION_SEARCH_TERM_HISTORY',
}

export type TRandomPerson = {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  location: {
    street: {
      number: number;
      name: string;
    };
    city: string;
    state: string;
    country: string;
    postcode: string;
    coordinates: {
      latitude: string;
      longitude: string;
    };
    timezone: {
      offset: string;
      description: string;
    };
  };
  email: string;
  login: {
    uuid: string;
    username: string;
    password: string;
    salt: string;
    md5: string;
    sha1: string;
    sha256: string;
  };
  dob: {
    date: string;
    age: number;
  };
  registered: {
    date: string;
    age: number;
  };
  phone: string;
  cell: string;
  id: {
    name: string;
    value: string;
  };
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  nat: string;
};
export type TInfoRandomPeopleAPIResponse = {
  seed: string;
  results: number;
  page: number;
  version: number;
};
export type TRandomPeopleAPIResponse = {
  results: TRandomPerson[];
  info: TInfoRandomPeopleAPIResponse;
};

export enum TDataSource {
  LIVE = 'live',
  HISTORY = 'history',
}
export enum TSearchResultsTableHeaders {
  THUMBNAIL = 'Thumbnail',
  NAME = 'Name',
  GENDER = 'Gender',
  COUNTRY = 'Country',
  PHONE = 'Phone number',
  EMAIL = 'Email',
}

export type TModifiedData = {
  source: TDataSource;
  data: TRandomPerson;
};
