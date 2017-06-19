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
window.BaseKey = 's:initialTestPS2S';//"s:leigh103";
window.BaseRequestType = "get";
window.generalData = Data;

const app = document.getElementById('app');

ReactDOM.render(<App store={ setStore()} />, app);