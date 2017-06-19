import appActions from './appActions'

const defaultState = {
  lightTheme: false,
  drawerOpen: false,
};

const appReducer = (state = defaultState, action, rootState) => {
  const newState = Object.assign({}, state);

  switch (action.type) {

  case appActions.actionConstants.THEME_CHANGED:
    newState.lightTheme = action.payload && action.payload.theme !== undefined ? action.payload.theme : !newState.lightTheme;
    return newState;

  case appActions.actionConstants.TOGGLE_MENU:
    newState.drawerOpen = !newState.drawerOpen;
    return newState;

  default:
    return newState;
  }
}

export default appReducer;