import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import Drawer from 'material-ui/Drawer';
import { List, ListItem } from 'material-ui/List';
import ActionHome from 'material-ui/svg-icons/action/home';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import { push } from 'react-router-redux'

import appActions from '../appActions.js'

class ToggleTheme extends React.Component {
  render() {
    const style = {
      height: '100%',
      // paddingTop: '12px',
      width: '165px'
    };

    const styles = {
      thumbOff: {
        backgroundColor: '#ffcccc',
      },
      trackOff: {
        backgroundColor: '#ff9d9d',
      },
      thumbSwitched: {
        backgroundColor: 'red',
      },
      trackSwitched: {
        backgroundColor: '#ff9d9d',
      }
    };

    const labelText = this.props.value ? 'Light Theme' : 'Light Theme';
    return <Toggle
      label={ labelText }
      style={ style }
      toggled={ this.props.value }
      onToggle={ this.props.onToggle}
      thumbStyle={styles.thumbOff}
      trackStyle={styles.trackOff}
      thumbSwitchedStyle={styles.thumbSwitched}
      trackSwitchedStyle={styles.trackSwitched} />
  }
}

class Header extends React.Component {
  handleMenutoggle() {
    this.props.dispatch(appActions.toggleMenu());
  }

  render() {
    return <div>
    	<AppBar title="PlanetSide 2 Stats" onLeftIconButtonTouchTap={this.handleMenutoggle.bind(this)}/>
    	<SideDrawer open={this.props.drawerOpen} dispatch={this.props.dispatch} theme={this.props.theme}>
    	</SideDrawer>
    </div>

  }
}

class SideDrawer extends React.Component {
  handleThemeChange() {
    this.props.dispatch(appActions.themeChanged());
  }

  handleMenutoggle() {
    this.props.dispatch(appActions.toggleMenu());
  }

  handleHomeClick() {
  	this.props.dispatch(push('/'));
  	this.props.dispatch(appActions.toggleMenu());
  }

  render() {
    const styles = {
      nestedList: {
      }
    }

    return <Drawer open={this.props.open } docked={false} onRequestChange={this.handleMenutoggle.bind(this)}>
    		<List>
    			<Subheader><b>Navigate</b></Subheader>
    			<ListItem primaryText="Home" leftIcon={<ActionHome />} onClick={this.handleHomeClick.bind(this)}/>
    			<Divider />
    			<Subheader><b>Settings</b></Subheader>
    			<ListItem primaryText = {<ToggleTheme onToggle={this.handleThemeChange.bind(this)} value = {this.props.theme}/>} />
    		</List>
		   </Drawer>;
  }
}

export default Header