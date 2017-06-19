import React from 'react';

import { Route, Switch } from 'react-router-dom';

import Home from '../home/HomeContainer.js'


class Routes extends React.Component {
  render() {
    return <div>
			<Switch >
				<Route exact path="/" component={Home} dispatch={this.props.dispatch}/>
	   		</Switch>
	   </div>;
  }
}

export default Routes;