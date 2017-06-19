import React from 'react';
import { connect } from 'react-redux';

import PlayerSearch from './components/PlayerSearch.js';

const mapStateToProps = (state) => {
  return {
    playerSearch: state.playerSearch
  }
};

class Home extends React.Component {
  render() {
    return <PlayerSearch dispatch={this.props.dispatch} playerSearch={this.props.playerSearch} />
  }
}

export default connect(mapStateToProps)(Home);