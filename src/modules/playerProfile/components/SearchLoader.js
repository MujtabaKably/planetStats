import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import FlatButton from 'material-ui/FlatButton';
import { push } from 'react-router-redux';

class SearchLoader extends React.Component {
  render() {
    const playerProfile = this.props.playerProfile;
    let render = null

    if (playerProfile.searchState == 'PENDING') {

      render = <Loader searchText={`Searching for ${this.props.playerName} in ${playerProfile.activeServer} Server`} />

    } else if (playerProfile.searchState == 'FOUND' || playerProfile.searchState == 'GETTING_PROFILE') {

      render = <Loader searchText={`Getting ${this.props.playerName} Player Profile`} secondaryText= {`Found in ${playerProfile.activeServer} Server `} />

    } else if (playerProfile.searchState == 'ERROR' || playerProfile.searchState == 'NOT_FOUND') {

      render = <NotFound playerName={this.props.playerName} dispatch={this.props.dispatch}/>

    }

    return render;
  }
}

class NotFound extends React.Component {
  handleClick() {
  	this.props.dispatch(push('/'))
  }

  render() {
    const styles = {
      div: {
        marginTop: '25px',
        textAlign: 'center',
      },
      infoDiv: {
        fontWeight: 'bold',
        fontSize: '16px',
        color: '#91211b'
      },
      messageDiv: {
        marginTop: '5px',
        fontSize: '15px',
        color: '#91211b'
      },
      searchLabel: {
        fontWeight: 'bold'
      }
    }

    return <div style = {styles.div}>
    			<div style= {styles.infoDiv}>
    				Player <i>{this.props.playerName}</i> Not Found
    			</div>
    			<div style={styles.messageDiv}>
    				Please Check the Player Name and 
    			</div>
    			<FlatButton labelStyle = {styles.searchLabel} label="Search Again" primary={true} onClick={this.handleClick.bind(this)}/>
    		</div>;
  }
}

class Loader extends React.Component {
  render() {
    const styles = {
      div: {
        marginTop: '25px',
        textAlign: 'center'
      },
      searchTextDiv: {
        marginTop: '15px',
        fontWeight: 'bold',
        fontSize: '16px'
      },
      secondaryTextDiv: {
        marginTop: '4px',
        fontSize: '14px'
      }
    }
    return <div style = {styles.div}>
					<CircularProgress size={80} />
					<div style={styles.searchTextDiv}>
						{this.props.searchText}
					</div>
					<div>
						{this.props.secondaryText}
					</div>
				</div>
  }
}
export default SearchLoader;