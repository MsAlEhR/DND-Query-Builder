import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { DialogTitle } from '@material-ui/core';
import s from './CmpDialogTitle.css';
import theme from '../../theme/theme';

const titleStyle={
  backgroundColor: theme.palette.primary.dark,
  color: theme.palette.primary.contrastText,
};

class CmpDialogTitle extends React.Component {
  render() {
    return (
      <DialogTitle disableTypography style={titleStyle} {...this.props}>
        {this.props.children}
      </DialogTitle>
    );
  }
}

export default withStyles(s)(CmpDialogTitle);
