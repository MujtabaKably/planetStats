import axios from 'axios';

const playerProfileActions = {
  actionConstants: {
    SEARCH_SERVER_CHANGE: 'SEARCH_SERVER_CHANGE',
    SEARCH_STATE_CHANGE: 'SEARCH_STATE_CHANGE',
    BASIC_PROFILE_UPDATED: 'BASIC_PROFILE_UPDATED',
    EVENT_LIST_UPDATED: 'EVENT_LIST_UPDATED',
    STATS_UPDATED: 'STATS_UPDATED',
    KILL_BOARD_UPDATED: 'KILL_BOARD_UPDATED',
    GROUPED_KILLS_UPDATED: 'GROUPED_KILLS_UPDATED',
    GROUPED_DEATHS_UPDATED: 'GROUPED_DEATHS_UPDATED',
  },

  searchPlayer(playerName, serverList) {
    return (dispatch) => {
      const playerNameLC = playerName.toLowerCase();

      dispatch(this.searchStateChange('PENDING'));
      dispatch(this.searchServerChange('PC'));

      let selectedServer = serverList["PC"];
      coreObject.searchForPlayer(playerNameLC, selectedServer)
        .then((res) => {
          if (!res || !res.data || !res.data.character_list) {
            throw new Error('something has gone amiss');
          }

          if (res.data.character_list.length == 0) {

            dispatch(this.searchServerChange('PS4US'));
            selectedServer = serverList["PS4US"]
            coreObject.searchForPlayer(playerNameLC, selectedServer)
              .then((res) => {
                if (!res || !res.data || !res.data.character_list) {
                  throw new Error('something has gone amiss');
                }

                if (res.data.character_list.length == 0) {

                  dispatch(this.searchServerChange('PS4EU'));
                  selectedServer = serverList["PS4EU"];

                  coreObject.searchForPlayer(playerNameLC, selectedServer)
                    .then((res) => {
                      if (!res || !res.data || !res.data.character_list) {
                        throw new Error('something has gone amiss');
                      }

                      if (res.data.character_list.length == 0) {
                        dispatch(this.searchStateChange('NOT_FOUND'));
                      } else {
                        dispatch(this.searchStateChange('FOUND'));
                        dispatch(this.getPlayerProfile(res.data.character_list[0].character_id, selectedServer));

                      }
                    })
                    .catch((error) => {
                      console.error(error);
                      dispatch(this.searchStateChange('ERROR'));
                    });
                } else {
                  dispatch(this.searchStateChange('FOUND'));
                  dispatch(this.getPlayerProfile(res.data.character_list[0].character_id, selectedServer));

                }
              })
              .catch((error) => {
                console.error(error);
                dispatch(this.searchStateChange('ERROR'));
              })
          } else {
            dispatch(this.searchStateChange('FOUND'));
            dispatch(this.getPlayerProfile(res.data.character_list[0].character_id, selectedServer));
          }
        })
        .catch((error) => {
          console.error(error);
          dispatch(this.searchStateChange('ERROR'));
        })
    }
  },

  getPlayerProfile(character_id, server) {
    return (dispatch) => {
      dispatch(this.searchStateChange('GETTING_PROFILE'));
      coreObject.getBasicProfile(character_id, server)
        .then((res) => {
          if (!res || !res.data || !res.data.character_list || res.data.character_list.length == 0) {
            throw new Error('something has gone amiss');
          }
          //dispatch basic profile
          dispatch(this.basicProfileUpdated(res.data.character_list[0]));

          //promise chaining, calling the next promise
          return coreObject.getGroupKillStats(character_id, server)
        })
        .then((res) => {
          if (!res || !res.data || !res.data.characters_event_grouped_list ) {
            throw new Error('something has gone amiss');
          }
          //dispatch basic profile
          dispatch(this.groupKillsUpdated(res.data.characters_event_grouped_list[0]));

          //promise chaining, calling the next promise
          return coreObject.getGroupDeathStats(character_id, server)
        })
        .then((res) => {
          if (!res || !res.data || !res.data.characters_event_grouped_list ) {
            throw new Error('something has gone amiss');
          }
          //dispatch basic profile
          dispatch(this.groupDeathsUpdated(res.data.characters_event_grouped_list[0]));

          //promise chaining, calling the next promise
          return coreObject.getEventList(character_id, server)
        })
        .then((res) => {
          if (!res || !res.data || !res.data.characters_event_list) {
            throw new Error('something has gone amiss');
          }
          //dispatch event List
          dispatch(this.eventListUpdated(res.data.characters_event_list));

          //promise chaining, calling the next promise
          return coreObject.getPlayerStats(character_id, server)
        })
        .then((res) => {
          if (!res || !res.data || !res.data.characters_stat_list) {
            throw new Error('something has gone amiss');
          }
          dispatch(this.statsUpdated(res.data.characters_stat_list));

          //promise chaining, calling the next promise
          return coreObject.getPlayerKillBoard(character_id, server)
        })
        .then((res) => {
          if (!res || !res.data || !res.data.characters_event_list) {
            throw new Error('something has gone amiss');
          }

          dispatch(this.killBoardUpdated(res.data.characters_event_list));
          dispatch(this.searchStateChange('COMPLETE'));
        })
        .catch((error) => {
          console.error(error)
        })
    }
  },

  searchServerChange(server) {
    return {
      type: this.actionConstants.SEARCH_SERVER_CHANGE,
      payload: {
        server
      }
    }
  },

  searchStateChange(state) {
    return {
      type: this.actionConstants.SEARCH_STATE_CHANGE,
      payload: {
        state
      }
    }
  },

  basicProfileUpdated(basicProfile) {
    return {
      type: this.actionConstants.BASIC_PROFILE_UPDATED,
      payload: {
        basicProfile
      }
    }
  },

  statsUpdated(stats) {
    return {
      type: this.actionConstants.STATS_UPDATED,
      payload: {
        stats
      }
    }
  },

  eventListUpdated(eventList) {
    return {
      type: this.actionConstants.EVENT_LIST_UPDATED,
      payload: {
        eventList
      }
    }
  },

  killBoardUpdated(killBoard) {
    return {
      type: this.actionConstants.KILL_BOARD_UPDATED,
      payload: {
        killBoard
      }
    }
  },

  groupKillsUpdated(groupKillStats) {
    return {
      type: this.actionConstants.GROUPED_KILLS_UPDATED,
      payload: {
        groupKillStats
      }
    }
  },

  groupDeathsUpdated(groupDeathStats) {
    return {
      type: this.actionConstants.GROUPED_DEATHS_UPDATED,
      payload: {
        groupDeathStats
      }
    }
  }
}

