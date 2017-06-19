import appReducer from './appReducer';
import playerSearchReducer from '../home/playerSearchReducer';

const reducers = (state = {}, action) => {
  return {
    app: appReducer(state.app, action, state),
    playerSearch: playerSearchReducer(state.playerSearch, action, state)
  };
};

export default reducers;