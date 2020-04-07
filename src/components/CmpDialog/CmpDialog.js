import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Dialog } from '@material-ui/core';
import s from './CmpDialog.css';

class CmpDialog extends React.Component {
  render() {
    return <Dialog {...this.props}>{this.props.children}</Dialog>;
  }
}

export default withStyles(s)(CmpDialog);
