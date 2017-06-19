import React from "react";
import { connect } from 'react-redux';

import Header from "./Header.js" 
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Paper from 'material-ui/Paper';

injectTapEventPlugin();

const mapStateToProps = (state) => {
  return {
    app: state.app
  }
};

class Layout extends React.Component {
  render() {
    const theme = getMuiTheme(this.props.app.lightTheme == true ? lightBaseTheme : darkBaseTheme);
    
    return (<MuiThemeProvider muiTheme={theme}> 
    			<div>
    				<Header dispatch={this.props.dispatch} theme={this.props.app.lightTheme} drawerOpen={this.props.app.drawerOpen}/>
			 		{ this.props.children }
				</div>
			</MuiThemeProvider>)
  }
}

export default connect(mapStateToProps)(Layout);
