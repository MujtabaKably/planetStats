import playerProfileActions from './playerProfileActions.js';

const defaultState = {
  serverList: {
    "PC": 'ps2:v2',
    "PS4US": 'ps2ps4us',
    "PS4EU": 'ps2ps4eu'
  },
  activeServer: "",
  searchState: "NOT_STARTED",
  playerData: {}
};

const playerProfileReducer = (state = defaultState, action, rootState) => {
  const newState = Object.assign({}, state);

  switch (action.type) {

  case playerProfileActions.actionConstants.SEARCH_SERVER_CHANGE:
    newState.activeServer = action.payload.server
    return newState;

  case playerProfileActions.actionConstants.SEARCH_STATE_CHANGE:
    newState.searchState = action.payload.state
    return newState;

  case playerProfileActions.actionConstants.BASIC_PROFILE_UPDATED:
    newState.playerData.basicProfile = action.payload.basicProfile;
    return newState;
  
  default:
    return newState;
  }

};

export default playerProfileReducer;