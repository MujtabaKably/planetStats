import React from 'react';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import _ from 'underscore';

class PlayerInfoHeader extends React.Component {
  render() {
    let render = null
    const basicProfile = this.props.basicProfile;

    if (basicProfile) {

      const styles = {
        mainDiv: {
          padding: '10px 0px 10px 0px',
          backgroundColor: factionColors[basicProfile.faction_id].primary,
        },

        factionAndWorldDiv: {
          padding: '5px 10px 5px 10px',
          textAlign: 'center',
          fontWeight: 'bold',
          backgroundColor: factionColors[basicProfile.faction_id].tertiary,
          color: factionColors[basicProfile.faction_id].primary,
        },

        nameRow: {
          padding: '10px 0px 10px 0px'
        },

        nameDiv: {
          padding: '0px 10px 0px 10px',
          height: '80px'
        },

        titleDiv: {
          fontWeight: 'bold',
          fontSize: '12px',
          color: factionColors[basicProfile.faction_id].tertiary,
          textTransform: 'uppercase',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
        },

        characterNameDiv: {
          fontWeight: 'bold',
          fontSize: '22px',
          color: factionColors[basicProfile.faction_id].secondary,
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
        },

        outfitDiv: {
          fontWeight: 'bold',
          fontSize: '13px',
          color: factionColors[basicProfile.faction_id].tertiary,
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
        },

        factionIcon: {
          marginTop: '10px',
          marginRight: '15px',
          marginLeft: '5px',
          height: '50px',
        },

        brDiv: {

        },

        brText: {
          fontSize: '12px',
          fontWeight: 'bold',
          color: factionColors[basicProfile.faction_id].tertiary,
        },

        brParent: {
          width: '100%',
          display: 'flex',
        },

        battleRank: {
          fontSize: '25px',
          fontWeight: 'bold',
          color: factionColors[basicProfile.faction_id].secondary,
          textAlign: 'left'
        },

        brTitle: {
          fontSize: '12px',
          fontWeight: 'bold',
          color: factionColors[basicProfile.faction_id].tertiary,
          textTransform: 'uppercase',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
        },

        brImgDiv: {
          width: '50%',
        },

        brImageDiv: {
          float: 'right',
          height: '50px',
          width: '50px',
          marginRight: '15px',
          marginTop: '10px',
          overflow: 'hidden',
        },

        brImage: {
          height: '60px',
        },

        btTextParent: {
          flexGrow: 1,
        },

        divider: {
          padding: '5px 0px 15px 0px'
        },

        avatar: {
          height: '28px',
          width: '28px',
          border: '3px solid white',
          marginTop: '5px'
        },

        userStatus: {
          textAlign: 'center'
        },

        statusText: {
          fontSize: '12px',
          fontWeight: 'bold',
          color: factionColors[basicProfile.faction_id].tertiary,
        },

        status: {
          marginTop: '3px',
          fontSize: '12px',
          fontWeight: 'bold',
          textTransform: 'uppercase',
        },
      }

      // faction world and other info
      const factionInfo = generalData.factions[_.pluck(generalData.factions, 'faction_id').indexOf(basicProfile.faction_id)];
      const worldInfo = basicProfile.world_id;
      const factionImagePath = `${BaseUrl}${factionInfo.image_path}`
      const experienceRank = generalData.experience_rank[basicProfile.battle_rank.value - 1][factionInfo.code_tag.toLowerCase()];
      const brIconPath = basicProfile.battle_rank.value > 100 ? `/images/BR/${experienceRank.image_id}.png` : `${BaseUrl}/files/ps2/images/static/${experienceRank.image_id}.png`

      // BR image fixes
      if (basicProfile.battle_rank.value > 100) {
        styles.brImage.height = '50px';
        styles.brImageDiv.marginRight = '15px';
      } else {
        styles.brImage.height = '70px';
        styles.brImageDiv.marginRight = '10px';
        styles.brImage.marginTop = `${parseInt((50 - 70) / 2)}px`
        styles.brImage.marginLeft = `${parseInt((50 - 70) / 2)}px`
      }

      //title and outfit adjustments
      const title = basicProfile.title_id && basicProfile.title_id > 0 ? generalData.titles[basicProfile.title_id - 1].name.en : '';
      const outfit = basicProfile.outfit_member ? basicProfile.outfit_member : '';

      if (!title) {
        styles.characterNameDiv.fontSize = '28px';
        styles.characterNameDiv.paddingTop = '15px';
      }

      // user status computation
      let status = ''
      if (basicProfile.online_status > 0) {
        status = 'online';
        styles.avatar.backgroundColor = "#188e13"
        styles.status.color = factionColors[basicProfile.faction_id].secondary;
      } else {
        status = 'offline';
        styles.avatar.backgroundColor = "#c4200d"
        styles.status.color = factionColors[basicProfile.faction_id].tertiary;
      }

      const userStatus = render = (
        <div className="col-xs-12" style={styles.mainDiv}>
          <div className="container-fluid">
            { /*player Faction and Server, world*/ }
            <div className="row">
              <div className="col-xs-12" style={styles.factionAndWorldDiv}>
                <div>{factionInfo.name.en} - {worldInfo.name.en}</div>
              </div>
            </div>

            { /*other player info*/ }
            <div className="row" style={ styles.nameRow }>
              { /*name, title and outfit of player and faction icon*/ }
              <div className="col-xs-12 col-md-8" style={styles.nameDiv}>
                <div class="pull-left">
                  <img src={factionImagePath} style={styles.factionIcon}/>
                </div>
                {title ? (<div style={styles.titleDiv}>
                          {title}
                        </div>) : null}
                <div style = {styles.characterNameDiv}>
                  {basicProfile.name.first}
                </div>
                {outfit ? (<div style={styles.outfitDiv}>
                        [{outfit.alias}] {outfit.name}
                       </div>) : null}
              </div>
              <div className="col-xs-12 hidden-md hidden-lg" style={styles.divider}>
                <Divider />
              </div>

              { /*battle rank and br icon*/ }
              <div className="col-xs-6 col-md-2" style={styles.brDiv}>
                <div style={styles.brParent}>
                    { /*br icon goes here*/ }
                    <div style={styles.brImgDiv}>
                      <div style={styles.brImageDiv}>
                        <img src={ brIconPath } style={styles.brImage}/>
                      </div>
                    </div>

                    { /*br text details goes here*/ }
                    <div style={styles.brTextParent}>
                      <div style={styles.brText}>
                        Battle Rank
                      </div>
                      <div style={styles.battleRank}>
                        {basicProfile.battle_rank.value}
                      </div>
                      <div style={styles.brTitle}>
                        {experienceRank.title.en}
                      </div>
                    </div>
                </div>
              </div>

              { /* status, online or offline*/ }
              <div className="col-xs-6 col-md-2" style={styles.statusDiv}>
                <div style={styles.userStatus}>
                  <div style={styles.statusText}>
                    Status
                  </div>
                  <div style={styles.avatarDiv}>
                    <Avatar style={styles.avatar} /> 
                  </div>
                  <div style={styles.status}>
                    {status}
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
      );
    }
    return render
  }
}

export default PlayerInfoHeader;
