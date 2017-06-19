import playerSearchActions from './playerSearchActions'

const defaultState = {
  serverType: 'ps2:v2',
  searchText: '',
  selected: '',
  playerList: [],
  searchState: 'NOT_STARTED',
  updateTimeStamp: Date.now(),
};

const appReducer = (state = defaultState, action, rootState) => {
  const newState = Object.assign({}, state);

  switch (action.type) {

  case playerSearchActions.actionConstants.SERVER_TYPE_CHANGED:
    newState.serverType = action.payload.serverType;
    return newState;

  case playerSearchActions.actionConstants.SEARCH_TEXT_CHANGED:
    newState.searchText = action.payload.searchText;
    return newState;

  case playerSearchActions.actionConstants.PLAYER_LIST_UPDATED:
    if (action.payload.timeStamp) {
      if (action.payload.timeStamp >= newState.updateTimeStamp) {
        newState.playerList = action.payload.playerList;
        newState.updateTimeStamp = action.payload.timeStamp;
      }
    } else {
      newState.playerList = action.payload.playerList
    }
    return newState;

  case playerSearchActions.actionConstants.PLAYER_SEARCH_STATE_CHANGED:
    if (action.payload.state == 'ERROR') {
      newState.playerList = [];
    }

    if (action.payload.timeStamp) {
      if (action.payload.timeStamp >= newState.updateTimeStamp) {
        newState.updateTimeStamp = action.payload.timeStamp;
        newState.searchState = action.payload.state;
      }
    } else {
      newState.searchState = action.payload.state;
    }

    return newState;

  default:
    return newState;
  }
}

export default appReducer;