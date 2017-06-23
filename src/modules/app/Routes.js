import React from 'react';

import { Route, Switch } from 'react-router-dom';

import Home from '../home/HomeContainer.js'
import PlayerProfile from '../playerProfile/PlayerProfileContainer.js'


class Routes extends React.Component {
  render() {
    return <div>
				<Route exact path="/" component={Home}/>
				<Route exact path="/players/:playerName" component={PlayerProfile}/>
	   		</div>
  }
}

export default Routes;