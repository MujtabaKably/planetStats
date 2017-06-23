import React from 'react';
import Paper from 'material-ui/Paper';
import LinearProgress from 'material-ui/LinearProgress';
import Avatar from 'material-ui/Avatar';
import { push } from 'react-router-redux';

import _ from 'underscore';

class PlayerCard extends React.Component {
  handleCardClick() {
    this.props.dispatch(push(`/players/${this.props.playerInfo.name.first}`))
  }

  render() {
    const playerInfo = this.props.playerInfo;

    const styles = {
      grandParentDiv: {

      },

      paper: {
        width: '100%',
        marginBottom: '10px',
        height: '160px',
      },

      cardContainer: {
        height: '100%',
        padding: '0px'
      },

      cardInner1: {
        height: '100%',
        textAlign: 'center',
      },

      cardInner2: {
        height: '100%'
      },

      cardHeader: {
        width: '100%',
        fontWeight: 'bold',
        fontSize: '20px',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden'
      },

      cardSubtitle: {
        fontWeight: 'bold',
        width: '100%',
        fontSize: '11px',
      },

      parentDiv: {
        position: 'absolute',
        left: '25px',
        top: '10px'
      },

      brParent: {
        position: 'absolute',
        right: '25px',
        top: '5px',
      },

      br: {
        fontSize: '14px',
        fontWeight: 'bold'
      },

      brRank: {
        fontSize: '30px',
        fontWeight: 'bold'
      },

      brProgressDiv: {
        marginTop: '70px',
        marginLeft: '10px',
        marginRight: '10px'
      },

      brMessage: {
        fontWeight: 'bold',
        fontSize: '11px',
      },

      progress: {
        marginTop: '5px'
      },

      certDiv: {
        position: 'absolute',
        left: '25px',
        bottom: '15px'
      },

      cert: {
        fontWeight: 'bold',
        fontSize: '13px'
      },

      kdaDiv: {
        position: 'absolute',
        right: '25px',
        bottom: '15px'
      },

      kda: {
        fontWeight: 'bold',
        fontSize: '13px'
      },

      avatar: {
        width: '50px',
        height: 'auto',
        backgroundColor: 'unset',
        marginTop: '15px',
        marginLeft: '12px'
      },

      anchor: {
        cursor: 'pointer'
      },
    };

    // coloring based on faction colors
    styles.paper.backgroundColor = factionColors[playerInfo.faction_id].primary;
    styles.cardHeader.color = factionColors[playerInfo.faction_id].secondary;
    styles.cardSubtitle.color = factionColors[playerInfo.faction_id].tertiary;
    styles.br.color = factionColors[playerInfo.faction_id].tertiary;
    styles.brRank.color = factionColors[playerInfo.faction_id].secondary;
    styles.brMessage.color = factionColors[playerInfo.faction_id].secondary;
    styles.cert.color = factionColors[playerInfo.faction_id].secondary;
    styles.kda.color = factionColors[playerInfo.faction_id].tertiary;

    //plucking other data
    const factionInfo = generalData.factions[_.pluck(generalData.factions, 'faction_id').indexOf(playerInfo.faction_id)];
    const worldInfo = generalData.worlds[_.pluck(generalData.worlds, 'world_id').indexOf(playerInfo.world_id)];
    const factionImagePath = `${BaseUrl}${factionInfo.image_path}`

    //calculating KDA
    let KDA = 0.0;
    if (playerInfo.stats && playerInfo.stats.stat_history) {
      const statList = _.pluck(playerInfo.stats.stat_history, 'stat_name');
      const kills = playerInfo.stats.stat_history[statList.indexOf('kills')].all_time;
      let deaths = playerInfo.stats.stat_history[statList.indexOf('deaths')].all_time;
      deaths = deaths != 0 ? deaths : 1;
      KDA = parseFloat(kills / deaths).toFixed(3);
    }

    //fixing br 120 percent to next from 0 to 100
    const percentToNext = playerInfo.battle_rank.value == 120 ? 100 : parseFloat(playerInfo.battle_rank.percent_to_next);

    return <div className="col-xs-12 col-sm-6 col-md-4" style={styles.grandParentDiv}>
        <Paper style={styles.paper} rounded={true} >
          <div className="container-fluid row" style={styles.cardContainer}>
            {/*faction icon*/}
            <div className="col-xs-2" style={styles.cardInner1}>
              <Avatar src={factionImagePath} style={styles.avatar}/>
            </div>

            {/* main card body*/}
            <div className="col-xs-10" style={styles.cardInner2}>
              {/*player name, clickable anchor*/}
              <div style={styles.parentDiv}>
                <a style={styles.anchor} onClick={ this.handleCardClick.bind(this)}>
                  <div style={styles.cardHeader}>
                    {playerInfo.name.first.length > 15 ? playerInfo.name.first.substring(0,15) + '...' : playerInfo.name.first }
                  </div>
                </a>
                <div style={styles.cardSubtitle}>{factionInfo.name.en}, {worldInfo.name.en}</div>
              </div>

              {/* player battle rank */}
              <div style={styles.brParent}>
                <span style={styles.br}>BR </span><span style={styles.brRank}>{playerInfo.battle_rank.value}</span>
              </div>

              {/* BR progress bar */}
              <div style={styles.brProgressDiv}>
                <span style={styles.brMessage}>Progress To Next Rank ( {percentToNext}% )</span>
                <LinearProgress style={styles.progress} color={factionColors[playerInfo.faction_id].secondary} mode="determinate" value={ percentToNext}/>
              </div>

              {/*certs div */}
              <div style={styles.certDiv}>
                <span style={styles.cert}>Certs: {playerInfo.certs.available_points}</span>
              </div>

              {/*KDA div*/}
              <div style={styles.kdaDiv}>
                <span style={styles.kda}>KDA: {KDA}</span>
              </div>
            </div>  
          </div>
        </Paper>
         </div>
  }
}

export default PlayerCard;