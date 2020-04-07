import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {injectIntl} from 'react-intl';
import normalizeCss from 'normalize.css';
import s from './CmpCardHeader.css';
import theme from '../../theme/theme';

const labelStyle = {
  color: theme.palette.primary.contrastText,
  fontSize: 20,
  position: 'relative',
  right: 20,
  left: 20,
};

class CmpCardHeader extends React.Component {
  render() {
    return <span style={labelStyle}>{this.props.label}</span>;
  }
}

export default injectIntl(withStyles(normalizeCss, s)(CmpCardHeader));
