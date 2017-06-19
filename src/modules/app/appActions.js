const appActions = {
  actionConstants: {
    THEME_CHANGED: "THEME_CHANGED",
    TOGGLE_MENU:'TOGGLE_MENU'
  },

  themeChanged(value) {
    const actionObject = {
      type: this.actionConstants.THEME_CHANGED,
    };
    if (value !== undefined) {
      actionObject.payload = {
        theme: value
      }
    }
    return actionObject;
  },

  toggleMenu(){
    return {
      type: this.actionConstants.TOGGLE_MENU
    }
  }
}

export default appActions