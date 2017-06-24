import axios from 'axios';
import _ from "underscore";

const playerSearchActions = {
  actionConstants: {
    SERVER_TYPE_CHANGED: 'SERVER_TYPE_CHANGED',
    SEARCH_TEXT_CHANGED: 'SEARCH_TEXT_CHANGED',
    PLAYER_LIST_UPDATED: 'PLAYER_LIST_UPDATED',
    PLAYER_SEARCH_STATE_CHANGED: 'PLAYER_SEARCH_STATE_CHANGED',
    PLAYER_PINNED: 'PLAYER_PINNED',
    PLAYER_UNPINNED: 'PLAYER_UNPINNED',
    CLEAR_PINNED_PLAYERS: 'CLEAR_PINNED_PLAYERS',
    MINI_CARDS: 'MINI_CARDS',
    PINNED_COUNT_EXCECEDDED: 'PINNED_COUNT_EXCECEDDED',
    ALREADY_PINNED: 'ALREADY_PINNED',
    PINNED_COUNT_EXCECEDDED_SETTLED: 'PINNED_COUNT_EXCECEDDED_SETTLED',
    ALREADY_PINNED_SETTLED: 'ALREADY_PINNED_SETTLED'
  },

  serverTypeChanged(value, searchText) {
    return (dispatch) => {
      dispatch(this.serverTypeChange(value));
      const requestTimeStamp = Date.now();

      if (searchText && searchText.length >= 3) {
        const LCvalue = searchText.toLowerCase();


        dispatch(this.playerSearchStateChanged('PENDING'));
        this.getPlayerInfo(value, LCvalue)
          .then((response) => {
            if (response.status != 200 || !response.data || !response.data.character_list || response.data.character_list.length == 0) {
              throw new Error('something has gone amis');
            }
            dispatch(this.playerListUpdated(response.data.character_list, requestTimeStamp));
            dispatch(this.playerSearchStateChanged('COMPLETE', requestTimeStamp));
          })
          .catch((error) => {
            console.error(error);
            dispatch(this.playerSearchStateChanged('ERROR'));
          });
      } else {
        dispatch(this.playerListUpdated([]));
        dispatch(this.playerSearchStateChanged('NOT_STARTED', requestTimeStamp));
      }
    }
  },

  serverTypeChange(value) {
    return {
      type: this.actionConstants.SERVER_TYPE_CHANGED,
      payload: {
        serverType: value
      }
    };
  },

  searchTextChanged(value, serverType) {
    const LCvalue = value.toLowerCase()
    const requestTimeStamp = Date.now();

    return (dispatch) => {
      dispatch(this.searchTextChange(value));

      if (window.playerSearchTimeout) {
        clearTimeout(window.playerSearchTimeout);
      }

      if (value && value.length >= 3) {


        dispatch(this.playerSearchStateChanged('PENDING'));

        window.playerSearchTimeout = setTimeout(() => {
          this.getPlayerInfo(serverType, LCvalue)
            .then((response) => {
              if (response.status != 200 || !response.data || !response.data.character_list || response.data.character_list.length == 0) {
                throw new Error('something has gone amis');
              }
              dispatch(this.playerListUpdated(response.data.character_list, requestTimeStamp));
              dispatch(this.playerSearchStateChanged('COMPLETE', requestTimeStamp));
            })
            .catch((error) => {
              console.error(error);
              dispatch(this.playerSearchStateChanged('ERROR'));
            });
        }, 500);

      } else {
        dispatch(this.playerListUpdated([]));
        dispatch(this.playerSearchStateChanged('NOT_STARTED', requestTimeStamp));
      }

    }
  },

  searchTextChange(value) {
    return {
      type: this.actionConstants.SEARCH_TEXT_CHANGED,
      payload: {
        searchText: value
      }
    }
  },

  playerListUpdated(list, timeStamp) {
    return {
      type: this.actionConstants.PLAYER_LIST_UPDATED,
      payload: {
        playerList: list,
        timeStamp: timeStamp
      }
    }
  },

  playerSearchStateChanged(state, timeStamp) {
    return {
      type: this.actionConstants.PLAYER_SEARCH_STATE_CHANGED,
      payload: {
        state: state,
        timeStamp: timeStamp
      }
    }
  },

  pinPlayer(playerData, playersPinned) {
    return (dispatch) => {
      const pinned = _.pluck(playersPinned, 'character_id');
      const index = pinned.indexOf(playerData.character_id);

      if (index > -1) {
        dispatch(this.alreadyExists())
      } else if (pinned.length >= 3) {
        dispatch(this.pinCountExceeded())
      } else {
        dispatch({
          type: this.actionConstants.PLAYER_PINNED,
          payload: {
            playerData
          }
        });
      }
    }

  },

  unPinPlayer(playerData) {
    return {
      type: this.actionConstants.PLAYER_UNPINNED,
      payload: {
        playerData
      }
    }
  },

  clearPinnedPlayers() {
    return {
      type: this.actionConstants.CLEAR_PINNED_PLAYERS
    }
  },

  pinCountExceeded() {
    return {
      type: this.actionConstants.PINNED_COUNT_EXCECEDDED,
    }
  },

  alreadyExists() {
    return {
      type: this.actionConstants.ALREADY_PINNED,
    }
  },

  settleCountExceeded() {
    return {
      type: this.actionConstants.PINNED_COUNT_EXCECEDDED_SETTLED,
    }
  },

  settleAlreadyExists() {
    return {
      type: this.actionConstants.ALREADY_PINNED_SETTLED,
    }
  },
  
  getPlayerInfo(serverType, LCvalue) {
    return axios.get(`${BaseUrl}/${BaseKey}/${BaseRequestType}/${serverType}/character/?c:limit=10&c:sort=name.first_lower&name.first_lower=^${LCvalue}&c:resolve=world,stat_history&c:show=name.first,character_id,faction_id,battle_rank,certs.available_points`)
  }
}

export default playerSearchActions