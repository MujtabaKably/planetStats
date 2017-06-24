import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import FontIcon from 'material-ui/FontIcon';

class PinSwitch extends React.Component {
  handleClick() {
    this.props.onClick();
  }

  render() {
    const styles = {
      checked: {
        color: this.props.color ? this.props.color : 'white'
      },
      unchecked: {
        color: this.props.color ? this.props.color : 'white'
      }
    };

    return (
      <Checkbox checkedIcon={<FontIcon className="glyphicon glyphicon-star" style={styles.checked} />}
      uncheckedIcon={<FontIcon className="glyphicon glyphicon-star-empty" style={styles.unchecked} />}
      style={this.props.style} checked={this.props.checked}
      onClick={this.handleClick.bind(this)}/>
    );
  }
}

export default PinSwitch;