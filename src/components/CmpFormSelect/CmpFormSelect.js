import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import * as PropTypes from 'prop-types';
import FormHelperText from '@material-ui/core/FormHelperText';
import CmpFormErrorMessage from '../CmpFormErrorMessage';
import s from './CmpFormSelect.css';

class CmpFormSelect extends React.Component {
  render() {
    return (
      <FormControl
        margin="dense"
        className={this.props.className}
        variant="outlined"
      >
        <InputLabel>{this.props.label}</InputLabel>
        <Select
          disabled={this.props.disabled}
          input={
            <OutlinedInput
              labelWidth={this.props.labelWidth ? this.props.labelWidth : 60}
            />
          }
          value={this.props.value}
          onChange={e => this.props.onChange(e.target.value)}
        >
          {this.props.children}
        </Select>
        {this.props.showHelperText ? (
          <FormHelperText>
            <CmpFormErrorMessage name={this.props.errorMessageFieldName} />
          </FormHelperText>
        ) : null}
      </FormControl>
    );
  }
}

CmpFormSelect.defaultProps = {
  showHelperText: true,
};

CmpFormSelect.propTypes = {
  showHelperText: PropTypes.bool,
};

export default withStyles(s)(CmpFormSelect);
