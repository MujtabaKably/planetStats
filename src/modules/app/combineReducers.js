import appReducer from './appReducer';
import playerSearchReducer from '../home/playerSearchReducer';
import playerProfileReducer from '../playerProfile/playerProfileReducer';


const reducers = (state = {}, action) => {
  return {
    app: appReducer(state.app, action, state),
    playerSearch: playerSearchReducer(state.playerSearch, action, state),
    playerProfile: playerProfileReducer(state.playerProfile, action, state)
  };
};

export default reducers;