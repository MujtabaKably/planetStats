import React from 'react';

import { Provider } from "react-redux";
import { ConnectedRouter } from 'react-router-redux';

import Routes from './Routes.js';
import Layout from './components/Layout.js';

export default class App extends React.Component {
  render() {
    const store = this.props.store;

    return <Provider store={store} >
	       		<ConnectedRouter history={History} >
					<Layout >
						<Routes dispatch={this.props.store.dispatch}/>
					</Layout>
		   		</ConnectedRouter>
			 </Provider>
  }
}