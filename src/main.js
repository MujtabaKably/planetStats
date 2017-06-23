//dependancies
import React from "react";
import ReactDOM from "react-dom";

//custom components
import App from './modules/app/AppContainer.js';
import appActions from './modules/app/appActions.js';


//other scripts
import setStore from './store.js';
import Data from './modules/app/data/preQueriedData.js'

window.BaseUrl = "https://census.daybreakgames.com";
window.BaseKey = 's:initialTestPS2S'; //"s:leigh103";
window.BaseRequestType = "get";
window.generalData = Data;
window.factionColors = {
  0: {
    primary: '#F89406',
    secondary: '#F0F0F0',
    tertiary: '#FFFFFF'
  },
  1: {
    primary: '#441A4B',
    secondary: '#2BBBAD',
    tertiary: '#95c1be'
  },
  2: {
    primary: '#3b5998',
    secondary: '#FFDF00',
    tertiary: '#efe386'
  },
  3: {
    primary: '#bf1915',
    secondary: '#191919',
    tertiary: '#d1d1d1',
  },
};

const app = document.getElementById('app');

ReactDOM.render(<App store={ setStore()} />, app);