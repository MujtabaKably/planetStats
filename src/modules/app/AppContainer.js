import React from 'react';

import { Provider } from "react-redux";
import { Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import Routes from './Routes.js';
import Layout from './components/Layout.js';

export default class App extends React.Component {
  render() {
    const store = this.props.store;

    return <Provider store={store} >
	       		<ConnectedRouter history={History} >
					<Layout >
						<Switch>
							<Routes/>
						</Switch>
					</Layout>
		   		</ConnectedRouter>
			 </Provider>
  }
}