const coreObject = {
  searchForPlayer(playerName, server) {
    const searchUrl = `${BaseUrl}/${BaseKey}/${BaseRequestType}/${server}/character/?name.first_lower=${playerName}&c:show=character_id,name.first_lower`
    return axios.get(searchUrl);
  },

  getBasicProfile(character_id, server) {
    const searchUrl = `${BaseUrl}/${BaseKey}/${BaseRequestType}/${server}/character/?character_id=${character_id}&c:resolve=outfit_member_extended&c:resolve=stat_history,stat_by_faction,stat,profile&c:resolve=online_status&c:resolve=world&c:join=world^on:world_id^to:world_id^inject_at:world_id`;
    return axios.get(searchUrl);
  },

  getEventList(character_id, server) {
    const searchUrl = `${BaseUrl}/${BaseKey}/${BaseRequestType}/${server}/characters_event/?character_id=${character_id}&c:limit=2000&type=DEATH,KILL,VEHICLE_DESTROY,%20ITEM,%20ACHIEVEMENT`;
    return axios.get(searchUrl);
  },

  getPlayerStats(character_id, server) {
    const searchUrl = `${BaseUrl}/${BaseKey}/${BaseRequestType}/${server}//characters_stat?character_id=${character_id}&c:limit=1000`;
    return axios.get(searchUrl);
  },

  getPlayerKillBoard(character_id, server) {
    const searchUrl = `${BaseUrl}/${BaseKey}/${BaseRequestType}/${server}/characters_event/?character_id=${character_id}&c:limit=1000&type=DEATH,KILL,VEHICLE_DESTROY&c:join=character^on:attacker_character_id^to:character_id^show:name.first%27battle_rank.value%27faction_id^inject_at:attacker&c:join=character^on:character_id^show:name.first%27battle_rank.value%27faction_id^inject_at:victim&c:join=item^on:attacker_weapon_id^to:item_id^show:name.en^inject_at:attacker.weapon&c:join=vehicle^on:attacker_vehicle_id^to:vehicle_id^show:name.en^inject_at:attacker.vehicle&c:join=vehicle^on:vehicle_definition_id^to:vehicle_id^show:name.en^inject_at:victim.vehicle&c:join=loadout^on:character_loadout_id^to:loadout_id^inject_at:victim_class&after=1497975162`;
    return axios.get(searchUrl);
  },

  getGroupKillStats(character_id, server) {
    const searchUrl = `${BaseUrl}/${BaseKey}/${BaseRequestType}/${server}/characters_event_grouped?character_id=${character_id}&type=KILL&c:sort=count&c:limit=1000&c:join=character^on:character_id^to:character_id^inject_at:character_name^show:name.first%27battle_rank.value%27faction_id`;
    return axios.get(searchUrl);
  },

  getGroupDeathStats(character_id, server) {
    const searchUrl = `${BaseUrl}/${BaseKey}/${BaseRequestType}/${server}/characters_event_grouped?character_id=${character_id}&type=DEATH&c:sort=count&c:limit=1000&c:join=character^on:character_id^to:character_id^inject_at:character_name^show:name.first%27battle_rank.value%27faction_id`;
    return axios.get(searchUrl);
  }

  // player wise Kills
  //http://census.daybreakgames.com/s:leigh103/get/ps2:v2/
  // player wise deaths
  //http://census.daybreakgames.com/s:leigh103/get/ps2:v2/
  //detailed killboard
  //http://census.daybreakgames.com/s:leigh103/get/ps2:v2/characters_event/?character_id=8262208505124695025&type=KILL,DEATH,VEHICLE_DESTROY&c:limit=1000&c:join=character^on:attacker_character_id^to:character_id^show:name.first%27battle_rank.value%27faction_id^inject_at:attacker&c:join=character^on:character_id^show:name.first%27battle_rank.value%27faction_id^inject_at:victim&c:join=item^on:attacker_weapon_id^to:item_id^inject_at:attacker.weapon&c:join=vehicle^on:attacker_vehicle_id^to:vehicle_id^show:name.en^inject_at:attacker.vehicle&c:join=vehicle^on:vehicle_definition_id^to:vehicle_id^show:name.en^inject_at:victim.vehicle&c:join=loadout^on:attacker_loadout_id^to:loadout_id^inject_at:attacker_class&c:join=loadout^on:character_loadout_id^to:loadout_id^inject_at:victim_class

}

export default playerProfileActions