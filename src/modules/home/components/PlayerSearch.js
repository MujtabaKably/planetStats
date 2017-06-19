import React from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import CircularProgress from 'material-ui/CircularProgress';

import playerSearchActions from '../playerSearchActions.js';
import PlayerCard from './PlayerCard.js';

class PlayerSearch extends React.Component {
  handleSearchChange(e) {
    this.props.dispatch(playerSearchActions.searchTextChanged(e.target.value, this.props.playerSearch.serverType))
  }

  handleChange(event, value) {
    this.props.dispatch(playerSearchActions.serverTypeChanged(value, this.props.playerSearch.searchText));
  }

  render() {
    const styles = {
      cardDiv: {
        padding: '0px',
      },
      paper: {
        marginTop: '10px',
        marginBottom: '10px',
      },
      radioButtonGroup: {
        display: 'flex',
        padding: '10px',
        width: '100%',
      },
      radioButton: {
        width: 'auto',
        marginRight: '15px',
      },
      actionFavourite: {
        color: '#F44336'
      },
      textField: {
        paddingLeft: '10px',
        paddingRight: '10px',
        width: 'calc(100% - 20px)'
      },
      loadingDiv: {
        width: '100%',
        textAlign: 'center',
        marginTop: '25px'
      },
      notFoundDiv: {
        width: '100%',
        textAlign: 'center',
        marginTop: '25px'
      },
    };

    const playerSearch = this.props.playerSearch;

    const PlayerCards = [];
    let render;

    if (playerSearch.searchState == 'PENDING') {
      render = (<div style={styles.loadingDiv}>
                  <CircularProgress size={80}/>
                </div>)

    } else if ((playerSearch.searchState == 'COMPLETE' && playerSearch.playerList.length == 0) || playerSearch.searchState == 'ERROR') {
           render = (<div style={styles.notFoundDiv}>
                      <h3>Player '{playerSearch.searchText}' Not Found</h3>
                      <h5>Try Using Other Servers</h5>
                    </div>)
    } else {
      playerSearch.playerList.forEach((player, i) => {
        PlayerCards.push(<PlayerCard key = {i} playerInfo={player}/>);
      });
      render = PlayerCards
    }

    return <div>
            <Paper style={ styles.paper }>
              <TextField floatingLabelText="Player Name" fullWidth={true} style={styles.textField} value={playerSearch.searchText} onChange = {this.handleSearchChange.bind(this)}/>
                <RadioButtonGroup name="ServerType" style={ styles.radioButtonGroup } onChange={this.handleChange.bind(this)} valueSelected={playerSearch.serverType}> 
                  <RadioButton value="ps2:v2" label="PC" checkedIcon={<ActionFavorite style={styles.actionFavourite} />} uncheckedIcon={ <ActionFavoriteBorder /> } style={styles.radioButton} />
                  <RadioButton value="ps2ps4us" label="PS4US" style={styles.radioButton} />
                  <RadioButton value="ps2ps4eu" label="PS4EU" style={styles.radioButton} />
                </RadioButtonGroup>
             </Paper>
             <div className="container-fluid row" style={styles.cardDiv}>
              {render} 
             </div>
          </div>

  }
}

export default PlayerSearch