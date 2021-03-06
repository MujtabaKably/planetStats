import playerSearchActions from './playerSearchActions'
import _ from 'underscore';

window.getPinnedPlayers = () => {
  if (localStorage) {
    const pinnedPlayers = localStorage.getItem('pinnedPlayers');
    return pinnedPlayers ? JSON.parse(pinnedPlayers) : [];
  } else {
    return []
  }
}

window.setPinnedPlayers = (pinnedPlayers) => {
  if (localStorage) {
    localStorage.setItem('pinnedPlayers', JSON.stringify(pinnedPlayers));
  }
}

const defaultState = {
  serverType: 'ps2:v2',
  searchText: '',
  playerList: [],
  searchState: 'NOT_STARTED',
  updateTimeStamp: Date.now(),
  pinnedPlayers: getPinnedPlayers(),
  miniCards: false,
  playerExists: false,
  countExceeded: false
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
    return newState

  case playerSearchActions.actionConstants.PLAYER_PINNED:
    newState.pinnedPlayers.push(action.payload.playerData);
    //dont like it, will figure out a way to remove this from the reducer.
    let characterList = _.pluck(newState.pinnedPlayers, 'character_id');
    characterList = characterList.map((character) => {
      return {
        character_id: character
      }
    });

    setPinnedPlayers(characterList);
    return newState;

  case playerSearchActions.actionConstants.PLAYER_UNPINNED:
    //dont like it, will figure out a way to remove this from the reducer.
    let characterLists = _.pluck(newState.pinnedPlayers, 'character_id');

    const index = characterLists.indexOf(action.payload.playerData.character_id);
    characterLists.splice(index, 1)
    newState.pinnedPlayers.splice(index, 1)

    characterLists = characterLists.map((character) => {
      return {
        character_id: character
      }
    });

    setPinnedPlayers(characterLists);
    return newState;

  case playerSearchActions.actionConstants.CLEAR_PINNED_PLAYERS:
    newState.pinnedPlayers = [];
    //dont like it, will figure out a way to remove this from the reducer.
    setPinnedPlayers([]);
    return newState;

  case playerSearchActions.actionConstants.ALREADY_PINNED:
    newState.alreadyExists = true;
    return newState;

  case playerSearchActions.actionConstants.PINNED_COUNT_EXCECEDDED:
    newState.countExceeded = true;
    return newState;

  case playerSearchActions.actionConstants.ALREADY_PINNED_SETTLED:
    newState.alreadyExists = false;
    return newState;

  case playerSearchActions.actionConstants.PINNED_COUNT_EXCECEDDED_SETTLED:
    newState.countExceeded = false;
    return newState;

  default:
    return newState;
  }
}

export default appReducer;