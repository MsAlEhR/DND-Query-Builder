import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { DialogActions } from '@material-ui/core';
import s from './CmpDialogActions.css';

class CmpDialogActions extends React.Component {
  render() {
    return <DialogActions {...this.props}>{this.props.children}</DialogActions>;
  }
}

export default withStyles(s)(CmpDialogActions);
