import React from 'react';
import Paper from 'material-ui/Paper';
import LinearProgress from 'material-ui/LinearProgress';
import Avatar from 'material-ui/Avatar';

import _ from 'underscore';

class PlayerCard extends React.Component {
  render() {
    const playerInfo = this.props.playerInfo;

    const styles = {
      grandParentDiv: {
        padding: '0px'
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
        fontSize: '20px'
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
      }
    };

    const factionColors = {
      0: {
        primary: '#F89406',
        secondary: '#F0F0F0',
        tertiary: '#FFFFFF'
      },
      1: {
        primary: '#441A4B',
        secondary: '#2BBBAD',
        tertiary: '#95c1be'
      },
      2: {
        primary: '#3b5998',
        secondary: '#FFDF00',
        tertiary: '#eadd7c'
      },
      3: {
        primary: '#bf1915',
        secondary: '#0c0c0c',
        tertiary: '#d1d1d1',
      },
    }


    styles.paper.backgroundColor = factionColors[playerInfo.faction_id].primary;
    styles.cardHeader.color = factionColors[playerInfo.faction_id].secondary;
    styles.cardSubtitle.color = factionColors[playerInfo.faction_id].tertiary;
    styles.br.color = factionColors[playerInfo.faction_id].tertiary;
    styles.brRank.color = factionColors[playerInfo.faction_id].secondary;
    styles.brMessage.color = factionColors[playerInfo.faction_id].secondary;
    styles.cert.color = factionColors[playerInfo.faction_id].secondary;
    styles.kda.color = factionColors[playerInfo.faction_id].tertiary;

    const factionInfo = generalData.factions[_.pluck(generalData.factions, 'faction_id').indexOf(playerInfo.faction_id)];
    const worldInfo = generalData.worlds[_.pluck(generalData.worlds, 'world_id').indexOf(playerInfo.world_id)];
    const factionImagePath = `${BaseUrl}${factionInfo.image_path}`

    let KDA = 0.0;

    if (playerInfo.stats && playerInfo.stats.stat_history) {
      const statList = _.pluck(playerInfo.stats.stat_history, 'stat_name');
      const kills = playerInfo.stats.stat_history[statList.indexOf('kills')].all_time;
      let deaths = playerInfo.stats.stat_history[statList.indexOf('deaths')].all_time;
      deaths = deaths != 0 ? deaths : 1;
      KDA = parseFloat(kills / deaths).toFixed(3);
    }

    return <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3" >
  			<Paper style={styles.paper} rounded={true} >
	  			<div className="container-fluid row" style={styles.cardContainer}>
	  				<div className="col-xs-2" style={styles.cardInner1}>
	  					<Avatar src={factionImagePath} style={styles.avatar}/>
	  				</div>
	  				<div className="col-xs-10" style={styles.cardInner2}>
			  			<div style={styles.parentDiv}>
			  				<div style={styles.cardHeader}>{playerInfo.name.first}</div>
			  				<div style={styles.cardSubtitle}>{factionInfo.name.en}, {worldInfo.name.en}</div>
			  			</div>
			  			<div style={styles.brParent}>
			  				<span style={styles.br}>BR </span><span style={styles.brRank}>{playerInfo.battle_rank.value}</span>
			  			</div>
			  			<div style={styles.brProgressDiv}>
			  				<span style={styles.brMessage}>Progress To Next Rank ( {playerInfo.battle_rank.percent_to_next}% )</span>
			  				<LinearProgress style={styles.progress} color={factionColors[playerInfo.faction_id].secondary} mode="determinate" value={ parseFloat(playerInfo.battle_rank.percent_to_next)}/>
			  			</div>
			  			<div style={styles.certDiv}>
			  				<span style={styles.cert}>Certs: {playerInfo.certs.available_points}</span>
			  			</div>
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