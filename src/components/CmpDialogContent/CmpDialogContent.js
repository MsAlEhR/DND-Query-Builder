import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { DialogContent } from '@material-ui/core';
import s from './CmpDialogContent.css';

class CmpDialogContent extends React.Component {
  render() {
    return <DialogContent {...this.props}>{this.props.children}</DialogContent>;
  }
}

export default withStyles(s)(CmpDialogContent);
