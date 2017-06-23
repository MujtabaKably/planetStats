import React from 'react';
import Paper from 'material-ui/Paper';

import PlayerInfoHeader from './basicProfileComponents/PlayerInfoHeader'

class BasicProfile extends React.Component {
  render() {
    let render = null
    const basicProfile = this.props.basicProfile;

    if (basicProfile) {
      const styles = {
        paper: {
          paddingBottom: '10px'
        },
        parentDiv: {
          marginTop: '10px'
        },
        sectionHeader: {
          padding: '5px',
          fontSize: '13px',
          fontWeight: 'bold',
          textTransform: 'uppercase'
        }
      }

      render = (
        <div className="col-xs-12" style={styles.parentDiv}>
            <Paper style={styles.paper}>
              <div className="container-fluid">
                { /* basic info section header*/ }
                <div className="row">
                  <div className="col-xs-12" style={styles.sectionHeader}>
                    Player Basic Profile
                  </div>
                </div>

                { /*basic player Info component*/ }
                <div className="row">
                  <PlayerInfoHeader basicProfile = { basicProfile }/>   
                </div>
            </div>
          </Paper>
        </div>
      );
    }
    return render;
  }
}

export default BasicProfile;