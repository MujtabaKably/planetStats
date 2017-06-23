import React from 'react';
import { connect } from 'react-redux';

import playerProfileActions from './playerProfileActions.js';

import SearchLoader from './components/SearchLoader';
import BasicProfile from './components/BasicProfile';

const mapStateToProps = (state) => {
  return {
    playerProfile: state.playerProfile
  }
};

class PlayerProfile extends React.Component {
  componentWillMount() {
    this.props.dispatch(playerProfileActions.searchPlayer(this.props.match.params.playerName, this.props.playerProfile.serverList))
  }

  render() {
  	const playerProfile = this.props.playerProfile;
    return <div class="row">
    			   <SearchLoader playerProfile = { playerProfile } playerName={ this.props.match.params.playerName } dispatch={this.props.dispatch}/>
    	       <BasicProfile basicProfile={playerProfile.playerData.basicProfile} />
           </div>
  }
}

export default connect(mapStateToProps)(PlayerProfile);