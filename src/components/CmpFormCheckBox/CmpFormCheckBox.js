import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import s from './CmpFormCheckBox.css';

class CmpFormCheckBox extends React.Component {
  render() {
    return (
      <FormControlLabel
        control={
          <Switch
            checked={this.props.value}
            onChange={(e) => this.props.onChange(e.target.checked)}
          />
        }
        label={this.props.label}
      />
    );
  }
}

export default withStyles(s)(CmpFormCheckBox);
